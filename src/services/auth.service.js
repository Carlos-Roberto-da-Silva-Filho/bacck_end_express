const jwt = require('jsonwebtoken');
const { findUserByUsername } = require('../models/users.model');

const JWT_SECRET = process.env.JWT_SECRET;

const login = async (username, password) => {
  const user = await findUserByUsername(username);

  if (!user || user.password !== password) {
    throw new Error('Usuário ou senha inválidos');
  }

  // Gera token JWT válido por 1 hora
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: '1h'
  });

  return token;
};

module.exports = { login };
