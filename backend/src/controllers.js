const knex = require("./dbConnection")

function createUser(first_name, last_name, username, hashedPass) {
    console.log("function-passed", first_name, last_name, username, hashedPass)
    return knex("user_table")
    .insert( {first_name, last_name, username, hashedPass})
    .then((data) => data);
}

function getPasswordHash(username) {
    return knex("user_table")
    .where({ username })
    .select(`hashedPass`)
    .then((data) => data[0].hashedPass)
}

module.exports = { createUser, getPasswordHash}