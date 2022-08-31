// backend/routes/api/users.js
const express = require('express')
const jwt = require('jsonwebtoken');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Song, User, Album, Comment, Artist } = require('../../db/models');
//import validation stuff
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get(
    "/",
    async (req, res, next) => {
        let Albums = await Album.findAll({})
        res.json({ Albums })
    }
);

router.get(
    "/current",
    requireAuth,
    async (req, res, next) => {
        const { token } = req.cookies;
        const payload = jwt.decode(token);
        const id = payload.data.id
        const Albums = await Album.findAll({
            where: {
                userId: id
            }
        });
        return res.json({ Albums });
    }
);

router.get(
    "/:albumId",
    async (req, res, next) => {
        let albumId = Number(req.params.albumId);
        let album = await Album.findByPk(albumId, {
            include: [
                { model: User, attributes: ['id', 'username', 'imageUrl'], as: 'Artist' },
                { model: Song }
            ]
        }
        )
        if (!album) {
            let err = new Error("Album couldn't be found");
            err.status = 404;
            return next(err);
        }
        res.json(album)
    }
);

router.post(
    "/",
    requireAuth,
    async (req, res, next) => {
        let { title, description, imageUrl } = req.body;
        const { token } = req.cookies;
        const payload = jwt.decode(token);
        const id = payload.data.id;
        if (!title) {
            let err = new Error("Validation Error");
            err.status = 400;
            err.errors = { "title": "Album title is required" };
            return next(err);
        }
        let album = await Album.create({ title, description, imageUrl, userId: id });
        res.json(album);
    });

router.put(
    "/:albumId",
    requireAuth,
    async (req, res, next) => {
        let { title, description, imageUrl } = req.body;
        let albumId = Number(req.params.albumId);
        let album = await Album.findByPk(albumId);
        if (!title) {
            let err = new Error("Validation Error");
            err.status = 400;
            err.errors = { "title": "Album title is required" };
            return next(err);
        }
        if (!album) {
            let err = new Error("Album couldn't be found");
            err.status = 404;
            return next(err);
        }
        if (Number(req.user.dataValues.id) !== Number(album.userId)) {
            let err = new Error('Forbidden');
            err.status = 403;
            return next(err);
        };
        album.update({title, description, imageUrl});
        res.json(album)
    }
);

router.delete(
    "/:albumId",
    requireAuth,
    async (req, res, next) => {
        let albumId = Number(req.params.albumId);
        let album = await Album.findByPk(albumId);
        if (!album) {
            let err = new Error("Album couldn't be found");
            err.status = 404;
            return next(err);
        }
        if (Number(req.user.dataValues.id) !== Number(album.userId)) {
            let err = new Error('Forbidden');
            err.status = 403;
            return next(err);
        };
        album.destroy();
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    }
);


module.exports = router;
