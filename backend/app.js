require('dotenv').config();
const express = require('express');
const app = express();
const helmet = require('helmet');
const error = require('./middleware/error');

// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/auth', require('./routes/auth'));
app.use(error);

module.exports = app;
