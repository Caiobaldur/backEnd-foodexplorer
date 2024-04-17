export async function up(knex) {
  return await knex.schema.createTable("dish_orders", (table) => {
    table.increments("id").primary();
    table.integer("dishes_id").references("id").inTable("dishes").onDelete('CASCADE');
    table.integer("order_id").references("id").inTable("orders").onDelete('CASCADE');
  });
}

export async function down(knex) {
  return await knex.schema.dropTable("dish_orders");
}
