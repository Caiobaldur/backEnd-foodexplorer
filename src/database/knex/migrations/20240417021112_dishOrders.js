exports.up = (knex) =>
  knex.schema.createTable("dish_orders", (table) => {
    table.increments("id").primary();
    table
      .integer("dishes_id")
      .references("id")
      .inTable("dishes")
      .onDelete("CASCADE");
    table
      .integer("order_id")
      .references("id")
      .inTable("orders")
      .onDelete("CASCADE");
  });

exports.down = (knex) => knex.schema.dropTable("dish_orders");
