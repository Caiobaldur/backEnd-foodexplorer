export async function up(knex) {
  return await knex.schema.createTable("orders", (table) => {
    table.increments("id").primary();
    table.integer("users_id").references("id").inTable("users");
    table.float("full_price");
    table.string("payout");
    table.integer("status");
  });
}

export async function down(knex) {
  return await knex.schema.dropTable("orders");
}
