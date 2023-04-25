const { readFile, TALKERS_DATA_PATH, writeFile } = require('../utils/fsUtils');
const conn = require('./db/connection');

const readTalkers = async () => {
  const talkers = await readFile(TALKERS_DATA_PATH);
  return talkers;
};

const findTalkerByID = async (id) => {
  const talkers = await readTalkers();

  const selectedTalker = talkers.find(
    (talker) => talker.id === Number(id),
  );
  
  return selectedTalker;
};

const readFromURLSearch = async (q, rate, date) => {
  let selectedTalkers = await readTalkers();
  if (q) {
    selectedTalkers = selectedTalkers.filter(({ name }) =>
      name.toLowerCase().includes(q.toLowerCase()));
  }
  if (rate) {
    selectedTalkers = selectedTalkers.filter(({ talk }) => {
      const rateNumber = Number(talk.rate);
      return rateNumber && rateNumber === Number(rate);
    });
  }
  if (date) {
    selectedTalkers = selectedTalkers.filter((talker) => talker.talk.watchedAt === date);
  }
  return selectedTalkers;
};

const readTalkersFromDB = async () => {
  const [result] = await conn.execute('SELECT * FROM talkers');
  const talkersFromDB = result.map((talker) => {
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
  return talkersFromDB;
};

const addNewTalker = async (name, age, talk) => {
  const talkers = await readTalkers();
  const id = talkers.length + 1;
  
  const talkersWithNewTalker = {
    id,
    name,
    age,
    talk,
  };

  const newTalkers = JSON.stringify([...talkers, talkersWithNewTalker]);
  await writeFile(TALKERS_DATA_PATH, newTalkers);

  return talkersWithNewTalker;
};

const updateTalker = async (id, name, age, talk) => {
  const talkers = await readTalkers();
  const { watchedAt, rate } = talk;

  const updatedTalker = {
    ...talkers.find((talker) => talker.id === Number(id)),
    name,
    age,
    talk: { watchedAt, rate },
  };

  const newTalkers = talkers.map(
    (talker) => (talker.id === updatedTalker.id ? updatedTalker : talker),
  );
  await writeFile(TALKERS_DATA_PATH, JSON.stringify(newTalkers));

  return { id: +id, name, age, talk: { watchedAt, rate } };
};

const updateTalkersRatingByID = async (id, rate) => {
  const talkers = await readTalkers();
  const selectedTalker = await findTalkerByID(id);
  selectedTalker.talk.rate = Number(rate);
  const newTalkers = [...talkers, selectedTalker];
  await writeFile(TALKERS_DATA_PATH, JSON.stringify(newTalkers));
};

const excludeTalkerByID = async (id) => {
  const talkers = await readTalkers();
  const selectedTalker = await findTalkerByID(id);
  const newTalkers = talkers.filter((talker) => talker !== selectedTalker);
  const updatedData = newTalkers.map((talker) => ({ ...talker, id: talker.id - 1 }));
  await writeFile(TALKERS_DATA_PATH, JSON.stringify(updatedData));
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