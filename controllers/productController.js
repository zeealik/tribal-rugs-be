const Product = require('../models/productModel');
const {
  PRODUCT_NOT_FOUND,
  PRODUCT_FETCH_ERROR,
  PRODUCT_CREATE_FAILURE,
} = require('../constants/messages');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: PRODUCT_FETCH_ERROR });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: PRODUCT_NOT_FOUND });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: PRODUCT_FETCH_ERROR });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, images } = req.body;
    const newProduct = await Product.create({ name, description, price, category, stock, images });
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: PRODUCT_CREATE_FAILURE });
  }
};
