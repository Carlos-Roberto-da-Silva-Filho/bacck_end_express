// src/routes/admin.routes.js
const express = require('express')
const router = express.Router()
const { verificaTokenAdmin } = require('../middlewares/admin.middleware')
const adminController = require('../controllers/admin.controller')

// Todas as rotas aqui usam o middleware para verificar token admin
router.use(verificaTokenAdmin)

/*  IMPORTANTE: A rota '/produtos/search' precisa estar antes da rota '/produtos/:id'
    porque o Express interpreta '/produtos/:id' como um parâmetro dinâmico que captura qualquer valor.
    Se '/produtos/:id' ficar antes, a rota de busca por nome nunca será alcançada,
    já que 'search' será interpretado como um 'id'. */

// GET /admin/produtos - listar todos os produtos
router.get('/produtos', adminController.listarProdutosAdmin)

// GET /admin/produtos/search?name= - buscar produtos por nome
router.get('/produtos/search', adminController.consultarProdutosPorNome)

// POST /admin/produtos - cadastrar novo produto
router.post('/produtos', adminController.cadastrarProduto)

// GET /admin/produtos/:id - consultar produto pelo id
router.get('/produtos/:id', adminController.consultarProduto)

// PUT /admin/produtos/:id - atualizar produto pelo id
router.put('/produtos/:id', adminController.atualizarProduto)

// DELETE /admin/produtos/:id - apagar produto pelo id
router.delete('/produtos/:id', adminController.apagarProduto)

// PATCH /admin/produtos/:id/estoque - atualizar apenas o estoque do produto
router.patch('/produtos/:id/estoque', adminController.atualizarEstoqueProduto)

// DELETE /admin/arquivos/:nome - deletar um arquivo JSON da pasta /data
router.delete('/arquivos/:nome', adminController.deletarArquivoJson)

module.exports = router
