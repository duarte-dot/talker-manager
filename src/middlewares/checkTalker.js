const { readFile, TALKERS_DATA_PATH } = require('../utils/fsUtils');

const checkTalker = async (req, res, next) => {
  const talkers = await readFile(TALKERS_DATA_PATH);
  const talker = talkers.find((t) => t.id === Number(req.params.id));
  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return next();
};

module.exports = checkTalker;