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

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});