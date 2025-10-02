const express = require('express')
const mysql = require('mysql')

const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const connection = mysql.createConnection(config)
connection.query("INSERT INTO people(nome) VALUES('Matheus'), ('João'), ('Wesley')", (err) => {
  if (err) console.error('Erro ao inserir:', err)
  connection.end()
})

app.get('/', (req, res) => {
 const connection = mysql.createConnection(config)

  connection.query('SELECT nome FROM people', (err, results) => {
    if (err) {
      connection.end()
      return res.status(500).send('Erro ao buscar nomes')
    }

    const nomes = results.map(r => r.nome).join('<br>')
    res.send(`<h1>Full Cycle Rocks!</h1><br>${nomes}`)
    connection.end()
  })
})

app.listen(port, () => {
  console.log('Rodando na porta ' + port)
})
