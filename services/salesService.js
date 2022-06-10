const salesModel = require('../models/salesModel');

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return sales;
};

const getSaleById = async (id) => {
  const sale = await salesModel.getSaleById(id);
  return sale;
};

const addSale = async (sale) => {
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

module.exports = { getAllSales, getSaleById, addSale, updateSale };
