const app = require('./app');

// Listen
const PORT = process.env.PORT || 1337;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
