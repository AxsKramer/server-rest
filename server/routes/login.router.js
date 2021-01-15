const express = require('express');
const router = express.Router();
const {userLogin, loginWithGoogle} = require('../controllers/login.controller');

router.post('/', userLogin);
router.post('/google', loginWithGoogle);



module.exports = router;