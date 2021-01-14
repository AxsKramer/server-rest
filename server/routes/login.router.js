const express = require('express');
const router = express.Router();
const {userLogin} = require('../controllers/login.controller');

router.post('/', userLogin);
// router.put('/:userId', updateUserById);
// router.delete('/:userId', deleteUserById);

module.exports = router;