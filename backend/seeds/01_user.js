/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE user_table CASCADE')
  await knex('user_table').del()
  await knex('user_table').insert([
    {id: 1, first_name: 'Jeff', last_name: 'Huynh', username: 'jeffhuynh1', password: 'password'},
    {id: 2, first_name: 'Lorenzo', last_name: 'Ross', username: 'Lorenzoross1', password: 'rosslore'},
  ]);
};

/*      
table.increments();
table.string('first_name', 15);
table.string('last_name', 15);
table.string('username', 30);
table.string('password', 30); 
*/
