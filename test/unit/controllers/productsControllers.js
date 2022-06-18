const sinon = require('sinon');
const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');
const { expect } = require('chai');

describe('Testa a camada controller de produtos', async () => {
  // getAll
  describe('Verifica se é possível listar todos os produtos cadastrados do banco de dados', async () => {
    const response =  {};
    const request = {};

    before(async () => {
      const execute = [
        { id: 1, name: "Martelo de Thor", quantity: 10 },
        { id: 2, name: "Traje de encolhimento", quantity: 20 },
        { id: 3, name: "Escudo do Capitão América", quantity: 30 },
      ];

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'getAllProducts').resolves(execute);
    });

    after(async () => {
      productsService.getAllProducts.restore();
    });

    it('Chama o método status com o código de resposta "200"', async () => {
      await productsController.getAllProducts(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Chama o método json com o array de produtos', async () => {
      await productsController.getAllProducts(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe('Verifica o retorno quando não há produtos cadastrados no banco de dados', async () => {
    const response = {};
    const request = {};

    before(async () => {
      const execute = [];

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'getAllProducts').resolves(execute);
    });

    after(async () => {
      productsService.getAllProducts.restore();
    });

    it('Chama o método status com o código de resposta "200"', async () => {
      await productsController.getAllProducts(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Chama o método json com o array de produtos vazio', async () => {
      await productsController.getAllProducts(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  // getById
  describe('Verifica se é possível buscar um produto cadastrado do banco de dados pelo id', async () => {
    const response =  {};
    const request = { params: { id: 1 }};

    before(async () => {
      const execute = { id: 1, name: 'Martelo de Thor', quantity: 10 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'getProductById').resolves(execute);
    });

    after(async () => {
      productsService.getProductById.restore();
    });

    it('Chama o método status com o código de resposta "200"', async () => {
      await productsController.getProductById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Chama o método json com o objeto com as informações do produto buscado', async () => {
      await productsController.getProductById(request, response);

      expect(response.json.calledWith({ id: 1, name: 'Martelo de Thor', quantity: 10 })).to.be.equal(true);
    });
  });

  // addProduct
  describe('Verifica se é possível adicionar um produto ao banco de dados', async () => {
    const response =  {};
    const request = { body: { name: 'produto', quantity: 10 }};

    before(async () => {
      const execute = { id: 4, name: 'produto', quantity: 10 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'addProduct').resolves(execute);
    });

    after(async () => {
      productsService.addProduct.restore();
    });

    it('Chama o método status com o código de resposta "201"', async () => {
      await productsController.addProduct(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('Chama o método json com o objeto com as informações do produto criado', async () => {
      await productsController.addProduct(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });

  // updateProduct
  describe('Verifica se é possível atualizar um produto através do id', async () => {
    const response =  {};
    const request = {
      params: { id: 1 },
      body: { name: 'produto', quantity: 15 }
    };

    before(async () => {
      const execute = { id: 1, name: 'produto', quantity: 15 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'updateProduct').resolves(execute);
    });

    after(async () => {
      productsService.updateProduct.restore();
    });

    it('Chama o método status com o código de resposta "200"', async () => {
      await productsController.updateProduct(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Chama o método json com o objeto com as informações do produto criado', async () => {
      await productsController.updateProduct(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });

  // deleteProduct
  describe('Verifica se é possível deletar um produto do banco de dados através do id', async () => {
    const response =  {};
    const request = { params: { id: 1 }};

    before(async () => {
      const execute = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'deleteProduct').resolves(execute);
    });

    after(async () => {
      productsService.deleteProduct.restore();
    });

    it('Chama o método status com o código de resposta "204"', async () => {
      await productsController.deleteProduct(request, response);

      expect(response.status.calledWith(204)).to.be.equal(true);
    });
  });
});
