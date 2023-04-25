const helpers = require('../utils/helpers');

const generateToken = () => {
  const token = helpers.tokenGenerator();
  return token;
};
module.exports = { generateToken };