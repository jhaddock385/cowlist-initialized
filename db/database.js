var mysql = require('mysql')
var util = require('util')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Gungie385',
  database: 'farm2'
})

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack)
    return
  }
  console.log('connected as id ' + connection.threadId)
})

const queryPromise = util.promisify(connection.query).bind(connection)

// queryPromise('SELECT 1 + 1 AS solution')
//   .then((result) => {
//     console.log('success?')
//     console.log(result)
//   })
//   .catch((err) => {
//     console.log('nope')
//     console.log(err)
//   })

const addCow = (name, description) => {
  return queryPromise(
    'INSERT INTO cows2 (`name`, `description`) VALUES (?, ?)',
    [name, description]
  )
}

const getPokemom = () => {
  return queryPromise('SELECT * FROM cows2')
}

const deletePokemon = (id) => {
  console.log('kill pokemon: ')
  console.log(id)
  return queryPromise('DELETE from `cows2` WHERE `id` = ?', [id])
}

// addCow('', '')
//   .then((result) => {
//     console.log('inserted into db')
//     console.log(result)
//   })
//   .catch((error) => {
//     console.log('db: error inserting cow')
//     console.log(error)
//   })

//queryPromise('INSERT INTO cows2 (`name`, `description`) VALUES (`?`,`?`)', [name, description])

module.exports.addCow = addCow
module.exports.getPokemom = getPokemom
module.exports.deletePokemon = deletePokemon
