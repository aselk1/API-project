// backend/routes/api/session.js
const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
//import validation stuff
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const user = require('../../db/models/user');
const router = express.Router();

//middleware to check validations and handle errors
const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];

// Log in
router.post(
    '/',
    validateLogin, // add validate login middleware to post route
    async (req, res, next) => {
        const { credential, password } = req.body;

        const user = await User.login({ credential, password });

        if (!user) {
            const err = new Error('Invalid credentials');
            const error = {'credentials': 'Invalid credentials'}
            err.errors = error
            err.status = 401;
            return next(err);
        }

        let token = await setTokenCookie(res, user); // save token
        let send = {...user.dataValues} // save user.dataValues
        send.token = token; // add token to send json


        return res.json( // take user out of {} so it just returns the object query results
            send
        );
    }
);

// Log out
router.delete(
    '/',
    (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success' });
    }
);

// Restore session user
router.get(
    '/',
    requireAuth, //use require auth instead of restore User so you get the error for a non-authorized user
    (req, res) => {
        const { user } = req;
        if (user) {
            return res.json(
                // {user: user.toSafeObject()} // return regular user obj
                user
            );
        } else return res.json({});
    }
);



module.exports = router;
