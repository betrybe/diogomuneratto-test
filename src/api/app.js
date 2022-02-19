const express = require('express');

const app = express();


app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.use(require('./routes/login.router'));
app.use(require('./routes/user.router'));
app.use(require('./routes/recipes.router'));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
