// backend/routes/api/users.js
const express = require('express')
const jwt = require('jsonwebtoken');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Song } = require('../../db/models');
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



module.exports = router;
