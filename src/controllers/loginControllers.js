const loginServices = require('../services/loginServices');

const generateToken = (req, res) => {
  const token = loginServices.generateToken();
  return res.status(200).json({ token });
};

module.exports = { generateToken };