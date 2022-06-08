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
  const newProduct = await productsModel.addProduct(name, quantity);
  return newProduct;
};

module.exports = { getAllProducts, getProductById, addProduct };
