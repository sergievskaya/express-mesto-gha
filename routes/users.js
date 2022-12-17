const routerUsers = require('express').Router();
const {
  getUsers,
  createUser,
  getUserById,
  updateUserInfo,
  updateAvatar,
} = require('../controllers/users');

routerUsers.get('/users', getUsers);
routerUsers.get('/users/:userId', getUserById);
routerUsers.post('/users', createUser);
routerUsers.patch('/users/me', updateUserInfo);
routerUsers.patch('/users/me/avatar', updateAvatar);

module.exports = routerUsers;
