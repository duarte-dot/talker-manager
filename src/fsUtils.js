const fs = require('fs/promises');

const TALKERS_DATA_PATH = 'src/talker.json';

const readFile = async () => {
  const talker = await fs.readFile(TALKERS_DATA_PATH, 'utf-8');
  return JSON.parse(talker);
};

const writeFile = async (newTalker) => {
  const { name, age, talk } = newTalker;
  const talkers = await fs.readFile(TALKERS_DATA_PATH);
  const talkersJSON = JSON.parse(talkers);
  const id = talkersJSON.length + 1;
  const newTalkerObj = {
    id,
    name,
    age,
    talk,
  };
  const newTalkers = JSON.stringify([...talkersJSON, newTalkerObj]);
  await fs.writeFile(TALKERS_DATA_PATH, newTalkers);
  return newTalkerObj;
};

const updateTalker = async (id, name, age, talk) => {
  const { watchedAt, rate } = talk;
  const talkers = await readFile();
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
  const data = await readFile();
  const findTalker = data.find((talker) => talker.id === Number(id));
  const newData = data.filter((talker) => talker !== findTalker);
  const updatedData = newData.map((talker) => ({ ...talker, id: talker.id - 1 }));
  await fs.writeFile(TALKERS_DATA_PATH, JSON.stringify(updatedData, 'utf-8'));
};

module.exports = { readFile, writeFile, updateTalker, deleteTalker };