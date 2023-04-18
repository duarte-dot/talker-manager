const fs = require('fs/promises');

const readFile = async () => {
  const talker = await fs.readFile('src/talker.json', 'utf-8');
  return JSON.parse(talker)
}

module.exports = readFile;