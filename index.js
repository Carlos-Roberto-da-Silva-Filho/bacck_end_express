require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

const PORT = process.env.PORT
const hostname = 'localhost'

const produtosRoutes = require('./src/routes/produtos.routes')


// -------------- config -------------------
app.use(express.json())
app.use(cors())
// -----------------------------------------

// --------------- routes privadas ---------
app.use('/produtos', produtosRoutes)


// ------------- rota raiz para teste ------
app.get('/', (req, res) => {
    res.status(200).json({message: 'API do e-commerce online!'})
  })


// -----------------------------------------
app.listen(PORT, hostname, () => {
    console.log(`Servidor rodando em ${hostname}:${PORT}`)
})