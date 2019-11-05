const up = knex => {
  return knex.schema
    .createTable('player', table => {
      table.increments('id').primary();
      table
        .string('username', 50)
        .notNullable()
        .unique();
      table
        .string('email', 50)
        .notNullable()
        .unique();
      table.string('password', 255).notNullable();
      table.string('fullname', 50);
    })
    .createTable('game', table => {
      table.increments('id').primary();
      table
        .string('name', 50)
        .notNullable()
        .unique();
    })
    .createTable('team', table => {
      table.increments('id').primary();
      table
        .string('name', 50)
        .notNullable()
        .unique();
      table
        .integer('captainId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('player');
      table
        .integer('gameId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('game');
      table
        .boolean('recruiting')
        .notNullable()
        .defaultTo(false);
    })
    .createTable('teamRoster', table => {
      table.increments('id').primary();
      table
        .integer('playerId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('player');
      table
        .integer('teamId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('team');
    });
};

const down = knex => {
  return knex.schema.dropTable('teamRoster');
  return knex.schema.dropTable('team');
  return knex.schema.dropTable('game');
  return knex.schema.dropTable('player');
};

module.exports = { up, down };
