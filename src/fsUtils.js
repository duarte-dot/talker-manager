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
  console.log('aqui oooo ', newTalkerObj);
  return newTalkerObj;
};

module.exports = { readFile, writeFile };