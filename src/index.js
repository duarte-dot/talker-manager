const express = require('express');
const { readFile, 
  writeFile, 
  updateTalker, 
  deleteTalker, 
  search, 
  checkRate2 } = require('./fsUtils');
const { checkToken, 
  checkAge,
  checkName,
  checkRate,
  checkTalk,
  checkWatchedAt, 
  checkEmail,
  checkPassword, 
  checkTalkerExistence,
 } = require('./middlewares');

const app = express();

app.use(express.json());

app.get('/talker', async (req, res) => {
  const talkers = await readFile();
  return res.status(200).json(talkers);
});

app.get('/talker/search', checkToken, async (req, res) => {
    const { q, rate } = req.query;

    if (rate && !checkRate2(rate)) {
      return res.status(400).json({
        message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
      });
    }

    try {
    const allTalkers = await readFile();
    const selectedTalkers = await search(q, rate, allTalkers);
    return res.status(200).json(selectedTalkers);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

app.get('/talker/:id', async (req, res) => {
  try {
  const talkers = await readFile();

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

app.post('/login', checkEmail, checkPassword,
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

app.post('/talker',
  checkToken, checkName, checkAge, 
  checkTalk, checkWatchedAt, checkRate, 
async (req, res) => {
  const newTalkerObj = await writeFile(req.body);
  return res.status(201).json(newTalkerObj);
});

app.put('/talker/:id',
  checkToken, checkName, checkAge, 
  checkTalk, checkWatchedAt, checkRate, 
  checkTalkerExistence,
async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const updatedTalker = await updateTalker(id, name, age, talk);
    console.log('body', req.body);
    return res.status(200).json(updatedTalker);
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