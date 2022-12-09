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

//------------------LOGIN FUNCTIONS------------------
const { hash, compare } = bcrypt;
const { createUser, getPasswordHash } = require("./controllers")

app.get('/', (req, res) => {
    res.send('Application up and running.')
})

app.post('/signup', (req, res) => {
    let { body } = req;
    let { first_name, last_name, username, password } = body;
    console.log("body",body)
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
    console.log("body",body)
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

//------------------Accessing data------------------
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
    console.log(`Successful server spooling on port ${port}, WAHOOOOOO`)
})