exports.up = (knex) =>
  knex.schema.createTable("dishes", (table) => {
    table.increments("id").primary();
    table.string("name");
    table.string("description");
    table.string("image");
    table.float("price");
    table.string("category");
    table.string("ingredients");
  });

exports.down = (knex) => knex.schema.dropTable("dishes");
