const express = require('express');
const readFile = require('./fsUtils');

const app = express();
app.use(express.json());

app.get('/talker', async (req, res) => {
  const talker = await readFile();
  return res.status(200).json(talker);
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