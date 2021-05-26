const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes.js');


const app = express();
mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    app.emit('OK')
  })
  .catch(err => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(routes);

app.on('OK', () => {
  app.listen(3333, () => {
    console.log('Acessar http://localhost:3333');
  });
});