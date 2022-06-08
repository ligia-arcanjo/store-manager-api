const productsModel = require('../models/productsModel');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  return products;
};

module.exports = { getAllProducts };
