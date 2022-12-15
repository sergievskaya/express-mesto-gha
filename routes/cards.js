const routerCards = require('express').Router();
const { getCards, createCard, deleteCardById } = require('../controllers/cards');

routerCards.get('/cards', getCards);
routerCards.post('/cards', createCard);
routerCards.delete('/cards/:cardId', deleteCardById);

module.exports = routerCards;
