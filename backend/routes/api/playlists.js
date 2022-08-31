// backend/routes/api/users.js
const express = require('express')
const jwt = require('jsonwebtoken');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Song, User, Playlist } = require('../../db/models');
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


module.exports = router;
