// src/controllers/admin.controller.js
const adminService = require('../services/admin.service')
const upload = require('../middlewares/upload.middleware')

const listarProdutosAdmin = async (req, res) => {
  try {
    const produtos = await adminService.listarProdutos()
    res.json(produtos)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const consultarProdutosPorNome = async (req, res) => {
  try {
    const { name } = req.query
    if (!name) {
      return res.status(400).json({ error: 'Parâmetro name é obrigatório' })
    }
    const produtos = await adminService.consultarProdutosPorNome(name)
    res.json(produtos)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const cadastrarProduto = async (req, res) => {
  upload.single('thumbnail')(req, res, async (err) => { // Use o middleware
    try {
      if (err) {
        return res.status(400).json({ error: err.message })
      }

      const novoProduto = {
        ...req.body,
        thumbnail: req.file ? `/img/${req.file.filename}` : null
      }

      const produtoCriado = await adminService.cadastrarProduto(novoProduto);
      res.status(201).json(produtoCriado)

    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })
}

const consultarProduto = async (req, res) => {
  try {
    const { id } = req.params
    const produto = await adminService.consultarProduto(id)
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' })
    }
    res.json(produto)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const atualizarProduto = async (req, res) => {
  upload.single('thumbnail')(req, res, async (err) => { // Aplica o middleware para atualização
    try {
      if (err) {
        return res.status(400).json({ error: err.message })
      }

      const dadosAtualizados = {
        ...req.body,
        thumbnail: req.file ? `/img/${req.file.filename}` : null
      }

      const { id } = req.params
      const produtoAtualizado = await adminService.atualizarProduto(id, dadosAtualizados, req.file)

      if (!produtoAtualizado) {
        return res.status(404).json({ error: 'Produto não encontrado' })
      }
      res.json(produtoAtualizado)

    } catch (error) {
      console.error('Erro ao atualizar produto:', error)
      res.status(500).json({ error: error.message })
    }
  })
}

const apagarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const sucesso = await adminService.apagarProduto(id)
    if (!sucesso) {
      return res.status(404).json({ error: 'Produto não encontrado' })
    }
    res.json({ message: 'Produto deletado com sucesso' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

const atualizarEstoqueProduto = async (req, res) => {
  try {
    const { id } = req.params
    const { stock } = req.body

    if (stock === undefined || typeof stock !== 'number' || stock < 0) {
      return res.status(400).json({ error: 'O campo stock não deve ser um número negativo' })
    }

    const produtoAtualizado = await adminService.atualizarEstoqueProduto(id, stock)

    if (!produtoAtualizado) {
      return res.status(404).json({ error: 'Produto não encontrado' })
    }

    res.json(produtoAtualizado)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deletarArquivoJson = async (req, res) => {
  try {
    const { nome } = req.params
    const resultado = await adminService.deletarArquivoJson(nome)
    res.json({ message: resultado })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  listarProdutosAdmin,
  consultarProdutosPorNome,
  cadastrarProduto,
  consultarProduto,
  atualizarProduto,
  apagarProduto,
  atualizarEstoqueProduto,
  deletarArquivoJson
}