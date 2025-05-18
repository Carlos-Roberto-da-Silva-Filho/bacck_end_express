require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')

const PORT = process.env.PORT
const hostname = 'localhost'

// ------- Rotas ---------------
const produtosRoutes = require('./src/routes/produtos.routes')
const authRoutes = require('./src/routes/auth.routes')
const adminRoutes = require('./src/routes/admin.routes') // Importa as rotas admin

// -------------- config -------------------
// Servir arquivos estáticos da pasta 'public'
app.use('/img', express.static(path.join(__dirname, 'public', 'img')))
app.use(express.json())
app.use(cors())
// -----------------------------------------

// -------------- routes públicas ----------
app.use('/auth', authRoutes)

// --------------- routes privadas ---------
app.use('/produtos', produtosRoutes)

// ------------ rotas admin ---------------
app.use('/admin', adminRoutes)

// ------------- rota raiz para teste ------
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API do e-commerce online!' })
})

// -----------------------------------------
app.listen(PORT, hostname, () => {
  console.log(`Servidor rodando em ${hostname}:${PORT}`)
})