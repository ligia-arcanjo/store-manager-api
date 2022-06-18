const sinon = require('sinon');
const connection = require('../../../database/connection');
const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');
const { expect } = require('chai');

describe('Testa a camada service de vendas', () => {
  // getAllSales
  describe('Verifica se é possível listar todas as vendas', async () => {
    before(async () => {
      const execute = [
        { saleId: 1, date: '2022-06-18T01:27:32.000Z', productId: 1, quantity: 5 },
        { saleId: 1, date: '2022-06-18T01:27:32.000Z', productId: 2, quantity: 10 },
        { saleId: 2, date: '2022-06-18T01:27:32.000Z', productId: 3, quantity: 15 },
      ];

      sinon.stub(salesModel, 'getAllSales').resolves(execute);
    })

    after(async () => {
      salesModel.getAllSales.restore();
    });

    it('Quando há vendas cadastradas, é retornado um array com as informações das vendas', async () => {
      const response = await salesService.getAllSales();

      expect(response).to.be.an('array');
      expect(response[1]).to.be.a('object');
      response.forEach((element) => {
        expect(element).to.have.property('saleId');
        expect(element).to.have.property('date');
        expect(element).to.have.property('productId');
        expect(element).to.have.property('quantity');
      });
    });
  });

  // getSaleById
  describe('Verifica se é possível buscar venda pelo id', async () => {
    before(async () => {
      const execute = [
        { date: '2022-06-18T00:22:22.000Z', productId: 1, quantity: 5 },
        { date: '2022-06-18T00:22:22.000Z', productId: 2, quantity: 10 },
      ]
      sinon.stub(salesModel, 'getSaleById').resolves(execute);
    })

    after(async () => {
      salesModel.getSaleById.restore();
    });

    it('Quando se buscar pelo id, é retornado um array com as informações da venda', async () => {
      const response = await salesService.getSaleById(1);

      expect(response).to.be.an('array');
      expect(response[1]).to.be.a('object');
      response.forEach((element) => {
        expect(element).to.have.property('date');
        expect(element).to.have.property('productId');
        expect(element).to.have.property('quantity');
      });
    });
  });

  // addSale
  describe('Verifica se é possível adicionar uma venda', async () => {
    before(async () => {
      const execute = { id: 3, itemsSold: [ { productId: 1, quantity: 2 } ] };

      sinon.stub(salesModel, 'addSale').resolves([execute]);
    })

    after(async () => {
      salesModel.addSale.restore();
    });

    it('Quando é adicionada uma venda, retorna um objeto com as informações da venda', async () => {
      const sale = [{ productId: 1, quantity: 2 }];
      const response = await salesService.addSale(sale);

      expect(response).to.be.a('object');
      expect(response).to.have.property('id');
      expect(response).to.have.property('itemsSold');
    });
  });

  // updateSale
  describe('Verifica se é possível atualizar uma venda pelo id', async () => {
    before(async () => {
      const execute = { saleId: '1', itemUpdated: [ { productId: 1, quantity: 6 } ] };

      sinon.stub(salesModel, 'updateSale').resolves([execute]);
    })

    after(async () => {
      salesModel.updateSale.restore();
    });

    it('Quando atualiza uma venda pelo id, é retornado um array com as informações da venda', async () => {
      const idRequest = 1;
      const bodyRequest = [ { productId: 1, quantity: 6 } ];
      const response = await salesService.updateSale(idRequest, bodyRequest);

      expect(response).to.be.a('object');
      expect(response).to.have.property('saleId');
      expect(response).to.have.property('itemUpdated');
    });
  });
});
