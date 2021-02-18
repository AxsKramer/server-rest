const fs = require('fs');
const path = require('path');

const getImagenes = (req, res) => {
  let tipo = req.params.tipo;
  let img = req. params.img

  let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);
  
  if(fs.existsSync(pathImagen)){
    res.sendFile(pathImagen);
  }
  else{
    let noimagePath = path.resolve(__dirname, '../assets/no-image.jpg');
    res.sendFile(noimagePath);
  }


}

module.exports = getImagenes;