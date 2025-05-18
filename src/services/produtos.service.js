const { lerProdutos } = require('../models/produtos.model')

const getAll = async () => {
    const produtos = await lerProdutos()
    if(!produtos || produtos.length === 0){
        throw new Error ('Produtos não encontrados!')
    }
    return produtos
}

module.exports = {
    getAll
}