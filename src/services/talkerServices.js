const talkerModels = require('../models/talkerModels');

const readTalkers = async () => {
  const talkers = await talkerModels.readTalkers();
  return talkers;
};

const findTalkerByID = async (id) => {
  const talker = await talkerModels.findTalkerByID(id);
  return talker;
};

const readFromURLSearch = async (q, rate, date) => {
  const selectedTalkers = await talkerModels.readFromURLSearch(q, rate, date);
  return selectedTalkers;
};

const readTalkersFromDB = async () => {
  const talkers = await talkerModels.readTalkersFromDB();
  return talkers;
};

const addNewTalker = async (name, age, talk) => {
  const talkers = await talkerModels.addNewTalker(name, age, talk);
  return talkers;
};

const updateTalker = async (id, name, age, talk) => {
  const talkers = await talkerModels.updateTalker(id, name, age, talk);
  return talkers;
};

const updateTalkersRatingByID = async (id, rate) => {
  await talkerModels.updateTalkersRatingByID(id, rate);
};

const excludeTalkerByID = async (id) => {
  const talker = await talkerModels.excludeTalkerByID(id);
  return talker;
};

module.exports = {
  readTalkers,
  findTalkerByID,
  readFromURLSearch,
  readTalkersFromDB,
  addNewTalker,
  updateTalker,
  updateTalkersRatingByID,
  excludeTalkerByID,
};