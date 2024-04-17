export async function up(knex) {
  return await knex.schema.createTable("orders", (table) => {
    table.increments("id").primary();
    table.integer("dishes_id").references("id").inTable("dishes");
    table.integer("user_id");
  });
}

export async function down(knex) {
  return await knex.schema.dropTable("orders");
}
