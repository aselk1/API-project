// backend/routes/api/users.js
const express = require("express");
const jwt = require("jsonwebtoken");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Song, User, Album, Comment } = require("../../db/models");
//import validation stuff
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

//AWS uploading
const {
  singleMulterUpload,
  singlePublicFileUpload,
  singlePublicFileDelete,
} = require("../../awsS3");

const AWS = require("aws-sdk");
const NAME_OF_BUCKET = "shound-cloud";
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

const router = express.Router();

router.get("/", async (req, res, next) => {
  let query = {
    where: {},
    include: [],
  };
  const page = req.query.page === undefined ? 1 : parseInt(req.query.page);
  const size = req.query.size === undefined ? 20 : parseInt(req.query.size);
  if (page < 1 || page > 10 || size < 0 || size > 20) {
    let err = new Error("Validation Error");
    err.status = 400;
    err.errors = {};
    if (page < 1) err.errors.page = "Page must be greater than or equal to 1";
    if (size < 0) err.errors.size = "Size must be greater than or equal to 0";
    if (page > 10) err.errors.page = "Page must be less than or equal to 10";
    if (size > 20) err.errors.size = "Size must be less than or equal to 20";
    return next(err);
  } else {
    query.limit = size;
    query.offset = size * (page - 1);
  }
  if (req.query.title) query.where.title = req.query.title;
  if (req.query.createdAt) query.where.createdAt = req.query.createdAt;

  const Songs = await Song.findAll(query);
  return res.json({ Songs, page, size });
});

router.get("/current", requireAuth, async (req, res, next) => {
  const { token } = req.cookies;
  const payload = jwt.decode(token);
  const id = payload.data.id;
  const Songs = await Song.findAll({
    where: {
      userId: id,
    },
  });
  return res.json({ Songs });
});

router.get("/:songId", async (req, res, next) => {
  const song = await Song.findByPk(req.params.songId, {
    include: [
      { model: User, attributes: ["id", "username", "imageUrl"], as: "Artist" },
      { model: Album, attributes: ["id", "title", "imageUrl"] },
    ],
  });
  if (!song) {
    const err = new Error("Song couldn't be found");
    err.status = 404;
    return next(err);
  }
  return res.json(song);
});

router.post(
  "/",
  requireAuth,
  singleMulterUpload("url"),
  async (req, res, next) => {
    // find user id
    const { token } = req.cookies;
    const payload = jwt.decode(token);
    const id = payload.data.id;
    if (Number(req.file.size) / 1000000 > 10) {
      const err = new Error("File must be 10MB or less.");
      err.status = 400;
      return next(err);
    }
    let objects = await s3.listObjects({ Bucket: NAME_OF_BUCKET }).promise();
    let array = objects.Contents;
    let size =
      (array.reduce(function (acc, el) {
        return acc + el.Size;
      }, 0) +
        req.file.size) /
      1000000;
    if (size > 4900) {
      const err = new Error("Sorry, the database is full.");
      err.status = 400;
      return next(err);
    }
    const { title, description, imageUrl, albumId } = req.body;
    //check for title and url, error if needed
    if (!title) {
      const err = new Error("Validation Error");
      err.status = 400;
      err.errors = {};
      if (!title) err.errors.title = "Song title is required";
    //   if (!url) err.errors.url = "Audio is required";
      return next(err);
    }
    //check for album, error if needed
    if (albumId) {
      let album = await Album.findByPk(albumId);
      if (!album) {
        const err = new Error("Album couldn't be found");
        err.status = 404;
        return next(err);
      }
    }
    const url = await singlePublicFileUpload(req.file); //AWS
    let song = await Song.create({
      title: title,
      description: description,
      url: url,
      imageUrl: imageUrl,
      albumId: albumId,
      userId: id,
    });
    res.json(song);
  }
);

router.put(
  "/:songId",
  requireAuth,
  singleMulterUpload("url"),
  async (req, res, next) => {
    let song = await Song.findByPk(req.params.songId);
    if (!song) {
      const err = new Error("Song couldn't be found");
      err.status = 404;
      return next(err);
    }
    let { title, description, imageUrl, albumId, oldUrl } = req.body;
    let url = oldUrl

    if (!title) {
      const err = new Error("Validation Error");
      err.status = 400;
      err.errors = {};
      if (!title) err.errors.title = "Song title is required";
    //   if (!url) err.errors.url = "Audio is required";
      return next(err);
    }
    if (Number(req.user.dataValues.id) !== Number(song.userId)) {
      let err = new Error("Forbidden");
      err.status = 403;
      return next(err);
    }
    if (req.file) {
      if (Number(req.file.size) / 1000000 > 10) {
        const err = new Error("File must be 10MB or less.");
        err.status = 400;
        return next(err);
      }
      let objects = await s3.listObjects({ Bucket: NAME_OF_BUCKET }).promise();
      let oldSong = await s3.getObjectAttributes({
        Bucket: NAME_OF_BUCKET,
        Key: song.url.split(".com/")[1],
        ObjectAttributes: ['ObjectSize']
      }).promise();
      let oldSongSize = Number(oldSong.ObjectSize);
      let array = objects.Contents;
      let size =
        (array.reduce(function (acc, el) {
          return acc + el.Size;
        }, 0) +
          req.file.size - oldSongSize) /
        1000000;
      if (size > 4900) {
        const err = new Error("Sorry, the database is full.");
        err.status = 400;
        return next(err);
      }
      await singlePublicFileDelete(song.url.split(".com/")[1]);
      url = await singlePublicFileUpload(req.file);
    }
    song.update({
      title: title,
      description: description,
      url: url,
      imageUrl: imageUrl,
      albumId: albumId,
    });
    res.json(song);
  }
);

router.delete("/:songId", requireAuth, async (req, res, next) => {
  let song = await Song.findByPk(req.params.songId);
  if (!song) {
    const err = new Error("Song couldn't be found");
    err.status = 404;
    return next(err);
  }
  if (Number(req.user.dataValues.id) !== Number(song.userId)) {
    let err = new Error("Forbidden");
    err.status = 403;
    return next(err);
  }
  await singlePublicFileDelete(song.url.split(".com/")[1]);
  await song.destroy();
  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

router.get("/:songId/comments", async (req, res, next) => {
  let Comments = await Comment.findAll({
    where: {
      songId: Number(req.params.songId),
    },
    include: {
      model: User,
      attributes: ["id", "username"],
    },
  });
  if (Comments.length === 0) {
    let err = new Error("Song couldn't be found");
    err.status = 404;
    return next(err);
  }
  res.json({ Comments });
});

router.post("/:songId/comments", requireAuth, async (req, res, next) => {
  let { body } = req.body;
  let songId = Number(req.params.songId);
  let song = await Song.findByPk(songId);
  if (!song) {
    const err = new Error("Song couldn't be found");
    err.status = 404;
    return next(err);
  }
  const { token } = req.cookies;
  const payload = jwt.decode(token);
  const id = payload.data.id;
  if (!body) {
    let err = new Error("Validation Error");
    err.status = 400;
    err.errors = { body: "Comment body text is required" };
    return next(err);
  }
  let comment = await Comment.create({
    userId: id,
    songId: songId,
    body: body,
  });
  res.json(comment);
});

module.exports = router;
