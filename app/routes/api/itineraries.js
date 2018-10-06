const express = require('express');
const router = express.Router();
const config = require('config');

const ModelPath = '../../models/';

const wrap = require('../../util/wrap.js');

router.get('/', wrap(async (req, res) => {
    res.sendStatus(200);
}));

module.exports = router;