const express = require('express');
const {checktoken, checkAdminRole} = require('../middleware/auth');
const router = express.Router();
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById
} = require('../controllers/category.controller');

router.get('/',checktoken,getCategories);
router.get('/:categoryId', checktoken, getCategoryById);
router.post('/',checktoken, createCategory);
router.put('/:categoryId', checktoken, updateCategoryById);
router.delete('/:categoryId', [checktoken, checkAdminRole], deleteCategoryById);

module.exports = router


