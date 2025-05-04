const express = require('express')
const router = express.Router()
const produtosController = require('../controllers/produtos.controller')

//GET: localhost:3000/produtos
router.get('/', produtosController.getAllProdutos)


module.exports = router