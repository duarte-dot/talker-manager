const checkToken = require('./checkToken');
const checkRate = require('./checkRate');

const checkTokenAndRate = [checkToken, checkRate];

module.exports = checkTokenAndRate;