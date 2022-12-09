/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('item_table').del()
  await knex('item_table').insert([
    {id: 1, user_id: 1, item_name: "white hat", description: "a hat that is white", quantity: 1},
    {id: 2, user_id: 1, item_name: "black hat", description: "a hat that is black", quantity: 1},
    {id: 3, user_id: 1, item_name: "blue hat", description: "a hat that is blue", quantity: 1},
    {id: 4, user_id: 1, item_name: "red hat", description: "a hat that is red", quantity: 1},
    {id: 5, user_id: 1, item_name: "green hat", description: "a hat that is green", quantity: 1},
    {id: 6, user_id: 1, item_name: "purple hat", description: "a hat that is purple", quantity: 1},
    {id: 7, user_id: 1, item_name: "white shirt", description: "a shirt that is white", quantity: 1},
    {id: 8, user_id: 2, item_name: "black shirt", description: "a shirt that is black", quantity: 1},
    {id: 9, user_id: 2, item_name: "blue shirt", description: "a shirt that is blue", quantity: 1},
    {id: 10, user_id: 2, item_name: "white shoes", description: "shoes that are white", quantity: 1},
    {id: 11, user_id: 2, item_name: "black shoes", description: "shoes that are black", quantity: 1},
    {id: 12, user_id: 2, item_name: "blue shoes", description: "shoes that are blue", quantity: 1},
    {id: 13, user_id: 2, item_name: "white shoes", description: "shoes that are white", quantity: 1},
    {id: 14, user_id: 2, item_name: "black pants", description: "pants that are black", quantity: 1},
    {id: 15, user_id: 2, item_name: "blue pants", description: "pants that are blue", quantity: 1},
    {id: 16, user_id: 2, item_name: "long description item", description: "A long description is a way to provide long alternative text for non-text elements, such as images. Generally, alternative text exceeding 250 characters, which cannot be made more concise without making it less descriptive or meaningful, should have a long description. Examples of suitable use of long description are charts, graphs, maps, infographics, and other complex images.", quantity: 1},
    {id: 17, user_id: 2, item_name: "blue jacket", description: "a jacket that is blue", quantity: 1},
    {id: 18, user_id: 2, item_name: "white jacket", description: "a jacket that is white", quantity: 1},
    {id: 19, user_id: 2, item_name: "black jacket", description: "a jacket that is black", quantity: 1},
    {id: 20, user_id: 2, item_name: "blue jacket", description: "a jacket that is blue", quantity: 1},
  ]);
};

/* 
table.increments();
table.foreign('user_id').references('user_table.id')
table.string('item_name', 15);
table.string('description', 280);
table.integer('quantity');
*/