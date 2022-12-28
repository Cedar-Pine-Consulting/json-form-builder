const argon2 = require('argon2');

const pwdRaw = process.env.SEED_PWD || 'testing1234';
const hashPwd = (password) => argon2.hash(password);

exports.seed = async function(knex) {
  // Deletes ALL existing entries if needed
  // TODO: how to delete user table only if it exists?
  await knex.schema.dropTableIfExists('users');
  await knex.schema.createTable('users', function (table) {
    table.increments();
    table.string('email');
    table.string('password');
  })

  // insert seed entries
  await knex('users').insert([
    {email: 'mark@cedarpineconsulting.com', password: await hashPwd(pwdRaw)},
    {email: 'lucio@cedarpineconsulting.com', password: await hashPwd(pwdRaw)},
    {email: 'alex@cedarpineconsulting.com', password: await hashPwd(pwdRaw)}
  ]);
};
