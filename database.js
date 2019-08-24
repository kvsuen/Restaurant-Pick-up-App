// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const pool = new Pool(dbParams);
pool.connect();

const getUserWithEmail = name => {
  return pool
    .query(
      `
      SELECT name
      FROM users
      WHERE name = $1;
      `,
      [name]
    )
    .then(q => q.rows[0])
    .catch(err => null);
};
exports.getUserWithEmail = getUserWithEmail;
