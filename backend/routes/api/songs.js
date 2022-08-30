// backend/routes/api/users.js
const express = require('express')
const jwt = require('jsonwebtoken');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Song, User, Album } = require('../../db/models');
//import validation stuff
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


router.get(
    "/",
    async (req, res, next) => {
        const Songs = await Song.findAll({});
        return res.json({Songs});
    }
);

router.get(
    "/current",
    requireAuth,
    async (req, res, next) => {
        const { token } = req.cookies;
        const payload = jwt.decode(token);
        const id = payload.data.id
        const Songs = await Song.findAll({
            where: {
                userId: id
            }
        });
        return res.json({ Songs });
    }
);

router.get(
    "/:songId",
    async (req, res, next) => {
        const song = await Song.findByPk(req.params.songId,{
            include: [
                { model: User, attributes: ['id', 'username', 'imageUrl'], as: 'Artist'},
                {model: Album, attributes: ['id', 'title', 'imageUrl']}
            ]
        });
        if (!song) {
            const err = new Error("Song couldn't be found");
            err.status = 404;
            return next(err);
        }
        return res.json( song );
    }
);

router.post(
    "/",
    requireAuth,
    async (req, res, next) => {
        // find user id
        const { token } = req.cookies;
        const payload = jwt.decode(token);
        const id = payload.data.id
        const {title, description, url, imageUrl, albumId} = req.body
        //check for title and url, error if needed
        if (!title || !url) {
            const err = new Error('Validation Error');
            err.status = 400;
            err.errors = {};
            if (!title) err.errors.title = "Song title is required";
            if (!url) err.errors.url = "Audio is required";
            next(err);
        };
        //check for album, error if needed
        if (albumId) {
            let album = await Album.findByPk(albumId);
            if (!album) {
                const err = new Error("Album couldn't be found");
                err.status = 400;
                next(err);
            }
        };
        let song = await Song.create({
            title: title,
            description: description,
            url: url,
            imageUrl: imageUrl,
            albumId: albumId,
            userId: id
        })
        res.json(song)
    }
);



module.exports = router;
