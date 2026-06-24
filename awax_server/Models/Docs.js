// const { pool } = require("../Configs/pg.js");

// // Get all docs
// async function getAllDocs() {
//   const result = await pool.query(
//     "SELECT * FROM documents ORDER BY created_at DESC"
//   );
//   return result.rows;
// }

// // Get doc by ID
// async function getDocById(id) {
//   const result = await pool.query(
//     "SELECT * FROM documents WHERE id = $1",
//     [id]
//   );
//   return result.rows[0];
// }

// // Create doc
// async function createDoc({
//   BusinessCertificate,
//   PinCertificate,
//   NationalId,
//   PassportCertificate,
//   BankAccountStatement,
//   BusinessPremisePhotograph,
//   imageUrl,
//   publicId
// }) {
//   const result = await pool.query(
//     `INSERT INTO documents (
//       BusinessCertificate, PinCertificate, NationalId, PassportCertificate,
//       BankAccountStatement, BusinessPremisePhotograph, image_url, public_id
//     )
//     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
//     RETURNING *`,
//     [
//       BusinessCertificate,
//       PinCertificate,
//       NationalId,
//       PassportCertificate,
//       BankAccountStatement,
//       BusinessPremisePhotograph,
//       imageUrl,
//       publicId
//     ]
//   );
//   return result.rows[0];
// }

// // Update doc
// async function updateDoc(id, updates) {
//   const {
//     BusinessCertificate,
//     PinCertificate,
//     NationalId,
//     PassportCertificate,
//     BankAccountStatement,
//     BusinessPremisePhotograph,
//     imageUrl,
//     publicId
//   } = updates;

//   const result = await pool.query(
//     `UPDATE documents
//      SET BusinessCertificate=$1, PinCertificate=$2, NationalId=$3,
//          PassportCertificate=$4, BankAccountStatement=$5,
//          BusinessPremisePhotograph=$6, image_url=$7, public_id=$8
//      WHERE id = $9
//      RETURNING *`,
//     [
//       BusinessCertificate,
//       PinCertificate,
//       NationalId,
//       PassportCertificate,
//       BankAccountStatement,
//       BusinessPremisePhotograph,
//       imageUrl,
//       publicId,
//       id
//     ]
//   );
//   return result.rows[0];
// }

// // Delete doc
// async function deleteDoc(id) {
//   await pool.query("DELETE FROM documents WHERE id = $1", [id]);
// }

// module.exports = {
//   getAllDocs,
//   getDocById,
//   createDoc,
//   updateDoc,
//   deleteDoc
// };



// CREATE TABLE documents (
//   BusinessCertificate VARCHAR(200) NOT NULL,
//   PinCertificate TEXT NOT NULL,
//   NationalId VARCHAR(200) NOT NULL,
//   PassportCertificate VARCHAR(200) NOT NULL,
//   BankAccountStatement TEXT NOT NULL,
//   image_url TEXT,
//   public_id TEXT
// );  

////////////////////////////////////

const { pool } = require("../Configs/pg.js");

async function getAllDocs() {
  const result = await pool.query(
    "SELECT * FROM documents ORDER BY created_at DESC"
  );
  return result.rows;
}

async function getDocById(id) {
  const result = await pool.query(
    "SELECT * FROM documents WHERE id = $1",
    [id]
  );
  return result.rows[0] || null;
}

// Added user_id so each doc is tied to the authenticated user
async function createDoc({
  userId,
  BusinessCertificate,
  PinCertificate,
  NationalId,
  PassportCertificate,
  BankAccountStatement,
  BusinessPremisePhotograph,
  imageUrl,
  publicId,
}) {
  const result = await pool.query(
    `INSERT INTO documents (
      user_id,
      businesscertificate, pincertificate, nationalid, passportcertificate,
      bankaccountstatement, businesspremisephotograph, image_url, public_id
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *`,
    [
      userId,
      BusinessCertificate,
      PinCertificate,
      NationalId,
      PassportCertificate,
      BankAccountStatement,
      BusinessPremisePhotograph,
      imageUrl || null,
      publicId || null,
    ]
  );
  return result.rows[0];
}

async function getDocByUserId(userId) {
  const result = await pool.query(
    "SELECT * FROM documents WHERE user_id = $1 LIMIT 1",
    [userId]
  );
  return result.rows[0] || null;
}

async function updateDoc(id, updates) {
  const {
    BusinessCertificate,
    PinCertificate,
    NationalId,
    PassportCertificate,
    BankAccountStatement,
    BusinessPremisePhotograph,
    imageUrl,
    publicId,
  } = updates;

  const result = await pool.query(
    `UPDATE documents
     SET businesscertificate=$1, pincertificate=$2, nationalid=$3,
         passportcertificate=$4, bankaccountstatement=$5,
         businesspremisephotograph=$6, image_url=$7, public_id=$8
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
      id,
    ]
  );
  return result.rows[0];
}

async function deleteDoc(id) {
  await pool.query("DELETE FROM documents WHERE id = $1", [id]);
}

module.exports = {
  getAllDocs,
  getDocById,
  getDocByUserId,
  createDoc,
  updateDoc,
  deleteDoc,
};