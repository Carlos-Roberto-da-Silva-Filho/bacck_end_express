const fs = require('fs/promises');
const path = require('path');

const filePath = path.join(__dirname, '../data/usuarios.json');

const findUserByUsername = async (username) => {
  const data = await fs.readFile(filePath, 'utf-8');
  const users = JSON.parse(data);
  return users.find(user => user.username === username);
};

module.exports = { findUserByUsername };
