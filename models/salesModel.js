const connection = require('../database/connection');

const getAllSales = async () => {
  const [sales] = await connection.execute(
    `SELECT
    sales.id AS saleId, sales.date, sales_products.product_id AS productId, sales_products.quantity
    FROM sales AS sales
    INNER JOIN sales_products AS sales_products
    ON sales.id = sales_products.sale_id`,
  );
  return sales;
};

module.exports = { getAllSales };
