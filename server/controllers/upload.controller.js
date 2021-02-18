const Usuario = require('../models/user.model');
const Producto = require('../models/product.model');
const fs = require('fs');
const path = require('path');

const upload = (req, res) => {

  let tipo = req.params.tipo;
  let id = req.params.id;

  
  if(!req.files) return res.status(400).json({ok: false, error: 'No files were uploaded'});


  // validar tipos
  let tiposValidos = ['productos', 'usuarios'];

  if(tiposValidos.indexOf(tipo) < 0 ){
    return res.status(400).json({ok: false, tipo, error: 'El tipo no es correcto' });
  }



  let file = req.files.archivo;
  let nombreSinExt = file.name.split('.');
  let extension = nombreSinExt[nombreSinExt.length - 1];

  //Extensiones permitidas
  let extensionesPermitidas = ['png', 'jpg', 'gif', 'jpeg'];

  if(extensionesPermitidas.indexOf(extension) < 0 ){
    return res.status(400).json({ok: false, ext: extension, error: 'Las extensiones validas son: ' + extensionesPermitidas.join(', ' ) });
  }

  //Cambiar nombre al archivo
  let nombreArchivo = `{id}_${new Date().getMilliseconds}.${extension}`;

  file.mv(`uploads/${tipo}/${nombreArchivo}`, (error) => {
    if(error) return res.status(500).json({ok: false, error: error.message});



    // res.json({ok: true, message: 'Image subida correctamente'});
    //Imagen cargada
    if(tipo === 'usuarios'){
      imagenUsuario(id, res, nombreArchivo);
    }else{
      imagenProducto(id, res, nombreArchivo)
    }

  })
}

function imagenUsuario(id, res, nombreArchivo){
  Usuario.findById(id, (error, usuarioDB) => {
    if(error) {
      borrarArchivo(nombreArchivo, 'usuarios');
      return res.status(500).json({ok: false, error: error.message})
    };
    if(!usuarioDB) {
      borrarArchivo(nombreArchivo, 'usuarios');
      return res.status(400).json({ok: false, error: 'Usuario no existe'})
    };

    borrarArchivo(usuarioDB.img, 'usuarios');

    usuarioDB.img = nombreArchivo;

    usuarioDB.save((error, usuarioGuardado) => res.status(200).json({ok: true, usuario: usuarioGuardado }));

  })
}
function imagenProducto(id, res, nombreArchivo){
  Producto.findById(id, (error, productDB) => {
    if(error) {
      borrarArchivo(nombreArchivo, 'productos');
      return res.status(500).json({ok: false, error: error.message})
    };
    if(!productDB) {
      borrarArchivo(nombreArchivo, 'productos');
      return res.status(400).json({ok: false, error: 'Producto no existe'})
    };

    borrarArchivo(productDB.img, 'productos');

    productDB.img = nombreArchivo;

    productDB.save((error, productoGuardado) => res.status(200).json({ok: true, producto: productoGuardado }));

  })
}

function borrarArchivo(nombreImagen, tipo){
  
  let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);

  //Si existe la imagen elimina la version anterior 
  if(fs.existsSync(pathImagen)) fs.unlinkSync(pathImagen);
}


module.exports = upload;