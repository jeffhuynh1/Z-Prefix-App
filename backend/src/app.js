const express = require('express');
const app = express();
const cors = require('cors');
const port = 8081;
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const knex = require("./dbConnection")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

//-------------------------LOGIN FUNCTIONS-------------------------
const { hash, compare } = bcrypt;
const { createUser, getPasswordHash } = require("./controllers");
const { request } = require('http');

app.get('/', (req, res) => {
    res.send('Application up and running.')
})

app.post('/signup', (req, res) => {
    let { body } = req;
    let { first_name, last_name, username, password } = body;
    console.log("body", body)
    hash(password, 10)
        .then((hashedPass) => {
            console.log("unencrypted-password", password);
            console.log("encrypted-password", hashedPass);

            createUser(first_name, last_name, username, hashedPass)
                .then((data) => res.status(201).json("USER CREATED"))
                .catch((err) => res.status(500).json(err));
        })
        .catch((err) => res.status(500).json(err));
})

app.post('/login', (req, res) => {
    let { body } = req;
    let { username, password } = body;
    console.log("body", body)
    getPasswordHash(username)
        .then((hashedPass) => {
            console.log("unencrypted-password", password);
            console.log("encrypted-password", hashedPass);

            compare(password, hashedPass)
                .then((isMatch) => {
                    if (isMatch) res.status(202).json("PASSWORDS MATCH");
                    else res.status(401).json("NO MATCH");
                })
                .catch((err) => res.status(500).json(err));
        })
        .catch((err) => res.status(500).json("Unrecognized Username"));
})

//-------------------------Accessing data-------------------------
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

//-------------------------Modifying data-------------------------
app.post('/items', async (req, res) => {
    const maxIdQuery = await knex('item_table').max('id as maxId').first();
    let num = maxIdQuery.maxId + 1;
    knex('item_table')
        .insert({
            id: num,
            user_id: req.body.user_id,
            item_name: req.body.item_name,
            description: req.body.description,
            quantity: req.body.quantity,
        })
        .then(res.status(201).send("add complete"))
})

app.patch('/items/:id', (req, res) => {
    let { id } = req.params;
    knex('item_table')
        .where('id', id)
        .update({
            item_name: req.body.item_name,
            description: req.body.description,
            quantity: req.body.quantity,
        })
        .then(item => {
            item === 0 ? res.status(204).send(`Item ${id} doesn't exist`)
                : res.status(200).send(`Item ${id} is updated`)
        })
})

app.delete('/items/:id', (req, res) => {
    let { id } = req.params;
    console.log("test", req.body.id)
    knex('item_table')
        .where('id', id)
        .del()
        .then(item => {
            item === 0 ? res.status(204).send(`Item ${id} doesn't exist`)
                : res.status(200).send(`Item ${id} deleted`)
        })
})

app.get('*', function (req, res) {
    res.status(404).send(`404: You tried navigating to a path that doesn't exist...`);
});

app.post('*', function (req, res) {
    res.status(404).send(`404: You tried posting to a path that doesn't exist...`);
});

app.patch('*', function (req, res) {
    res.status(404).send(`404: You tried patching in a path that doesn't exist...`);
});

app.delete('*', function (req, res) {
    res.status(404).send(`404: You tried deleting in a path that doesn't exist...`);
});

app.listen(port, () => {
    console.log(`Successful server spooling on port ${port}, WAHOOOOOO`)
})