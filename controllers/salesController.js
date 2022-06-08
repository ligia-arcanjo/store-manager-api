const salesService = require('../services/salesService');

const getAllSales = async (_req, res) => {
  const salesInfo = await salesService.getAllSales();
  res.status(200).json(salesInfo);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getSaleById(id);

  if (!sale) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  res.status(200).json(sale);
};

module.exports = { getAllSales, getSaleById };
