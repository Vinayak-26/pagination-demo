const { response } = require('express')
const express = require('express')
const app = express()
const cors = require('cors')
const port = 3001

const pagination_model = require('./pagination_model');
app.use(express.json())
app.use(cors())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
  });

  app.post('/register', (req, res) => {
    pagination_model.createUser(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
    
  })
  app.post('/login', (req, res) => {
    pagination_model.loginUser(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
    
  })

  // for getting books info
  app.get('/books', (req, res) => {
    const {page, perPage} = req.query
    pagination_model.getBookList(page, perPage)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })


