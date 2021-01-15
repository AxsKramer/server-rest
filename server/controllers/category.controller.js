const Category = require('../models/category.model');


function getCategories(req, res) {
  Category.find({})
    .sort()
    .populate('user', 'email')
    .exec((error, categoriesDB) => {
      if(error) return res.status(500).json({ok: false, message: error.message});
      if(!categoriesDB) return res.status(400).json({ok: false, message: error.message});
      const categories = categoriesDB.length === 0 ? 'No hay categorias' : categoriesDB;
      res.status(200).json({ok: true, message: 'Categories listed', category: categories  });
    })
}

function getCategoryById(req, res) {
  Category.findById(req.params.categoryId, (error, categoriesDB) => {
    if(error) return res.status(500).json({ok: false, message: error.message});
    if(!categoriesDB) return res.status(400).json({ok: false, message: 'El ID no es correcto'});
    const categories = categoriesDB.length === 0 ? 'No hay categorias' : categoriesDB;
    res.status(200).json({ok: true, message: 'Category listed', category: categories });
  })
}

function createCategory(req, res) {
  const category = new Category({
    description: req.body.description,
    user: req.user._id,
  })
  category.save((error, categoryDB) => {
    if(error) return res.status(500).json({ok: false, message: error.message});
    if(!categoryDB) return res.status(400).json({ok: false, message: error.message});

    res.status(201).json({ok: true, message: 'Category Created', category: categoryDB });
  });
}

function updateCategoryById(req, res) {
  Category.findByIdAndUpdate(req.params.categoryId, req.body, { new: true, runValidators: true }, (error, categoryDB) => {
    if(error) return res.status(500).json({ok: false, message: error.message});
    if(!categoryDB) return res.status(400).json({ok: false, message: error.message});

    res.status(200).json({ok: true, message: 'Category updated', category: categoryDB });
  })
}

function deleteCategoryById(req, res) {
  Category.findByIdAndRemove(req.params.categoryId, (error, categoryDB) => {
    if(error) return res.status(500).json({ok: false, message: error.message});
    if(!categoryDB) return res.status(400).json({ok: false, message: 'El id no existe'});
    res.status(200).json({ok: true, message: 'Category deleted', id: categoryDB._id });
  })
}

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById
}