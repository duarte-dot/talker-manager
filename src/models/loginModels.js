const helpers = require('../helpers');

const generateToken = () => {
  const token = helpers.tokenGenerator();
  return token;
};
module.exports = { generateToken };