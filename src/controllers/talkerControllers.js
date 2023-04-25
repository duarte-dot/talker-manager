const talkerServices = require('../services/talkerServices');

const getAllTalkers = async (_req, res) => {
  const talkers = await talkerServices.readTalkers();
  return res.status(200).json(talkers);
};

const getTalkerByID = async (req, res) => {
  const { id } = req.params;
  const talker = await talkerServices.findTalkerByID(id);
  return res.status(200).json(talker);
};

const getTalkersFromURLSearch = async (req, res) => {
  const { q, rate, date } = req.query;
  const selectedTalkers = await talkerServices.readFromURLSearch(q, rate, date);
  return res.status(200).json(selectedTalkers);
};

const getAllTalkersFromDB = async (_req, res) => {
  const talkers = await talkerServices.readTalkersFromDB();
  return res.status(200).json(talkers);
};

const addNewTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await talkerServices.addNewTalker(name, age, talk);
  return res.status(201).json(talkers);
};

const updateTalker = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const updatedTalker = await talkerServices.updateTalker(id, name, age, talk);
  return res.status(200).json(updatedTalker);
};

const updateTalkersRatingByID = async (req, res) => {
  const { id } = req.params;
  const { rate } = req.body;
  await talkerServices.updateTalkersRatingByID(id, rate);
  return res.status(204).json();
};

const excludeTalkerByID = async (req, res) => {
  const { id } = req.params;
  await talkerServices.excludeTalkerByID(id);
  return res.status(204).json({});
};

module.exports = {
  getAllTalkers,
  getTalkerByID,
  getTalkersFromURLSearch,
  getAllTalkersFromDB,
  addNewTalker,
  updateTalker,
  updateTalkersRatingByID,
  excludeTalkerByID,
};