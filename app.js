const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const errorHandler = require('./middlewares/error-handler');
const NotFoundError = require('./errors/not-found-error');
require('dotenv').config();

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1/mestodb');

// удалить код ниже
app.use((req, res, next) => {
  req.user = {
    _id: '63c93ad90bc510fee9b481f6',
  };

  next();
});

app.use(routerUsers);
app.use(routerCards);

app.use('*', () => {
  throw new NotFoundError('Ресурс не найден. Проверьте URL и метод запроса');
});

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listen port ${PORT}`);
});
