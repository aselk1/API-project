// backend/routes/api/users.js
const express = require('express')
const jwt = require('jsonwebtoken');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Song, User, Playlist, PlaylistSong } = require('../../db/models');
//import validation stuff
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const user = require('../../db/models/user');

const router = express.Router();

router.post(
    "/",
    requireAuth,
    async (req, res, next) => {
        let {name, imageUrl} = req.body
        if(!name) {
            let err = new Error('Validation Error');
            err.status = 400;
            err.errors = {
                "name": "Playlist name is required"
            };
            return next(err);
        }
        // find user id
        const { token } = req.cookies;
        const payload = jwt.decode(token);
        const id = payload.data.id
        let playlist = await Playlist.create({
            userId: id,
            name: name,
            imageUrl: imageUrl
        });
        res.json(playlist)
    }
)

router.post(
    "/:playlistId/songs",
    requireAuth,
    async (req, res, next) => {
        let {songId} = req.body;
        let playlistId = Number(req.params.playlistId);
        let playlist = await Playlist.findByPk(playlistId);
        let song = await Song.findByPk(songId);
        if (!playlist) {
            let err = new Error("Playlist couldn't be found");
            err.status = 404;
            return next(err);
        };
        if (!song) {
            let err = new Error("Song couldn't be found");
            err.status = 404;
            return next(err);
        }
        if (Number(req.user.dataValues.id) !== Number(playlist.userId)) {
            let err = new Error('Forbidden');
            err.status = 403;
            return next(err);
        };
        const add = await PlaylistSong.create({
            playlistId: playlistId,
            songId: songId
        });
        let add2 = await PlaylistSong.findByPk(add.id);//default scope will remove updatedAt, and createdAt
        res.json(add2);
    }
);

router.get(
    "/:playlistId",
    async (req, res, next) => {
        let playlist = await Playlist.findByPk(
            req.params.playlistId,
            {include: {model: Song, through: {attributes: []}}}
        )
        if (!playlist) {
            let err = new Error("Playlist couldn't be found");
            err.status = 404;
            return next(err);
        }
        res.json(playlist)
    }
);

router.put(
    "/:playlistId",
    requireAuth,
    async (req, res, next) => {
        let {name, imageUrl} = req.body
        let playlistId = Number(req.params.playlistId);
        let playlist = await Playlist.findByPk(playlistId);
        if (!name) {
            let err = new Error("Validation Error");
            err.status = 400;
            err.errors = {"name": "Playlist name is required"}
            return next(err);
        }
        if (!playlist) {
            let err = new Error("Playlist couldn't be found");
            err.status = 404;
            return next(err);
        }
        if (Number(req.user.dataValues.id) !== Number(playlist.userId)) {
            let err = new Error('Forbidden');
            err.status = 403;
            return next(err);
        };
        playlist.update({
            name, imageUrl
        })
        res.json(playlist)
    }
)


module.exports = router;
