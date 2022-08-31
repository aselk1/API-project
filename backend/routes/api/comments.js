// backend/routes/api/users.js
const express = require('express')
const jwt = require('jsonwebtoken');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Song, User, Album, Comment } = require('../../db/models');
//import validation stuff
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.put(
    "/:commentId",
    async (req, res, next) => {
        let {body} = req.body;
        let commentId = Number(req.params.commentId);
        let comment = await Comment.findByPk(commentId);
        if (!body) {
            let err = new Error("Validation Error")
            err.status = 400;
            err.errors = { "body": "Comment body text is required" };
            return next(err);
        }
        if (!comment) {
            let err = new Error("Comment couldn't be found")
            err.status = 404;
            return next(err);
        }
        if (Number(req.user.dataValues.id) !== Number(comment.userId)) {
            let err = new Error('Forbidden');
            err.status = 403;
            return next(err);
        };
        comment.update({
            body: body
        })
        res.json(comment)
    }
);

router.delete(
    "/:commentId",
    requireAuth,
    async (req, res, next) => {
        let commentId = Number(req.params.commentId);
        let comment = await Comment.findByPk(commentId);
        if (!comment) {
            let err = new Error("Comment couldn't be found")
            err.status = 404;
            return next(err);
        }
        if (Number(req.user.dataValues.id) !== Number(comment.userId)) {
            let err = new Error('Forbidden');
            err.status = 403;
            return next(err);
        };
        comment.destroy();
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    }
)


module.exports = router;
