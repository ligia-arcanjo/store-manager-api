const connection = require('../database/connection');

const getAllSales = async () => {
  const [sales] = await connection.execute('SELECT * FROM StoreManager.sales');
  return sales;
};

module.exports = { getAllSales };
