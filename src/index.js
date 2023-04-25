const express = require('express');

const talkerRoute = require('./routes/talkerRoute');
const loginRoute = require('./routes/loginRoute');

const app = express();
app.use(express.json());

app.use('/talker', talkerRoute);
app.use('/login', loginRoute);
app.use((error, _req, res, _next) => res.status(error.status).json({ message: error.message }));

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});