// backend/routes/index.js
const express = require('express');
const router = express.Router();

router.get('/hello/world', function (req, res) { // test route with req.csrfToken
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send('Hello World!');
});

module.exports = router;
