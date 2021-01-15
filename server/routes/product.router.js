const express = require('express');
const {checktoken} = require('../middleware/auth');
const {getProducts, getProductById, searchByTerm, createProduct, updateProductId, deleteProductById} = require('../controllers/products.controller');

const router = express.Router();

router.get('/', checktoken, getProducts);
router.get('/:productId', checktoken, getProductById);
router.get('/search/:term', checktoken, searchByTerm);
router.post('/', checktoken, createProduct);
router.put('/:productId', checktoken, updateProductId);
router.delete('/:productId', checktoken, deleteProductById);

module.exports = router;