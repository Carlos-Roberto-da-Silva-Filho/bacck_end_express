const { getProdutos } = require('../models/produtos.model')

const getAll = async () => {
    const produtos = await getProdutos()
    if(!produtos || produtos.length === 0){
        throw new Error ('Produtos não encontrados!')
    }
    return produtos
}

module.exports = {
    getAll
}