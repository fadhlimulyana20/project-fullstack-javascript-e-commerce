exports.up = function(knex) {
  return knex.schema.createTable('customers', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('wa_number').notNullable();
    table.text('address').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('customers');
};
