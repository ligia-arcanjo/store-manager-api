const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();

  return sales;
};

const getSaleById = async (id) => {
  const sale = await salesModel.getSaleById(id);

  if (sale.length === 0) {
    throw new Error('Sale not found');
  }

  return sale;
};

const addSale = async (sale) => {
  const [product] = await productsModel.getProductById(sale[0].productId);
  if (product.quantity < sale[0].quantity) {
    throw new Error('Such amount is not permitted to sell');
  }

  const idNewSale = await salesModel.addSale(sale);
  const newSaleInfos = {
    id: idNewSale,
    itemsSold: sale,
  };

  return newSaleInfos;
};

const updateSale = async (saleId, body) => {
  if (body[0].quantity < 1) {
    throw new Error('Sale not found');
  }

  await salesModel.updateSale(saleId, body[0]);

  const updatedSale = {
    saleId,
    itemUpdated: body,
  };

  return updatedSale;
};

const deleteSale = async (id) => {
  const saleById = await salesModel.getSaleById(id);

  if (saleById.length === 0) {
    throw new Error('Sale not found');
  }

  await salesModel.deleteSale(id);
};

module.exports = { getAllSales, getSaleById, addSale, updateSale, deleteSale };
