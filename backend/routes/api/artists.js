// backend/routes/api/users.js
const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Song, User, Playlist, Album } = require('../../db/models');
//import validation stuff
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const user = require('../../db/models/user');

const router = express.Router();


router.get(
    "/:artistId/songs",
    async (req, res, next) => {
        const artistId = Number(req.params.artistId);
        const artist = await User.findByPk(artistId);
        if (!artist) {
            const err = new Error("Artist couldn't be found");
            err.status = 404;
            return next(err);
        }
        const Songs = await Song.findAll({
            where: {
                userId: artistId
            }
        });
        return res.json({ Songs });
    }
);

router.get(
    "/:artistId/playlists",
    async (req, res, next) => {
        let Playlists = await Playlist.findAll({
            where: {
                userId: Number(req.params.artistId)
            }
        })
        if (Playlists.length === 0) {
            let err = new Error("Artist could'nt be found");
            err.status = 404;
            return next(err);
        }
        res.json({Playlists})
    }
);

router.get(
    "/:artistId/albums",
    async (req, res, next) => {
        let artistId = Number(req.params.artistId);
        let Albums = await Album.findAll({
            where: {
                userId: artistId
            }
        })
        if (Albums.length === 0) {
            let err = new Error("Artist couldn't be found");
            err.status = 404;
            return next(err);
        }
        res.json({Albums})
    }
);






module.exports = router;
