const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let produtos = [];

app.get('/api/listarProdutos', (req, res) => {
  res.status(200).json(produtos);
})

app.post('/api/criarProdutos', (req, res) => {
  const { nome, preco } = req.body;
  const produto = { id: produtos.length + 1, nome: nome, preco: preco };
  produtos.push(produto);
  res.status(201).json(produto);
});

app.get('/api/consultarProduto/:id', (req, res) => {
  let id  = req.params.id;
  for(let produto of produtos){
    if(produto.id == id){
      return res.status(200).json(produto);
    }
  }
  res.status(404).json({ message: 'Produto não encontrado' });
});

app.put('/api/atualizarProduto/:id', (req, res) => {
  let id  = req.params.id;
  const { nome, preco } = req.body;
  for(let produto of produtos){
    if(produto.id == id){
      produto.nome = nome;
      produto.preco = preco;
      return res.status(200).json(produto);
    }
  }
  res.status(404).json({ message: 'Produto não encontrado' });
});

app.delete('/api/deletarProduto/:id', (req, res) => {
  let id  = req.params.id;
  for(let i = 0; i < produtos.length; i++){
    if(produtos[i].id == id){
      produtos.splice(i, 1);
      return res.status(200).json({ message: 'Produto deletado com sucesso' });
    }
  }
  res.status(404).json({ message: 'Produto não encontrado' });
});

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.listen(port, () => {
  console.log(`app listening on, port ${port}`)
});


module.exports = app