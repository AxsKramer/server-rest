const express = require('express');
const router = express.Router();
const {getUsers, createUser, updateUserById, deleteUserById} = require('../controllers/user.controller');

router.get('/', getUsers);
router.post('/', createUser);
router.put('/:userId', updateUserById);
router.delete('/:userId', deleteUserById);

module.exports = router;