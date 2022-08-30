// backend/routes/api/users.js
const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Song, User } = require('../../db/models');
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
        console.log(artist)
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



module.exports = router;
