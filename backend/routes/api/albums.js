// backend/routes/api/users.js
const express = require('express')
const jwt = require('jsonwebtoken');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Song, User, Album, Comment } = require('../../db/models');
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
)


module.exports = router;
