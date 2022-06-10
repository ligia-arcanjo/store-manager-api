const salesService = require('../services/salesService');

const getAllSales = async (_req, res) => {
  const salesInfo = await salesService.getAllSales();
  res.status(200).json(salesInfo);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getSaleById(id);

  if (sale.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  res.status(200).json(sale);
};

const addSale = async (req, res) => {
  const newSale = await salesService.addSale(req.body);
  res.status(201).json(newSale);
};

module.exports = { getAllSales, getSaleById, addSale };
