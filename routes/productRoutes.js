const express = require('express');
const {
  getAllProducts,
  getProductById,
  createProduct,
} = require('../controllers/productController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', authMiddleware, createProduct);

module.exports = router;
