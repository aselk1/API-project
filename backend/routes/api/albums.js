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
        res.json({Albums})
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
        let album = await Album.findByPk( albumId,{
            include:[
                {model: User, attributes:['id', 'username', 'imageUrl'], as: 'Artist'},
                { model: Song}
            ]}
            )
        if (!album) {
            let err = new Error("Album couldn't be found");
            err.status = 404;
            return next(err);
        }
        res.json(album)
    }
)


module.exports = router;
