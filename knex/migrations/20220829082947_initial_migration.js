exports.up = function(knex, Promise) {
    // create any other tables you want to start a new app
    return knex.schema.createTable('users', function(table) {
        table.increments();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        // note below will need to be updated on each update unless we set up a trigger in knex/elsewhere
        // table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
}