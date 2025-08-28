exports.up = function(knex) {
  return knex.schema.createTable('orders', function(table) {
    table.increments('id').primary();
    table.integer('customer_id').unsigned().references('id').inTable('customers').onDelete('CASCADE');
    table.json('cart_items').notNullable();
    table.decimal('total', 12, 2).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('orders');
};
