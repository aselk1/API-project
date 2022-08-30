// backend/routes/api/users.js
const express = require('express')

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



module.exports = router;
