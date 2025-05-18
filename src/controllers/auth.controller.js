// src/controllers/auth.controller.js
const authService = require('../services/auth.service')

const login = async (req, res) => {
  const { username, password } = req.body

  try {
    const { token, tipo, username: nome } = await authService.login(username, password)
    res.status(200).json({
      accessToken: token,
      tipo,
      username: nome
    });
  } catch (error) {
    res.status(401).json({ error: error.message })
  }
}

module.exports = { login }
