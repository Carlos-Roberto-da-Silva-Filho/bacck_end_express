// src/services/auth.service.js
const jwt = require('jsonwebtoken')
const { findAnyUserByUsername } = require('../models/users.model')

const JWT_SECRET = process.env.JWT_SECRET

const login = async (username, password) => {
  const user = await findAnyUserByUsername(username)

  if (!user || user.password !== password) {
    throw new Error('Usuário ou senha inválidos')
  }

  const { id, tipo } = user

  // Gera token JWT válido por 1 hora
  const token = jwt.sign(
    { id, username, tipo },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  return { token, tipo, username }
}

module.exports = { login }

