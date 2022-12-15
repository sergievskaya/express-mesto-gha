const routerUsers = require('express').Router();
const { getUsers, createUser, getUserById } = require('../controllers/users');

routerUsers.get('/users', getUsers);
routerUsers.get('/users/:userId', getUserById);
routerUsers.post('/users', createUser);

module.exports = routerUsers;
