
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'members-only',
  password: 'predatorsds',
  port: 5432,
});

module.exports = pool;