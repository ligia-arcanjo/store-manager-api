const connection = require('../database/connection');

const getAllProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products');

  return products;
};

const getProductById = async (id) => {
  const [product] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);

  return product;
};

const addProduct = async (name, quantity) => {
  const [product] = await connection.execute(
    'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)',
    [name, quantity],
  );

  return product.insertId;
};

const deleteProduct = async (id) => {
  await connection.execute('DELETE FROM StoreManager.products WHERE id = ?', [id]);
};

const updateProduct = async (name, quantity, id) => {
  const [product] = await connection.execute(
    `UPDATE StoreManager.products
    SET name = ?, quantity = ?
    WHERE id = ?`,
    [name, quantity, id],
  );

  return product.affectedRows;
};

module.exports = { getAllProducts, getProductById, addProduct, deleteProduct, updateProduct };
