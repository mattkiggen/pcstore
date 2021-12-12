require('dotenv').config();
const express = require('express');
const app = express();
const helmet = require('helmet');

// Middleware
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/users'));

// Listen
const PORT = process.env.PORT || 1337;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
