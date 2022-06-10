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

module.exports = { getAllSales, getSaleById, addSale };
