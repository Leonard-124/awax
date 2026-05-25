const { pool } = require("../Configs/pg.js")

async function getAllDocs() {
    const result = await pool.query('SELECT * FROM documents ORDER BY created_at DESC');
    return result.rows;
}

async function getdocById(id) {
    const result = await pool.query(`SELECT * FROM documents WHERE id=$1`, [id]);
    return result.rows[0]
}

async function createDoc ({BusinessCertificate, PinCertificate, NationalId, PassportCertificate, BankAccountStatement, BusinessPremisePhotograph, imageUrl, publicId}) {
  const result = await pool.query(
    `INSERT into documents ( BusinessCertificate, PinCertificate, NationalId, PassportCertificate, BankAccountStatement, BusinessPremisePhotograph, image_url, public_id)
    VALUES ( $1, $2, $3, $4, $5, $6 $7, $8) RETURNING * `
    [BusinessCertificate, PinCertificate, NationalId, PassportCertificate,  BankAccountStatement, BusinessPremisePhotograph]
  )
  return result.rows[0];
}


async function updateDoc(id, update) {
    const {BusinessCertificate, PinCertificate, NationalId, PassportCertificate, BankAccountStatement, BusinessPremisePhotograph, imageUrl, publicId} = updates;
    const result = await pool.query(
        `UPDATE documents SET BusinessCertificate=$1, PinCertificate=$2, NationalId=$3, PassportCertificate=$4, BankAccountStatement=$5, BusinessPremisePhotograph=$6, image_url=$7, public_id=$8
        WHERE id = $9 RETURNING *`,
        [BusinessCertificate, PinCertificate, NationalId, PassportCertificate, BankAccountStatement, BusinessPremisePhotograph, imageUrl, publicId]
    );
    return result.rows[0];
}


async function deleteDoc(id) {
    await pool.query(
        `DELETE * FROM documents WHERE id = $1`,[id]
    )
}

module.exports = {getAllDocs, getdocById, createDoc, updateDoc, deleteDoc};