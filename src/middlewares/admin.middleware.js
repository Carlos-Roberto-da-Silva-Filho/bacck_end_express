// src/middlewares/admin.middleware.js
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

const verificaTokenAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET)

    if (decoded.tipo !== 'admin') {
      return res.status(403).json({ error: 'Acesso negado. Apenas administradores podem acessar.' })
    }

    req.user = decoded // Armazena dados do usuário logado
    next()
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado' })
    }
    return res.status(401).json({ error: 'Token inválido' })
  }
}

module.exports = { verificaTokenAdmin }
