/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('FormSchema', function(table) {
        table.increments();
        table.string('name').unique().notNullable();
        table.json('schema').notNullable();
        table.json('uischema').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        // note below will need to be updated on each update unless we set up a trigger in knex/elsewhere
        // table.timestamp('updated_at').defaultTo(knex.fn.now())
    })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
     return knex.schema.dropTable('FormSchema');
};
