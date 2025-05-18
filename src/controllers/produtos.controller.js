const produtoService = require('../services/produtos.service')

const getAllProdutos = async (req, res) => {    
    try {
        const produtos = await produtoService.getAll()
        return res.status(200).json(produtos)
        
    } catch (err) {
        console.error(err);
        if(err.message === "Produtos não encontrados!"){
            return res.status(404).json({message: err.message})
        }
        res.status(500).json({message: "Erro: " + err.message})
    }
}

module.exports = {
    getAllProdutos,
}