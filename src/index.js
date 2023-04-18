const express = require('express');
const { readFile, writeFile } = require('./fsUtils');
const { checkToken, 
  checkAge,
  checkName,
  checkRate,
  checkTalk,
  checkWatchedAt, 
  checkEmail,
  checkPassword } = require('./middlewares');

const app = express();

app.use(express.json());

app.get('/talker', async (req, res) => {
  const talkers = await readFile();
  return res.status(200).json(talkers);
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
  console.log(newTalkerObj);
  return res.status(201).json(newTalkerObj);
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