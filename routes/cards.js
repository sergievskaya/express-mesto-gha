const routerCards = require('express').Router();
const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

routerCards.get('/cards', getCards);
routerCards.post('/cards', createCard);
routerCards.delete('/cards/:cardId', deleteCardById);
routerCards.put('/cards/:cardId/likes', likeCard);
routerCards.delete('/cards/:cardId/likes', dislikeCard);

module.exports = routerCards;
