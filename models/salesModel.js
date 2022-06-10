const connection = require('../database/connection');

const getAllSales = async () => {
  const [sales] = await connection.execute(
    `SELECT
      sales.id AS saleId,
      sales.date,
      sales_products.product_id AS productId,
      sales_products.quantity
    FROM sales AS sales
    INNER JOIN sales_products AS sales_products
    ON sales.id = sales_products.sale_id`,
  );
  return sales;
};

const getSaleById = async (id) => {
  const [sales] = await connection.execute(
    `SELECT
      sales.date,
      sales_products.product_id AS productId,
      sales_products.quantity
    FROM sales AS sales
    INNER JOIN sales_products AS sales_products
    ON sales.id = sales_products.sale_id
    WHERE sales.id = ?`,
    [id],
  );
  return sales;
};

const addSaleProducts = async (insertId, productId, quantity) => {
  const [saleProducts] = await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?)`,
    [insertId, productId, quantity],
  );

  return saleProducts;
};

const addSale = async (sale) => {
  const [saleInsert] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (now())',
  );
  const { insertId } = saleInsert;

  sale.forEach(async (element) => {
    await addSaleProducts(insertId, element.productId, element.quantity);
  });

  return insertId;
};

module.exports = { getAllSales, getSaleById, addSale };
