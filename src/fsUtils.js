const fs = require('fs/promises');

const TALKERS_DATA_PATH = 'src/talker.json';

const readFile = async (path) => {
  const talker = await fs.readFile(path, 'utf-8');
  return JSON.parse(talker);
};

const writeFile = async (path, content) => {
  await fs.writeFile(path, content);
};

module.exports = { 
  TALKERS_DATA_PATH,
  readFile,
  writeFile,
};