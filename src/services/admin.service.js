const fs = require('fs/promises')
const path = require('path')

const caminhoArquivo = path.join(__dirname, '../data/produtos.json')
const caminhoImagens = path.join(__dirname, '../../public/img') // Ajuste o caminho conforme a sua estrutura

// Função auxiliar para ler o arquivo
async function lerArquivo() {
  const data = await fs.readFile(caminhoArquivo, 'utf-8')
  return JSON.parse(data)
}

// Função auxiliar para salvar no arquivo
async function salvarArquivo(dados) {
  await fs.writeFile(caminhoArquivo, JSON.stringify(dados, null, 2))
}

// Formata produto para garantir ordem: id, title, price, stock, thumbnail
function formatarProduto(produto) {
  return {
    id: produto.id,
    title: produto.title,
    price: produto.price,
    stock: produto.stock,
    thumbnail: produto.thumbnail
  }
}

// Salva com a ordem correta no JSON
function prepararParaSalvar(produto) {
  return {
    id: produto.id,
    title: produto.title,
    price: produto.price,
    stock: produto.stock,
    thumbnail: produto.thumbnail
  }
}

async function listarProdutos() {
  const produtos = await lerArquivo()
  return produtos.map(formatarProduto)
}

async function consultarProduto(id) {
  const produtos = await lerArquivo()
  const produto = produtos.find(p => p.id === Number(id))
  return produto ? formatarProduto(produto) : null
}

async function consultarProdutosPorNome(nome) {
  const produtos = await lerArquivo()
  const nomeMinusculo = nome.toLowerCase()
  const filtrados = produtos.filter(p => p.title.toLowerCase().includes(nomeMinusculo))
  return filtrados.map(formatarProduto)
}

async function cadastrarProduto(novoProduto) {
  const produtos = await lerArquivo()
  const maxId = produtos.reduce((max, p) => (p.id > max ? p.id : max), 0)

  const produto = {
    id: maxId + 1,
    title: novoProduto.title,
    price: novoProduto.price,
    stock: novoProduto.stock || 0,
    thumbnail: novoProduto.thumbnail // Salva o caminho da imagem
  }

  produtos.push(prepararParaSalvar(produto))
  await salvarArquivo(produtos)
  return produto
}

async function atualizarProduto(id, produtoAtualizado, novoArquivo) {
  const produtos = await lerArquivo()
  const indice = produtos.findIndex(p => p.id === Number(id))
  if (indice === -1) return null

  const produtoExistente = produtos[indice]
  let novoCaminhoImagem

  if (novoArquivo && novoArquivo.buffer) { // Verifique se novoArquivo e novoArquivo.buffer existem
    const extensao = path.extname(novoArquivo.originalname)
    novoCaminhoImagem = `/images/${Date.now()}${extensao}`
    await fs.writeFile(path.join(caminhoImagens, novoCaminhoImagem), novoArquivo.buffer)

    // Apagar a imagem antiga, se existir e for diferente
    if (produtoExistente.thumbnail && produtoExistente.thumbnail.startsWith('/images/') && produtoExistente.thumbnail !== novoCaminhoImagem) {
      try {
        await fs.unlink(path.join(__dirname, '../../public', produtoExistente.thumbnail))
      } catch (error) {
        console.error('Erro ao apagar imagem antiga:', error)
      }
    }
  }

  const produto = {
    id: produtoExistente.id,
    title: produtoAtualizado.title || produtoExistente.title,
    price: produtoAtualizado.price || produtoExistente.price,
    stock: produtoAtualizado.stock !== undefined ? produtoAtualizado.stock : produtoExistente.estoque,
    thumbnail: novoCaminhoImagem || produtoAtualizado.thumbnail || produtoExistente.thumbnail
  }
  produtos[indice] = prepararParaSalvar(produto)
  await salvarArquivo(produtos)
  return formatarProduto(produto)
}

async function apagarProduto(id) {
  const produtos = await lerArquivo()
  const indice = produtos.findIndex(p => p.id === Number(id))
  if (indice === -1) return false

  const produtoExistente = produtos[indice]
  // Apagar a imagem associada, se existir
  if (produtoExistente.thumbnail && produtoExistente.thumbnail.startsWith('/images/')) {
    try {
      await fs.unlink(path.join(__dirname, '../../public', produtoExistente.thumbnail))
    } catch (error) {
      console.error('Erro ao apagar imagem do produto:', error)
    }
  }

  produtos.splice(indice, 1)
  await salvarArquivo(produtos)
  return true
}

async function atualizarEstoqueProduto(id, novoEstoque) {
  const produtos = await lerArquivo()
  const indice = produtos.findIndex(p => p.id === Number(id))
  if (indice === -1) return null

  produtos[indice].stock = novoEstoque

  await salvarArquivo(produtos)
  const produto = produtos[indice]

  return {
    id: produto.id,
    title: produto.title,
    price: produto.price,
    stock: produto.stock,
    thumbnail: produto.thumbnail
  }
}

async function deletarArquivoJson(nomeArquivo) {
  if (nomeArquivo.includes('..') || !nomeArquivo.endsWith('.json')) {
    throw new Error('Nome de arquivo inválido')
  }

  const caminho = path.join(__dirname, '../data', nomeArquivo)

  try {
    await fs.unlink(caminho)
    return `Arquivo ${nomeArquivo} deletado com sucesso`
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('Arquivo não encontrado')
    }
    throw new Error(`Erro ao deletar o arquivo: ${error.message}`)
  }
}

module.exports = {
  listarProdutos,
  consultarProduto,
  consultarProdutosPorNome,
  cadastrarProduto,
  atualizarProduto,
  apagarProduto,
  atualizarEstoqueProduto,
  deletarArquivoJson
}