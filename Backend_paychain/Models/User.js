

// const { pool } = require("../Configs/pg.js");

// async function createUser({ username, email, phone, password }) {
//   const result = await pool.query(
//     `INSERT INTO users (username, email, phone, password)
//      VALUES ($1, $2, $3, $4)
//      RETURNING id, username, email, phone`,
//     [username, email, phone, password]
//   );
//   return result.rows[0];
// }

// async function findUserByEmail(email) {
//   const result = await pool.query(
//     `SELECT * FROM users WHERE email = $1`,
//     [email]
//   );
//   return result.rows[0] || null;
// }

// async function findUserByPhone(phone) {
//   const result = await pool.query(
//     `SELECT * FROM users WHERE phone = $1`,
//     [phone]
//   );
//   return result.rows[0] || null;
// }

// async function findUserById(id) {
//   const result = await pool.query(
//     `SELECT id, username, email, phone, kyc_verified, created_at FROM users WHERE id = $1`,
//     [id]
//   );
//   return result.rows[0] || null;
// }

// async function storeRefreshToken(userId, token) {
//   await pool.query(
//     `UPDATE users SET refresh_token = $1 WHERE id = $2`,
//     [token, userId]
//   );
// }

// async function getUserByRefreshToken(token) {
//   const result = await pool.query(
//     `SELECT * FROM users WHERE refresh_token = $1`,
//     [token]
//   );
//   return result.rows[0] || null;
// }

// // Fixed: was missing comma between query string and params array
// async function markKycVerified(userId) {
//   const result = await pool.query(
//     `UPDATE users SET kyc_verified = true WHERE id = $1 RETURNING id, kyc_verified`,
//     [userId]
//   );
//   return result.rows[0];
// }

// module.exports = {
//   createUser,
//   findUserByEmail,
//   findUserByPhone,
//   findUserById,
//   storeRefreshToken,
//   getUserByRefreshToken,
//   markKycVerified,
// };


//////////////////////////////////////////

const { pool } = require("../Configs/pg.js");

async function createUser({ username, email, phone, password }) {
  const result = await pool.query(
    `INSERT INTO users (username, email, phone, password)
     VALUES ($1, $2, $3, $4)
     RETURNING id, username, email, phone`,
    [username, email, phone, password]
  );
  return result.rows[0];
}

async function findUserByEmail(email) {
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );
  return result.rows[0] || null;
}

async function findUserByPhone(phone) {
  const result = await pool.query(
    `SELECT * FROM users WHERE phone = $1`,
    [phone]
  );
  return result.rows[0] || null;
}

// SELECT * — works regardless of which optional columns exist yet.
// kyc_verified will be undefined if the migration hasn't run; callers
// must use  (user.kyc_verified ?? false)  not  user.kyc_verified || false
async function findUserById(id) {
  const result = await pool.query(
    `SELECT * FROM users WHERE id = $1`,
    [id]
  );
  return result.rows[0] || null;
}

async function storeRefreshToken(userId, token) {
  await pool.query(
    `UPDATE users SET refresh_token = $1 WHERE id = $2`,
    [token, userId]
  );
}

async function getUserByRefreshToken(token) {
  const result = await pool.query(
    `SELECT * FROM users WHERE refresh_token = $1`,
    [token]
  );
  return result.rows[0] || null;
}

async function markKycVerified(userId) {
  const result = await pool.query(
    `UPDATE users SET kyc_verified = true WHERE id = $1 RETURNING *`,
    [userId]
  );
  return result.rows[0];
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserByPhone,
  findUserById,
  storeRefreshToken,
  getUserByRefreshToken,
  markKycVerified,
};