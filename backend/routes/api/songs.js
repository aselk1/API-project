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
            // where: {
            //     id: Number(req.params.songId)
            // },
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



module.exports = router;
