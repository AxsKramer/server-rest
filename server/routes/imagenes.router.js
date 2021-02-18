const {Router} = require('express');
const getImagenes = require('../controllers/imagenes.controller.js');
const {checktoken} = require('../middleware/auth');

const router = Router();

router.get('/:tipo/:img', checktoken, getImagenes);


module.exports = router;