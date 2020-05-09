const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models');
const routes = require('./routes');
const morgan = require('morgan')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('combined'))

//Middleware for accessing mongo models on every request
app.use((req, res, next) => {
  req.models = db.models
  next()
})
app.use('/', routes);

const port = process.env.PORT || 4000;

db.connectDb().then(() => {
  const listener = app.listen(port, () => {
    console.info(`Example app listening on port ${listener.address().port}!`)
  })
});