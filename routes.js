const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');

// Get all users
route.get('/', homeController.index);

// Get all users
route.get('/user/:id', homeController.findOne);

// Register user
route.post('/register', homeController.register);

// Edit user
route.post('/edit/:id', homeController.edit);

// Delete user
route.get('/delete/:id', homeController.delete);

module.exports = route;