exports.up = function(knex) {
  return knex.schema.table('orders', function(table) {
    table.string('status').notNullable().defaultTo('Dipesan');
  });
};

exports.down = function(knex) {
  return knex.schema.table('orders', function(table) {
    table.dropColumn('status');
  });
};
