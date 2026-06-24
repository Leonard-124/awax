// const {createDoc, getDocuments, getDocById, updateDocument, deleteDoc} = require("../Controllers/DocController.js")
// const express = require("express")

// const router = express.Router();


// router.post("/create", createDoc);
// router.put("/update/:id", updateDocument);
// router.get("/getDoc", getDocuments);
// router.get("/get/:id", getDocById)
// router.delete("/delete/:id", deleteDoc)



// module.exports = router;

/////////////////////////////////

const express = require("express");
const {
  createDoc,
  getDocuments,
  getDocById,
  getMyDoc,
  updateDocument,
  deleteDoc,
} = require("../Controllers/DocController.js");
const { verifyToken } = require("../Middlewares/auth.js");

const router = express.Router();

// Protected: requires auth token
router.post("/create", verifyToken, createDoc);
router.get("/my-doc", verifyToken, getMyDoc);

// Admin / general routes
router.put("/update/:id", verifyToken, updateDocument);
router.get("/getDoc", getDocuments);
router.get("/get/:id", getDocById);
router.delete("/delete/:id", verifyToken, deleteDoc);

module.exports = router;