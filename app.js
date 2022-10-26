const express = require('express');
const productsRoutes = require('./routes/productsRoutes');
const salesRoutes = require('./routes/salesRoutes');

const app = express();

app.use(express.json());

app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);

module.exports = app;
