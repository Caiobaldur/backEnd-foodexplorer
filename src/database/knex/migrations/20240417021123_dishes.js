export async function up(knex) {
  return await knex.schema.createTable("dishes", (table) => {
    table.increments("id").primary();
    table.string("name");
    table.string("description");
    table.string("image");
    table.float("price");
    table.string("category");
    table.string("ingredients");
  });
}

export async function down(knex) {
  return await knex.schema.dropTable("dishes");
}