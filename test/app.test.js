const request = require('supertest');
const app = require('../API/app');
describe('Testando api produtos', () => {
  test('Lista vazia', async () => {
    const res = await request(app).get('/api/listarProdutos');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
  });

  test('Criar produto', async () => {
    const produto = { nome: 'queijo', preco: 7 };
    const res = await request(app).post('/api/criarProdutos').send(produto);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toEqual(produto.name);
    expect(res.body.preco).toEqual(produto.preco);
  })

  test('Consultar produto', async () => {
    const produto = { nome: 'queijo', preco: 7 };
    const res = await request(app).get('/api/consultarProduto/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toEqual(produto.name);
    expect(res.body.preco).toEqual(produto.preco);
  })

  test('Atualizar produto', async () => {
    const produto = { nome: 'queijo', preco: 7 };
    const res = await request(app).put('/api/atualizarProduto/1').send(produto);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toEqual(produto.name);
    expect(res.body.preco).toEqual(produto.preco);
  })

  test('Deletar produto', async () => {
    const res = await request(app).delete('/api/deletarProduto/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toEqual('Produto deletado com sucesso');
  })

  test('Produto não encontrado', async () => {
    const res = await request(app).get('/api/consultarProduto/1');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toEqual('Produto não encontrado');
  })
  
})
