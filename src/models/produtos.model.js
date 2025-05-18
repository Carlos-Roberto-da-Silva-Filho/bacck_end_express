// models/produtos.model.js
const fs = require('fs/promises')
const path = require('path')

const caminhoArquivo = path.join(__dirname, '../data/produtos.json')

async function lerProdutos() {
  const data = await fs.readFile(caminhoArquivo, 'utf-8')
  return JSON.parse(data)
}

async function salvarProdutos(produtos) {
  await fs.writeFile(caminhoArquivo, JSON.stringify(produtos, null, 2))
}

module.exports = {
  lerProdutos,
  salvarProdutos
}
