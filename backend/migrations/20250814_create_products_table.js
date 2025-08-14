exports.up = function(knex) {
  return knex.schema.createTable('products', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.text('description');
    table.decimal('price', 10, 2).notNullable();
    table.integer('stock').notNullable();
    table.string('image_url');
    table.integer('category_id').unsigned().references('id').inTable('categories').onDelete('SET NULL');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('products');
};
