// src/models/users.model.js
const fs = require('fs/promises')
const path = require('path')

const usuariosPath = path.join(__dirname, '../data/usuarios.json')
const adminsPath = path.join(__dirname, '../data/admins.json')

/*  Busca um usuário (admin ou comum) por username, priorizando admins
    Retorna o objeto do usuário + tipo ('admin' ou 'usuario') 
*/
const findAnyUserByUsername = async (username) => {
  // Primeiro tenta achar nos admins
  const adminsData = await fs.readFile(adminsPath, 'utf-8')
  const admins = JSON.parse(adminsData)
  const admin = admins.find(a => a.username === username)

  if (admin) {
    return { ...admin, tipo: 'admin' }
  }

  // Se não encontrar, busca nos usuários comuns
  const usuariosData = await fs.readFile(usuariosPath, 'utf-8')
  const usuarios = JSON.parse(usuariosData);
  const user = usuarios.find(u => u.username === username)

  if (user) {
    return { ...user, tipo: 'usuario' }
  }

  // Se não achar em nenhum, retorna null
  return null
}

module.exports = { findAnyUserByUsername }