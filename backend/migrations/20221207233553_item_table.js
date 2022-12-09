/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('item_table', table => {
        table.increments();
        table.integer('user_id');
        table.foreign('user_id').references('user_table.id');
        table.string('item_name', 30);
        table.string('description', 500);
        table.integer('quantity');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('item_table', table => {
        table.dropForeign('user_id')
    })
    .then(function() {
        return knex.schema.dropTableIfExists('item_table')
    })
};
