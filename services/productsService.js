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
  const products = await productsModel.getAllProducts();
  const productExists = products.some((e) => e.id === Number(id));

  if (!productExists) {
    throw new Error('Product not found');
  }
  
  const productDelete = await productsModel.deleteProduct(id);
  return productDelete;
};

const updateProduct = async (name, quantity, id) => {
  const products = await productsModel.getAllProducts();
  const productExists = products.some((e) => e.id === Number(id));

  if (!productExists) {
    throw new Error('Product not found');
  }
  
  const updatedProduct = await productsModel.updateProduct(name, quantity, id);

  return updatedProduct;
};

module.exports = { getAllProducts, getProductById, addProduct, deleteProduct, updateProduct };
