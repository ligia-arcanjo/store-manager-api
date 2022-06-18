const sinon = require('sinon');
const connection = require('../../../database/connection');
const productsModels = require('../../../models/productsModel');
const { expect } = require('chai');

describe('Testa a camada models de produtos', () => {
  describe('Verifica se é possível listar todos os produtos cadastrados do banco de dados', async () => {
    before(async () => {
      const execute = [
        { id: 1, name: 'Martelo de Thor', quantity: 10 },
        { id: 2, name: 'Traje de encolhimento', quantity: 20 },
        { id: 3, name: 'Escudo do Capitão América', quantity: 30 }, 
      ];

      sinon.stub(connection, 'execute').resolves([execute]);
    })

    after(async () => {
      connection.execute.restore();
    });

    it('Quando existem produtos no banco de dados, retorna um array de produtos', async () => {
      const response = await productsModels.getAllProducts();

      expect(response).to.be.an('array');
      expect(response).to.have.length(3);
    });

    it('Quando existem produtos no banco de dados, retorna um array de objetos com as propriedades corretas', async () => {
      const response = await productsModels.getAllProducts();

      expect(response[1]).to.be.a('object');
      response.forEach((element) => {
        expect(element).to.have.property('id');
        expect(element).to.have.property('name');
        expect(element).to.have.property('quantity');
      });
    });
  });

  describe('Verifica o retorno quando não há produtos cadastrados no banco de dados', async () => {
    before(async () => {
      const execute = [[]];
      sinon.stub(connection, 'execute').resolves(execute);
    });
  
    after(async () => {
      connection.execute.restore();
    });

    it('Quando não há dados cadastrados, retorna um array vazio', async () => {
      const response = await productsModels.getAllProducts();

      expect(response).to.be.an('array');
      expect(response).to.have.length(0);
    });
  });

  describe('Verifica se é possível buscar um produto pelo seu id', async () => {
    before(async () => {
      const execute = [{ id: 2, name: 'Traje de encolhimento', quantity: 20 }];
      sinon.stub(connection, 'execute').resolves(execute);
    });
  
    after(async () => {
      connection.execute.restore();
    });

    it('Quando o id existe, retorna um objeto com as informações do produto', async () => {
      const response = await productsModels.getProductById(2);

      expect(response).to.be.a('object');
      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('quantity');
    });
  });

  describe('Verifica o retorno quando não há produto com o id passado', async () => {
    before(async () => {
      const execute = [[]];
      sinon.stub(connection, 'execute').resolves(execute);
    });
  
    after(async () => {
      connection.execute.restore();
    });

    it('Quando não há produto com o id informado, retorna um array vazio', async () => {
      const response = await productsModels.getProductById(7);

      expect(response).to.have.length(0);
      expect(response).to.be.empty;
    });
  });
});
