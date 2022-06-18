const sinon = require('sinon');
const connection = require('../../../database/connection');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');
const { expect } = require('chai');

describe('Testa a camada service de produtos', () => {
  // getAllProducts
  describe('Verifica se é possível listar todos os produtos cadastrados do banco de dados', async () => {
    before(async () => {
      const execute = [
        { id: 1, name: 'Martelo de Thor', quantity: 10 },
        { id: 2, name: 'Traje de encolhimento', quantity: 20 },
        { id: 3, name: 'Escudo do Capitão América', quantity: 30 }
      ];

      sinon.stub(productsModel, 'getAllProducts').resolves(execute);
    })

    after(async () => {
      productsModel.getAllProducts.restore();
    });

    it('Quando existem produtos no banco de dados, retorna um array de produtos', async () => {
      const response = await productsService.getAllProducts();

      expect(response).to.be.an('array');
      expect(response).to.have.length(3);
    });

    it('Quando existem produtos no banco de dados, retorna um array de objetos com as propriedades corretas', async () => {
      const response = await productsService.getAllProducts();

      expect(response[0]).to.be.a('object');
      response.forEach((element) => {
        expect(element).to.have.property('id');
        expect(element).to.have.property('name');
        expect(element).to.have.property('quantity');
      });
    });
  });

  describe('Verifica o retorno quando não há produtos cadastrados no banco de dados', async () => {
    before(async () => {
      const execute = [];
      sinon.stub(productsModel, 'getAllProducts').resolves(execute);
    });
  
    after(async () => {
      productsModel.getAllProducts.restore();
    });

    it('Quando não há dados cadastrados, retorna um array vazio', async () => {
      const response = await productsService.getAllProducts();

      expect(response).to.be.empty;
    });
  });

  // getProductById
  describe('Verifica se é possível buscar um produto pelo id', async () => {
    before(async () => {
      const execute = { id: 1, name: 'Martelo de Thor', quantity: 10 };
      sinon.stub(productsModel, 'getProductById').resolves([execute]);
    });
  
    after(async () => {
      productsModel.getProductById.restore();
    });

    it('Quando um produto é buscado pelo id, retorna um objeto com id, name e quantity', async () => {
      const response = await productsService.getProductById(1);

      expect(response).to.be.a('object');
      expect(response).to.have.property('id');
      expect(response).to.have.property('name');
      expect(response).to.have.property('quantity');
    });
  });

  // addProduct
  describe('Verifica se é possível adicionar produto ao banco de dados', async () => {
    before(async () => {
      const execute = [
        { id: 1, name: 'Martelo de Thor', quantity: 10 },
        { id: 2, name: 'Traje de encolhimento', quantity: 20 },
        { id: 3, name: "Escudo do Capitão América", quantity: 30 }
      ];

      sinon.stub(productsModel, 'addProduct').resolves([{ id: 4, name: 'produto', quantity: 10 }]);
      sinon.stub(productsModel, 'getAllProducts').resolves([execute]);
    });
  
    after(async () => {
      productsModel.addProduct.restore();
      productsModel.getAllProducts.restore();
    });

    it('Quando é adicionado produto, retorna um objeto com as informações do novo produto', async () => {
      const productInfo = { product: 'produto', quantity: 10 };
      const response = await productsService.addProduct(productInfo.product, productInfo.quantity);

      expect(response).to.be.a('object');
      expect(response).to.have.property('id');
      expect(response).to.have.property('name');
      expect(response).to.have.property('quantity');
    });
  })

  // deleteProduct

  // updateProduct
});
