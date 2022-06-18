const sinon = require('sinon');
const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');
const { expect } = require('chai');

describe('Testa a camada controller de vendas', () => {
  // getAll
  describe('Verifica se é possível listar todas as vendas cadastradas', async () => {
    const response =  {};
    const request = {};

    before(async () => {
      const execute = [
        { saleId: 1, date: '2022-06-18T21:15:50.000Z', productId: 1, quantity: 5 },
        { saleId: 1, date: '2022-06-18T21:15:50.000Z', productId: 2, quantity: 10 },
        { saleId: 2, date: '2022-06-18T21:15:50.000Z', productId: 3, quantity: 15 },
      ];

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'getAllSales').resolves(execute);
    });

    after(async () => {
      salesService.getAllSales.restore();
    });

    it('Chama o método status com o código de resposta "200"', async () => {
      await salesController.getAllSales(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Chama o método json com o array de vendas', async () => {
      await salesController.getAllSales(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe('Verifica o retorno quando não há vendas cadastradas no banco de dados', async () => {
    const response = {};
    const request = {};

    before(async () => {
      const execute = [];

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'getAllSales').resolves(execute);
    });

    after(async () => {
      salesService.getAllSales.restore();
    });

    it('Chama o método status com o código de resposta "200"', async () => {
      await salesController.getAllSales(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Chama o método json com o array de vendas vazio', async () => {
      await salesController.getAllSales(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  // getById
  describe('Verifica se é possível buscar uma venda pelo id', async () => {
    const response =  {};
    const request = { params: { id: 1 }};

    before(async () => {
      const execute = [
        { date: '2022-06-18T21:20:29.000Z', productId: 1, quantity: 6 },
        { date: '2022-06-18T21:20:29.000Z', productId: 2, quantity: 10 },
      ];

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'getSaleById').resolves(execute);
    });

    after(async () => {
      salesService.getSaleById.restore();
    });

    it('Chama o método status com o código de resposta "200"', async () => {
      await salesController.getSaleById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Chama o método json com o array de vendas', async () => {
      await salesController.getSaleById(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe('Verifica se é retornado erro quando a venda buscado pelo id não existe', async () => {
    const response =  {};
    const request = { params: { id: 7 }};

    before(async () => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'getSaleById').throws('Sale not found')
    });

    after(async () => {
      salesService.getSaleById.restore();
    });

    it('Chama o método status com o código de resposta "404"', async () => {
      await salesController.getSaleById(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    // it('Chama o método json com o array de vendas', async () => {
    //   await salesController.getSaleById(request, response);

    //   expect(response.json.calledWith({ message: 'Sale not found' })).to.be.equal(true);
    // });
  });

  // addSale
  describe('Verifica se é possível adicionar uma nova venda', async () => {
    const response =  {};
    const request = { body: [{ productId: 1, quantity: 2}] };

    before(async () => {
      const execute = {
        id: 3,
        itemsSold: [ { productId: 1, quantity: 2 } ]
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'addSale').resolves(execute);
    });

    after(async () => {
      salesService.addSale.restore();
    });

    it('Chama o método status com o código de resposta "201"', async () => {
      await salesController.addSale(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('Chama o método json com um objeto com as informações da nova venda', async () => {
      await salesController.addSale(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });

  describe('Verifica se é retornado erro quando a venda tem quantidade do produto maior que o disponível', async () => {
    const response =  {};
    const request = { body: [{ productId: 1, quantity: 150 }] };

    before(async () => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'addSale').throws('Such amount is not permitted to sell')
    });

    after(async () => {
      salesService.addSale.restore();
    });

    it('Chama o método status com o código de resposta "404"', async () => {
      await salesController.addSale(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
    });
  });

  // updateSale
  describe('Verifica se é possível atualizar uma venda pelo id', async () => {
    const response =  {};
    const request = { params: { id: 1 }, body: [{ productId: 1, quantity: 6 }] };

    before(async () => {
      const execute = {
        saleId: 1,
        itemUpdated: [ { productId: 1, quantity: 6 } ],
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'updateSale').resolves(execute);
    });

    after(async () => {
      salesService.updateSale.restore();
    });

    it('Chama o método status com o código de resposta "200"', async () => {
      await salesController.updateSale(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Chama o método json com um objeto com as informações da venda atualizada', async () => {
      await salesController.updateSale(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });

  describe('Verifica se é retornado erro quando se tenta atualizar uma venda que não existe', async () => {
    const response =  {};
    const request = { params: { id: 8 }, body: [{ productId: 1, quantity: 6 }] };

    before(async () => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'updateSale').throws('Sale not found');
    });

    after(async () => {
      salesService.updateSale.restore();
    });

    it('Chama o método status com o código de resposta "404"', async () => {
      await salesController.updateSale(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });
  });

  // deleteSale
  describe('Verifica se é possível deletar uma venda pelo id', async () => {
    const response =  {};
    const request = { params: { id: 1 } };

    before(async () => {
      const execute = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'deleteSale').resolves(execute);
    });

    after(async () => {
      salesService.deleteSale.restore();
    });

    it('Chama o método status com o código de resposta "204"', async () => {
      await salesController.deleteSale(request, response);

      expect(response.status.calledWith(204)).to.be.equal(true);
    });
  });

  describe('Verifica se é retornado erro quando se tenta deletar uma venda que não existe', async () => {
    const response =  {};
    const request = { params: { id: 8 } };

    before(async () => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'deleteSale').throws('Sale not found');
    });

    after(async () => {
      salesService.deleteSale.restore();
    });

    it('Chama o método status com o código de resposta "404"', async () => {
      await salesController.deleteSale(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });
  });
});
