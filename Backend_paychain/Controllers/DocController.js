// const cloudinary = require("../Configs/cloudinary.js");
// const Doc = require("../Models/Docs.js");

// async function createDoc(req, res) {
//   try {
//     // if (!req.file) return res.status(400).json({ error: "Image file required" });

//     // const uploadResult = await cloudinary.uploader.upload(req.file.path, { folder: "kyc" });

//     const {
//       BusinessCertificate,
//       PinCertificate,
//       NationalId,
//       PassportCertificate,
//       BankAccountStatement,
//       BusinessPremisePhotograph
//     } = req.body;

//     const document = await Doc.createDoc({
//       BusinessCertificate,
//       PinCertificate,
//       NationalId,
//       PassportCertificate,
//       BankAccountStatement,
//       BusinessPremisePhotograph,
//       // imageUrl: uploadResult.secure_url,
//       // publicId: uploadResult.public_id
//     });

//     res.status(201).json(document);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// }

// async function getDocuments(req, res) {
//   try {
//     const documents = await Doc.getAllDocs();
//     res.json(documents);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }

// async function getDocById(req, res) {
//   try {
//     const document = await Doc.getDocById(req.params.id);
//     if (!document) return res.status(404).json({ error: "Document Not found" });
//     res.json(document);
//   } catch (err) {
//     res.status(403).json({ error: err.message });
//   }
// }

// async function updateDocument(req, res) {
//   try {
//     const {
//       BusinessCertificate,
//       PinCertificate,
//       NationalId,
//       PassportCertificate,
//       BankAccountStatement,
//       BusinessPremisePhotograph
//     } = req.body;

//     let updates = {
//       BusinessCertificate,
//       PinCertificate,
//       NationalId,
//       PassportCertificate,
//       BankAccountStatement,
//       BusinessPremisePhotograph
//     };

//     const existing = await Doc.getDocById(req.params.id);

//     if (req.file) {
//       if (existing?.public_id) {
//         await cloudinary.uploader.destroy(existing.public_id);
//       }
//       const uploadResult = await cloudinary.uploader.upload(req.file.path, { folder: "kyc" });
//       updates.imageUrl = uploadResult.secure_url;
//       updates.publicId = uploadResult.public_id;
//     } else {
//       updates.imageUrl = existing.image_url;
//       updates.publicId = existing.public_id;
//     }

//     const updated = await Doc.updateDoc(req.params.id, updates);
//     res.json(updated);
//   } catch (err) {
//     console.error(err);
//     res.status(403).json({ error: err.message });
//   }
// }

// async function deleteDoc(req, res) {
//   try {
//     const document = await Doc.getDocById(req.params.id);
//     if (!document) return res.status(404).json({ error: "Document Not Found" });

//     if (document.public_id) {
//       await cloudinary.uploader.destroy(document.public_id);
//     }

//     await Doc.deleteDoc(req.params.id);
//     res.json({ message: "Deleted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// }

// module.exports = { createDoc, getDocuments, getDocById, updateDocument, deleteDoc };

/////////////////////////////////////////////

const cloudinary = require("../Configs/cloudinary.js");
const Doc = require("../Models/Docs.js");
const { markKycVerified } = require("../Models/User.js");

async function createDoc(req, res) {
  try {
    const {
      BusinessCertificate,
      PinCertificate,
      NationalId,
      PassportCertificate,
      BankAccountStatement,
      BusinessPremisePhotograph,
    } = req.body;

    if (
      !BusinessCertificate ||
      !PinCertificate ||
      !NationalId ||
      !PassportCertificate ||
      !BankAccountStatement ||
      !BusinessPremisePhotograph
    ) {
      return res.status(400).json({ error: "All KYC fields are required" });
    }

    let imageUrl = null;
    let publicId = null;

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "kyc",
      });
      imageUrl = uploadResult.secure_url;
      publicId = uploadResult.public_id;
    }

    const document = await Doc.createDoc({
      userId: req.userId, // from verifyToken middleware
      BusinessCertificate,
      PinCertificate,
      NationalId,
      PassportCertificate,
      BankAccountStatement,
      BusinessPremisePhotograph,
      imageUrl,
      publicId,
    });

    // Mark user as KYC verified
    await markKycVerified(req.userId);

    res.status(201).json({ message: "KYC submitted successfully", document });
  } catch (err) {
    console.error("createDoc error:", err);
    res.status(500).json({ error: err.message });
  }
}

async function getDocuments(req, res) {
  try {
    const documents = await Doc.getAllDocs();
    res.json(documents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getDocById(req, res) {
  try {
    const document = await Doc.getDocById(req.params.id);
    if (!document) return res.status(404).json({ error: "Document not found" });
    res.json(document);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/my-doc — returns the KYC doc for the logged-in user
async function getMyDoc(req, res) {
  try {
    const document = await Doc.getDocByUserId(req.userId);
    if (!document) return res.status(404).json({ error: "No KYC document found" });
    res.json(document);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateDocument(req, res) {
  try {
    const {
      BusinessCertificate,
      PinCertificate,
      NationalId,
      PassportCertificate,
      BankAccountStatement,
      BusinessPremisePhotograph,
    } = req.body;

    const existing = await Doc.getDocById(req.params.id);
    if (!existing) return res.status(404).json({ error: "Document not found" });

    let updates = {
      BusinessCertificate,
      PinCertificate,
      NationalId,
      PassportCertificate,
      BankAccountStatement,
      BusinessPremisePhotograph,
      imageUrl: existing.image_url,
      publicId: existing.public_id,
    };

    if (req.file) {
      if (existing.public_id) {
        await cloudinary.uploader.destroy(existing.public_id);
      }
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "kyc",
      });
      updates.imageUrl = uploadResult.secure_url;
      updates.publicId = uploadResult.public_id;
    }

    const updated = await Doc.updateDoc(req.params.id, updates);
    res.json(updated);
  } catch (err) {
    console.error("updateDocument error:", err);
    res.status(500).json({ error: err.message });
  }
}

async function deleteDoc(req, res) {
  try {
    const document = await Doc.getDocById(req.params.id);
    if (!document) return res.status(404).json({ error: "Document not found" });

    if (document.public_id) {
      await cloudinary.uploader.destroy(document.public_id);
    }

    await Doc.deleteDoc(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("deleteDoc error:", err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createDoc, getDocuments, getDocById, getMyDoc, updateDocument, deleteDoc };