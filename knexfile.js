module.exports = {
  client: 'pg',
  // TODO: stash this in an env file?
  connection: process.env.DATABASE_URL || {
    host: 'db',
    port: 5432,
    user: 'postgres',
    password: '',
    database: 'test',
  },
  seeds: {
    directory: './knex/seeds',
  }
}
