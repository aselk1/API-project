// backend/utils/validation.js
const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        // const error2 = {};
        const errors = validationErrors //old replaced for correct res.body
            .array()
            .map((error) => {
                return `${error.msg}`
            });

        // const errors = validationErrors
        //     .array()
        //     .forEach((error) => {
        //         if (error.param === 'credential') error2.credential = "Email or username is required"
        //         if (error.param === 'password') error2.password = "Password is required"
        //     });
        const err = Error('Validation error');
        err.status = 400;
        err.errors = errors;
        err.title = 'Bad request.';
        next(err);
    }
    next();
};

module.exports = {
    handleValidationErrors
};
