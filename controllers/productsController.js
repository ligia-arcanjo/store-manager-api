const productsService = require('../services/productsService');

const getAllProducts = async (_req, res) => {
  const productsList = await productsService.getAllProducts();
  res.status(200).json(productsList);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getProductById(id);

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
    res.status(409).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await productsService.deleteProduct(id);
    res.status(204).end();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  try {
    const product = await productsService.updateProduct(name, quantity, id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { getAllProducts, getProductById, addProduct, deleteProduct, updateProduct };
