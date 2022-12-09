/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('user_table', table => {
        table.increments();
        table.string('first_name', 15);
        table.string('last_name', 15);
        table.string('username', 30);
        table.string('hashedPass', 100);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_table')
};
