const express = require('express');
const app = express();
const cors = require('cors');
const port = 8081;
app.use(express.json());
app.use(cors());
const knex = require('knex')(require('../knexfile.js')['development'])

app.get('/', (req, res) => {
    res.send('Application up and running.')
})

app.get('/users', (req, res) => {
    knex('user_table')
    .select('*')
    .then(user => {
        res.status(200).json(user);
    })
})

app.get('/items', (req, res) => {
    knex('item_table')
    .select('*')
    .then(item => {
        res.status(200).json(item);
    })
})

app.listen(port, () => {
    console.log('Successful server spooling, WAHOOOOOO')
})