const fs = require('fs/promises');
const conn = require('./db/connection');

const TALKERS_DATA_PATH = 'src/talker.json';

const readFile = async (path) => {
  const talker = await fs.readFile(path, 'utf-8');
  return JSON.parse(talker);
};

const writeFile = async (path, content) => {
  await fs.writeFile(path, content);
};

const updateTalker = async (id, name, age, talk) => {
  const { watchedAt, rate } = talk;
  const talkers = await readFile(TALKERS_DATA_PATH);
  const updatedTalker = {
    ...talkers.find((t) => t.id === Number(id)),
    name,
    age,
    talk: { watchedAt, rate },
  };
  const updatedTalkers = talkers.map((t) => (t.id === updatedTalker.id ? updatedTalker : t));
  await fs.writeFile(TALKERS_DATA_PATH, JSON.stringify(updatedTalkers, 'utf-8'));
  return { id: +id, name, age, talk };
};

const deleteTalker = async (id) => {
  const data = await readFile(TALKERS_DATA_PATH);
  const findTalker = data.find((talker) => talker.id === Number(id));
  const newData = data.filter((talker) => talker !== findTalker);
  const updatedData = newData.map((talker) => ({ ...talker, id: talker.id - 1 }));
  await fs.writeFile(TALKERS_DATA_PATH, JSON.stringify(updatedData, 'utf-8'));
};

const checkRate2 = (rate) => {
  const rateNumbered = Number(rate);
  return Number.isInteger(rateNumbered) && rateNumbered >= 1 && rateNumbered <= 5;
};

const search = async (q, rate, data, date) => {
  let filteredData = data;
  if (q) {
    filteredData = filteredData.filter(({ name }) =>
      name.toLowerCase().includes(q.toLowerCase()));
  }
  if (rate) {
    filteredData = filteredData.filter(({ talk }) => {
      const rateNumber = Number(talk.rate);
      return rateNumber && rateNumber === Number(rate);
    });
  }
  if (date) {
    filteredData = filteredData.filter((talker) => talker.talk.watchedAt === date);
  }
  return filteredData;
};

const checkDate = (date) => {
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  return dateRegex.test(date);
};

const getAllTalkersFromDB = async () => {
  const [result] = await conn.execute('SELECT * FROM talkers');
  const resolved = result.map((talker) => {
    const { name, age, id } = talker;
    return {
      name,
      age,
      id,
      talk: {
        rate: talker.talk_rate,
        watchedAt: talker.talk_watched_at,
      },
    };
  });
  return resolved;
};

module.exports = { 
  TALKERS_DATA_PATH,
  readFile,
  writeFile,
  updateTalker,
  deleteTalker,
  checkRate2,
  search,
  checkDate,
  getAllTalkersFromDB, 
};