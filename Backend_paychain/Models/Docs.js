const { pool } = require("../Configs/pg.js");

// Get all docs
async function getAllDocs() {
  const result = await pool.query(
    "SELECT * FROM documents ORDER BY created_at DESC"
  );
  return result.rows;
}

// Get doc by ID
async function getDocById(id) {
  const result = await pool.query(
    "SELECT * FROM documents WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

// Create doc
async function createDoc({
  BusinessCertificate,
  PinCertificate,
  NationalId,
  PassportCertificate,
  BankAccountStatement,
  BusinessPremisePhotograph,
  imageUrl,
  publicId
}) {
  const result = await pool.query(
    `INSERT INTO documents (
      BusinessCertificate, PinCertificate, NationalId, PassportCertificate,
      BankAccountStatement, BusinessPremisePhotograph, image_url, public_id
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`,
    [
      BusinessCertificate,
      PinCertificate,
      NationalId,
      PassportCertificate,
      BankAccountStatement,
      BusinessPremisePhotograph,
      imageUrl,
      publicId
    ]
  );
  return result.rows[0];
}

// Update doc
async function updateDoc(id, updates) {
  const {
    BusinessCertificate,
    PinCertificate,
    NationalId,
    PassportCertificate,
    BankAccountStatement,
    BusinessPremisePhotograph,
    imageUrl,
    publicId
  } = updates;

  const result = await pool.query(
    `UPDATE documents
     SET BusinessCertificate=$1, PinCertificate=$2, NationalId=$3,
         PassportCertificate=$4, BankAccountStatement=$5,
         BusinessPremisePhotograph=$6, image_url=$7, public_id=$8
     WHERE id = $9
     RETURNING *`,
    [
      BusinessCertificate,
      PinCertificate,
      NationalId,
      PassportCertificate,
      BankAccountStatement,
      BusinessPremisePhotograph,
      imageUrl,
      publicId,
      id
    ]
  );
  return result.rows[0];
}

// Delete doc
async function deleteDoc(id) {
  await pool.query("DELETE FROM documents WHERE id = $1", [id]);
}

module.exports = {
  getAllDocs,
  getDocById,
  createDoc,
  updateDoc,
  deleteDoc
};



// CREATE TABLE documents (
//   BusinessCertificate VARCHAR(200) NOT NULL,
//   PinCertificate TEXT NOT NULL,
//   NationalId VARCHAR(200) NOT NULL,
//   PassportCertificate VARCHAR(200) NOT NULL,
//   BankAccountStatement TEXT NOT NULL,
//   image_url TEXT,
//   public_id TEXT
// );