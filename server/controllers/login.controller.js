const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const config = require('../config');

function userLogin(req, res){
  User.findOne({email: req.body.email}, (error, userDB) => {
    if(error) return res.status(400).json({ok: false, message: error.message});
    if(!userDB) return res.status(400).json({ok: false, message: 'Usuario o contraseña incorrectos'});

    if(!bcrypt.compareSync(req.body.password, userDB.password)){
      return res.status(400).json({ok: false, message: 'Usuario o contraseña incorrectos'});
    }

    const token = jwt.sign({user: userDB}, config.signwordToken, {expiresIn: config.expToken});

    res.status(200).json({ok: true, message: 'Login', user: userDB, token: token});

  })
}

module.exports = {
  userLogin
}