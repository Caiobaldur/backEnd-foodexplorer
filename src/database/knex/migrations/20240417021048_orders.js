exports.up = (knex) =>
  knex.schema.createTable("orders", (table) => {
    table.increments("id").primary();
    table.integer("users_id").references("id").inTable("users");
    table.float("full_price");
    table.string("payout");
    table.integer("status");
  });

exports.down = (knex) => knex.schema.dropTable("orders");
