const checkToken = require('./checkToken');
const checkURLDate = require('./checkURLDate');
const checkURLRate = require('./checkURLRate');

const checkTokenURLDateAndURLRate = [checkToken, checkURLDate, checkURLRate];

module.exports = checkTokenURLDateAndURLRate;