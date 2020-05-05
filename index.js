const express = require('express');

const app = express();
const db = require('./models');
const routes = require('./routes');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Middleware för att haka på mongo models till varje request
app.use((req, res, next) => {
  req.models = db.models
  next()
})
app.use('/', routes);

const port = process.env.PORT || 3000;

db.connectDb().then(() => {
  const listener = app.listen(port, () => {
    console.info(`Example app listening on port ${listener.address().port}!`)
  })
});