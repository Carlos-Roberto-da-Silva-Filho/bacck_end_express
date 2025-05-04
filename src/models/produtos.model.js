// models/produtos.model.js

const fs = require('fs/promises')
const path = require('path')

const filePath = path.join(__dirname, '../data/produtos.json')

const getProdutos = async () => {
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
}

module.exports = {
    getProdutos
}
