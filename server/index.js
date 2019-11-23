const http = require('http')
var express = require('express')
var app = express()
const bodyParser = require('body-parser')

const { addCow, getPokemom, deletePokemon } = require('../db/database.js')

const hostname = 'localhost'
const port = 3000

app.use('/', express.static('./client/dist'))

app.use(bodyParser.json())

app.get('/pokemon', function(req, res) {
  console.log('server: .get /cows')
  getPokemom()
    .then((pokemon) => {
      res.status(200).send(pokemon)
    })
    .catch((err) => {
      console.log('server: getPokemon error')
      console.log(err)
    })
})

// POST method route
app.post('/pokemon', function(req, res) {
  console.log('server: .post /cows')
  console.log(req.body)
  res.status(200).send()

  addCow(req.body.name, req.body.description)
    .then((result) => {
      console.log('server: pokemon save success')
      //console.log(result)
    })
    .catch((err) => {
      console.log(err)
    })
})

//destroy a pokemon
app.post('/gluefactory', function(req, res) {
  console.log('server: .post /gluefactory')
  console.log(req.body)
  res.status(200).send()

  deletePokemon(req.body.id)
    .then((result) => {
      console.log('server: pokemon destroy success')
      console.log(result)
    })
    .catch((err) => {
      console.log(err)
    })
})

app.listen(port, hostname, () => {
  console.log(`Server listening on http://${hostname}:${port}/`)
})

// GET method route
