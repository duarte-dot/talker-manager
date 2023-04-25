const loginModels = require('../models/loginModels');

const generateToken = () => loginModels.generateToken();

module.exports = { generateToken };