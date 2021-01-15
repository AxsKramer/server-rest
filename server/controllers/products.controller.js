const Product = require('../models/product.model');


function getProducts(req, res) {
  let from = req.query.from || 0;
  from = Number(from);

  Product.find({enable: true})
    .skip(from)
    .limit(5)
    .populate('user', 'name email' )
    .populate('category', 'description')
    .exec((error, productsDB) => {
      if(error) return res.status(500).json({ok: false, message: error.message});
      if(!productsDB) return res.status(400).json({ok: false, message: 'No hay productos'});
      res.status(201).json({ok: true, message: 'Products listed', product: productsDB });
    })
}

function getProductById(req, res) {
  Product.findById(req.params.productId)
    .populate('user', 'name, email')
    .populate('category', 'description') 
    .exec((error, productDB) => {
      if(error) return res.status(500).json({ok: false, message: error.message});
      if(!productDB) return res.status(400).json({ok: false, message: 'ID no encontrado'});
      res.status(201).json({ok: true, message: 'Product founded', product: productDB });
    })

}

function createProduct(req, res) {
  const product = new Product({
    user: req.user._id,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    enable: req.body.enable,
    category: req.body.category
  });

  product.save((error, productDB) => {
    if(error) return res.status(500).json({ok: false, message: error.message});
    if(!productDB) return res.status(400).json({ok: false, message: 'No se pudo crear el producto'});
    res.status(201).json({ok: true, message: 'Product Created', product: productDB });
  })
}

function updateProductId(req, res) {
  Product.findById(req.params.productId, (error, productDB) => {
    if(error) return res.status(500).json({ok: false, message: error.message});
    if(!productDB) return res.status(400).json({ok: false, message: 'ID no existe'});
    productDB.name = req.body.name;
    productDB.price = req.body.price;
    productDB.category = req.body.category;
    productDB.enable = req.body.enable;
    productDB.description = req.body.description;
    productDB.save((error, productDBUpdated) => {
      if(error) return res.status(500).json({ok: false, message: error.message});
      if(!productDBUpdated) return res.status(400).json({ok: false, message: 'No se pudo actualizar el producto'});
      res.status(200).json({ok: true, message: 'Product Updated', product: productDBUpdated });
    })
  })
}

function deleteProductById(req, res) {
  Product.findById(req.params.productId, (error, productDB) => {
    if(error) return res.status(500).json({ok: false, message: error.message});
    if(!productDB) return res.status(400).json({ok: false, message: 'ID no existe'});
    productDB.enable = false;
    productDB.save((error, productDBDeleted) => {
      if(error) return res.status(500).json({ok: false, message: error.message});
      res.status(200).json({ok: true, message: 'Product deleted', product: productDBDeleted._id });
    })
  })
}

function searchByTerm(req, res) {

  const regex = new RegExp(req.params.term, 'i');

  Producto.find({ name: regex })
    .populate('category', 'description')
    .exec((error, productsDB) => {
      if(error) return res.status(500).json({ok: false, message: error.message});
      res.status(200).json({ok: true, message: 'Products listed', products: productsDB});
    })
}

module.exports = {
  getProducts, 
  getProductById,
  searchByTerm,
  createProduct, 
  updateProductId, 
  deleteProductById
}