const productsModel = require('../models/productsModel');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  return products;
};

const getProductById = async (id) => {
  const product = await productsModel.getProductById(id);
  return product;
};

const addProduct = async (name, quantity) => {
  const products = await productsModel.getAllProducts();
  const productExists = products.some((e) => e.name === name);

  if (productExists) {
    throw new Error('Product already exists');
  }

  const newProduct = await productsModel.addProduct(name, quantity);
  return newProduct;
};

const deleteProduct = async (id) => {
  await productsModel.deleteProduct(id);
};

module.exports = { getAllProducts, getProductById, addProduct, deleteProduct };
