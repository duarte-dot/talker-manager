const express = require('express');

const checkToken = require('./middlewares/checkToken');
const checkEmailAndPassword = require('./middlewares/checkEmailAndPassword');
const checkNewTalker = require('./middlewares/checkNewTalker');
const checkUpdatedTalker = require('./middlewares/checkUpdateTalker');
const checkTokenAndRate = require('./middlewares/checkTokenAndRate');

const { 
  TALKERS_DATA_PATH,
  readFile, 
  writeFile, 
  updateTalker, 
  deleteTalker, 
  search, 
  checkRate2, 
  checkDate,
  getAllTalkersFromDB } = require('./fsUtils');

const app = express();

app.use(express.json());

app.get('/talker', async (req, res) => {
  const talkers = await readFile(TALKERS_DATA_PATH);
  return res.status(200).json(talkers);
});

app.get('/talker/db', async (req, res) => {
  try {
    const allTalkers = await getAllTalkersFromDB();
  return res.status(200).json(allTalkers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.get('/talker/search', checkToken, async (req, res) => {
    const { q, rate, date } = req.query;
    if (rate && !checkRate2(rate)) {
      return res.status(400).json({
        message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
      });
    }
    if (date && !checkDate(date)) {
      return res.status(400).json({
        message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"',
      });
    }
    const allTalkers = await readFile(TALKERS_DATA_PATH);
    const selectedTalkers = await search(q, rate, allTalkers, date);
    return res.status(200).json(selectedTalkers);
});

app.get('/talker/:id', async (req, res) => {
  try {
  const talkers = await readFile(TALKERS_DATA_PATH);

  const talkerFound = talkers.find(
    (talker) => talker.id === Number(req.params.id),
  );

  if (!talkerFound) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(200).json(talkerFound);
  } catch (err) {
    console.log(err);
  }
});

app.post('/login', checkEmailAndPassword,
 (req, res) => {
  let token = '';

  const tokenLength = 16;

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < tokenLength; i += 1) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }

  return res.status(200).json({ token });
});

app.post('/talker', checkNewTalker, async (req, res) => {
  const { name, age, talk } = req.body;
  const allTalkers = await readFile(TALKERS_DATA_PATH);
  const id = allTalkers.length + 1;

  const newTalkerObj = {
    id,
    name,
    age,
    talk,
  };
  const newTalkers = JSON.stringify([...allTalkers, newTalkerObj]);

  await writeFile(TALKERS_DATA_PATH, newTalkers);

  res.status(201).json(newTalkerObj);
});

app.put('/talker/:id', checkUpdatedTalker, async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const updatedTalker = await updateTalker(id, name, age, talk);
    console.log('body', req.body);
    return res.status(200).json(updatedTalker);
});

app.patch('/talker/rate/:id', checkTokenAndRate, async (req, res) => {
  const { id } = req.params;
  const newRating = req.body.rate;
  const allTalkers = await readFile(TALKERS_DATA_PATH);
  const filteredTalker = allTalkers.find((talker) => talker.id === Number(id));
  filteredTalker.talk.rate = Number(newRating);
  const string = JSON.stringify(allTalkers);
  await writeFile(TALKERS_DATA_PATH, string);
  return res.status(204).json();
});

app.delete('/talker/:id', checkToken, async (req, res) => {
  const { id } = req.params;
  const newData = await deleteTalker(id);
  return res.status(204).send(newData);
});

app.use((error, _req, res, _next) => res.status(error.status).json({ message: error.message }));

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});