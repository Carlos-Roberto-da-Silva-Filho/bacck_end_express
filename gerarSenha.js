const bcrypt = require('bcryptjs');

async function gerarHash(senha) {
  const saltRounds = 10;
  try {
    const hash = await bcrypt.hash(senha, saltRounds);
    console.log("Hash da senha:", hash);
    return hash;
  } catch (error) {
    console.error("Erro ao gerar o hash:", error);
    return null;
  }
}

// *** INSTRUÇÃO IMPORTANTE: Substitua 'sua_senha_aqui' pela senha que você deseja hashear ***
const senhaParaHashear = 'password456';

gerarHash(senhaParaHashear)