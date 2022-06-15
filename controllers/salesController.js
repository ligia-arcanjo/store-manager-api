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

const updateSale = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const updatedSale = await salesService.updateSale(id, body);
    res.status(200).json(updatedSale);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  try {
    await salesService.deleteSale(id);
    res.status(204).json({ message: 'ok' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { getAllSales, getSaleById, addSale, updateSale, deleteSale };
