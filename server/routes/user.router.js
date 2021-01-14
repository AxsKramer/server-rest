const express = require('express');
const router = express.Router();
const {getUsers, createUser, updateUserById, deleteUserById} = require('../controllers/user.controller');
const {checktoken, checkAdminRole} = require('../middleware/auth');

router.get('/', checktoken, getUsers);
router.post('/', [checktoken, checkAdminRole], createUser);
router.put('/:userId', [checktoken, checkAdminRole], updateUserById);
router.delete('/:userId', [checktoken, checkAdminRole], deleteUserById);

module.exports = router;