const sinon = require('sinon');
const connection = require('../../../database/connection');
const salesModel = require('../../../models/salesModel');
const { expect } = require('chai');

describe('Testa a camada models de vendas', () => {
  // getAllSales
  describe('Verifica se é possível listar todas as vendas cadastradas', async () => {
    before(async () => {
      const execute = [
        { saleId: 1, date: '2022-06-18T00:12:35.000Z', productId: 1, quantity: 5 },
        { saleId: 1, date: '2022-06-18T00:12:35.000Z', productId: 2, quantity: 10 },
        { saleId: 2, date: '2022-06-18T00:12:35.000Z', productId: 3, quantity: 15 },
      ];

      sinon.stub(connection, 'execute').resolves([execute]);
    })

    after(async () => {
      connection.execute.restore();
    });

    it('Quando existem vendas no banco de dados, retorna um array com as informações da venda', async () => {
      const response = await salesModel.getAllSales();

      expect(response).to.be.an('array');
      expect(response).to.have.length(3);
    });

    it('Quando existem produtos no banco de dados, retorna um array de objetos com as propriedades corretas', async () => {
      const response = await salesModel.getAllSales();

      expect(response[1]).to.be.a('object');
      response.forEach((element) => {
        expect(element).to.have.property('saleId');
        expect(element).to.have.property('date');
        expect(element).to.have.property('productId');
        expect(element).to.have.property('quantity');
      });
    });
  });

  describe('Verifica o retorno quando não há vendas cadastradas no banco de dados', async () => {
    before(async () => {
      const execute = [[]];
      sinon.stub(connection, 'execute').resolves(execute);
    });
  
    after(async () => {
      connection.execute.restore();
    });

    it('Quando não há dados cadastrados, retorna um array vazio', async () => {
      const response = await salesModel.getAllSales();

      expect(response).to.be.empty;
    });
  });

  // getSaleById
  describe('Verifica se é possível buscar uma venda pelo seu id', async () => {
    before(async () => {
      const execute = [
        { date: '2022-06-18T00:22:22.000Z', productId: 1, quantity: 5 },
        { date: '2022-06-18T00:22:22.000Z', productId: 2, quantity: 10 }
      ]
      sinon.stub(connection, 'execute').resolves([execute]);
    });
  
    after(async () => {
      connection.execute.restore();
    });

    it('Quando o id existe, retorna um array de objetos com as informações da venda', async () => {
      const response = await salesModel.getSaleById(1);

      expect(response).to.be.an('array');
      expect(response).to.have.length(2);
      response.forEach((element) => {
        expect(element).to.have.property('date');
        expect(element).to.have.property('productId');
        expect(element).to.have.property('quantity');
      });
    });
  });

  // addSale

  // updateSale

  // deleteSale
});
