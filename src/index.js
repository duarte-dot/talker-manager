const express = require('express');
const readFile = require('./fsUtils');

const app = express();

app.use(express.json());

app.get('/talker', async (req, res) => {
  const talkers = await readFile();
  return res.status(200).json(talkers);
})

app.get('/talker/:id', async (req, res) => {
  try{
  const talkers = await readFile();

  const talkerFound = talkers.find(
    (talker) => talker.id === Number(req.params.id),
  );

  if (!talkerFound) {
    return res.status(404).json({ message: "Pessoa palestrante não encontrada"})
  }

  return res.status(200).json(talkerFound);

  } catch (err) {
    console.log(err)
  }
})

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/

  if (!email) {
    return res.status(400).json({message: "O campo \"email\" é obrigatório"})
  }

  if (!regexEmail.test(email)) {
    return res.status(400).json({message: "O \"email\" deve ter o formato \"email@email.com\""})
  }

  if (!password) {
    return res.status(400).json({message: "O campo \"password\" é obrigatório"})
  }

  if (password.length <= 6) {
    return res.status(400).json({message: "O \"password\" deve ter pelo menos 6 caracteres"})
  }

  let token = '';

  const tokenLength = 16;

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < tokenLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }

  return res.status(200).json({ token });
});


const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});