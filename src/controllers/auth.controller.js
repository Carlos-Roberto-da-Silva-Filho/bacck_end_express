const authService = require('../services/auth.service');

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const token = await authService.login(username, password);
    res.status(200).json({ accessToken: token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = { login };
