const User = require('../models/user');
const {
  STATUS_CREATED,
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_INTERNAL_SERVER_ERROR,
} = require('../utils/constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => res.status(STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Ошибка на сервере' }));
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new Error('not found');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(STATUS_BAD_REQUEST).send({ message: 'Не валидный id пользователя' });
      } else if (err.message === 'not found') {
        res.status(STATUS_NOT_FOUND).send({ message: 'Пользователь с указанным id не найден' });
      } else {
        res.status(STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Ошибка на сервере' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.status(STATUS_CREATED).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS_BAD_REQUEST).send({ message: 'Ошибка валидации полей' });
      } else {
        res.status(STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Ошибка на сервере' });
      }
    });
};

module.exports.updateUserInfo = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new Error('not found');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS_BAD_REQUEST).send({ message: 'Ошибка валидации полей' });
      } else if (err.name === 'CastError') {
        res.status(STATUS_BAD_REQUEST).send({ message: 'Не валидный id пользователя' });
      } else if (err.message === 'not found') {
        res.status(STATUS_NOT_FOUND).send({ message: 'Пользователь с указанным id не найден' });
      } else {
        res.status(STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Ошибка на сервере' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new Error('not found');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS_BAD_REQUEST).send({ message: 'Ошибка валидации полей' });
      } else if (err.name === 'CastError') {
        res.status(STATUS_BAD_REQUEST).send({ message: 'Не валидный id пользователя' });
      } else if (err.message === 'not found') {
        res.status(STATUS_NOT_FOUND).send({ message: 'Пользователь с указанным id не найден' });
      } else {
        res.status(STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Ошибка на сервере' });
      }
    });
};
