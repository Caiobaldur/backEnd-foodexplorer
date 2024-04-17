exports.up = (knex) =>
  knex.schema.createTable("favorites", (table) => {
    table.increments("id").primary();
    table
      .integer("dishes_id")
      .references("id")
      .inTable("dishes")
      .onDelete("CASCADE");
    table.integer("user_id");
  });

exports.down = (knex) => knex.schema.dropTable("favorites");
