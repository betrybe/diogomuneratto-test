const express = require('express');

const app = express();

const routerUser = require('./routes/user.router');

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.use(routerUser);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
