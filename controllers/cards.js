const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(() => res.status(500).send({ message: 'Ошибка на сервере' }));
};

module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Ошибка валидации полей', ...err });
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
    });
};

module.exports.deleteCardById = (req, res) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new Error('not found');
      } else if (card.owner.toString() !== req.user._id) {
        throw new Error('forbidden');
      } else {
        card.remove();
        res.status(200).send({ message: 'Карточка удалена' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Не валидный id', ...err });
      } else if (err.message === 'not found') {
        res.status(404).send({ message: 'Карточка с указанным id не найдена' });
      } else if (err.message === 'forbidden') {
        res.status(403).send({ message: 'Можно удалять только собственные посты' });
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
    });
};
