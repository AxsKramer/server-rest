const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(config.clientID);


const User = require('../models/user.model');

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

async function verifyGoogleClientID(token){
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: config.clientID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  console.log(payload);
  return {
    name: payload.name,
    email: payload.email,
    img: payload.picture,
    google: true,
  }
}

async function loginWithGoogle(req, res) {
  // const token = req.body.;
  const googleUser = await verifyGoogleClientID(req.body.idtoken).catch(error => res.status(403).json({ok: false, error: error.message}));

  User.findOne({email: googleUser.email}, (error, userDB) => {
    if(error) return res.status(500).json({ok: false, message: error.message});

    if(userDB){
      if(userDB.google === false) return res.status(400).json({ok:false, message: "Debe de usar la autenticación normal"});
      else{
        const token = jwt.sign({user: userDB}, config.signwordToken, {expiresIn: config.expToken});
        res.json({ok: true, user: userDB, token: token});
      }
    }else{
      //Si el usuario no existe en nuestra base de datos
      const user = new User();
      user.name = googleUser.name;
      user.email = googleUser.email;
      user.img = googleUser.img;
      user.google = true;
      user.password = ':)';

      user.save((error, userDB) => {
        if(error) return res.status(500).json({ok: false, message: error.message});
        
        const token = jwt.sign({user: userDB}, config.signwordToken, {expiresIn: config.expToken});
        res.json({ok: true, user: userDB, token: token});
      } )
    }
  })
}


module.exports = {
  userLogin,
  loginWithGoogle,
  verifyGoogleClientID
}