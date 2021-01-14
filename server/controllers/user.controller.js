const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('../models/user.model');

function getUsers(req, res) {
  let from = req.query.from || 0;
  let limit = req.query.limit || 5;

  User.find({state: true},'name email role state google img')
    .skip(Number(from))
    .limit(Number(limit))
    .exec((error, users) => {
      if(error) return res.status(400).json({ok: false, message: error.messgae});

      User.count({state: true}, (error, count) => res.json({ok: true, users: users, count: count }))
    });
}

function createUser(req, res) {
  const user = new User({
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 10),
    email: req.body.email,
    role: req.body.role,
  });

  user.save((error, userDB) => {
    if(error) return res.status(400).json({ok: false, message: error.message});

    res.status(201).json({ok: true, message: 'User created', user: userDB});
  })
} 

function updateUserById(req, res) {

    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'state']);

    User.findByIdAndUpdate(req.params.userId, body, { new: true, runValidators: true }, (error, userDB) => {
      if (error) return res.status(400).json({ ok: false, message: error.message});
      
      res.json({ ok: true, message: 'User updated', user: userDB });
    })
} 

function deleteUserById(req, res) {
  User.findByIdAndUpdate(req.params.userId, {state: false}, {new: true}, (error, deleteUser) => {
    
    if(error) return res.status(400).json({ok: false, message: error.message});

    if(!deleteUser) return res.status(400).json({ok: false, message: 'Usuario no encontrado'});

    res.status(200).json({ok: true, user: deleteUser});
  })
}


module.exports = {
  getUsers,
  createUser,
  updateUserById,
  deleteUserById
}