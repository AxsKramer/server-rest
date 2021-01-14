const bcrypt = require('bcrypt');
const User = require('../models/user.model');

function userLogin(req, res){
  User.findOne({email: req.body.email}, (error, userDB) => {
    if(error) return res.status(400).json({ok: false, message: error.message});
    if(!userDB) return res.status(400).json({ok: false, message: 'Usuario o contraseña incorrectos'});

    if(!bcrypt.compareSync(req.body.password, userDB.password)){
      return res.status(400).json({ok: false, message: 'Usuario o contraseña incorrectos'});
    }
    res.status(200).json({ok: true, message: 'Login', user: userDB, token: 123});

  })
}

module.exports = {
  userLogin
}