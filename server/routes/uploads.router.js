const express = require('express');
const uploadFile = require('../controllers/upload.controller');
const router = express.Router();

router.put('/:tipo/:id', uploadFile );

module.exports = router;