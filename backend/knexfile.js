// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */


/*
const HOST = process.env.DATA_HOST || '127.0.0.1';
const USER = PROCESS.env.POSTGRES_USER' || 'postgres';
const PASSWORD
const DATABASE
const PORT
*/
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      password: 'docker',
      user: 'postgres',
      port: 5432,
      database: "postgres"
    }
  }
  /*
  production: {
    client:
    connection:
    
  }
   */
}