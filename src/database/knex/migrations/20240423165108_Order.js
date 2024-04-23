exports.up = (knex) =>
  knex.schema.createTable("orders", (table) => {
    table.increments("id").primary();
    table.integer("user_id").references("id").inTable("Users");
    table.integer("dish_id").references("id").inTable("Dish");
    table.integer("amount");
    table.string("status");
    table.datetime("created_at").defaultTo(knex.fn.now());
    table.datetime("updated_at").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("orders");
