const checkEmail = require('./checkEmail');
const checkPassword = require('./checkPassword');

const checkEmailAndPassword = [checkEmail, checkPassword];

module.exports = checkEmailAndPassword;