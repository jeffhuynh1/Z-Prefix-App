/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE user_table CASCADE')
  await knex('user_table').del()
  await knex('user_table').insert([
    {id: 9998, first_name: 'Jeff', last_name: 'Huynh', username: 'test1', hashedPass: 'test'},
    {id: 9999, first_name: 'Lorenzo', last_name: 'Ross', username: 'test2', hashedPass: 'test'},
  ]);
};

/*      
table.increments();
table.string('first_name', 15);
table.string('last_name', 15);
table.string('username', 30);
table.string('password', 30); 
*/
