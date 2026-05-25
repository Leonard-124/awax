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

async function findUserById(id) {
  const result = await pool.query(
    `SELECT id, username, email, phone, created_at FROM users WHERE id = $1`,
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

async function verifykyc () {
  const result = await pool.query(
    `INSERT into documents ( BusinessCertificate, PinCertificate, NationalId, PassportCertificate, BankAccountStatement, BusinessPremisePhotograph)
    VALUES ( $1, $2, $3, $4, $5, $6)`
    [BusinessCertificate, PinCertificate, NationalId, PassportCertificate,  BankAccountStatement, BusinessPremisePhotograph]
  )
  return result.rows[0]
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserByPhone,
  findUserById,
  storeRefreshToken,
  getUserByRefreshToken,
  verifykyc
};
