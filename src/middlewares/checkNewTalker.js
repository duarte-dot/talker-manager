const checkToken = require('./checkToken');
const checkName = require('./checkName');
const checkAge = require('./checkAge');
const checkTalk = require('./checkTalk');
const checkTalkWatchedAt = require('./checkTalkWatchedAt');
const checkTalkRate = require('./checkTalkRate');

const checkNewTalker = [
  checkToken, 
  checkName, 
  checkAge, 
  checkTalk, 
  checkTalkRate, 
  checkTalkWatchedAt,
];

module.exports = checkNewTalker;