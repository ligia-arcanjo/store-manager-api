const productsService = require('../services/productsService');

const getAllProducts = async (_req, res) => {
  const productsList = await productsService.getAllProducts();
  res.status(200).json(productsList);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const [product] = await productsService.getProductById(id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.status(200).json(product);
};

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;

  try {
    const newProduct = await productsService.addProduct(name, quantity);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(409).json({ message: 'Product already exists' });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await productsService.deleteProduct(id);
  res.status(204).end();
};

module.exports = { getAllProducts, getProductById, addProduct, deleteProduct };
