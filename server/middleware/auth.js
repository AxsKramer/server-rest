//===============
//Verificar Token
//===============

const jwt = require('jsonwebtoken');
const config = require('../config');

const checktoken = (req, res, next) => {
  const token = req.get('token'); // o Authorization  Header

  jwt.verify(token, config.signwordToken, (error, decoded) => {
    if(error) return res.status(401).json({ok: false, message: error.message, token: 'JsonWebTokenError'});

    req.user = decoded.user;
    next();
  } )
}

//===============
//Verificar Role
//===============

const checkAdminRole = (req, res, next) => {
  const user = req.user;

  user.role === 'ADMIN_ROLE'
    ? next()
    : res.status(401).json({ok: false, message: 'El usuario no es administrador'} );
}

module.exports = {
  checktoken,
  checkAdminRole
}