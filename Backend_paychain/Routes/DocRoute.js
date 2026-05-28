const {createDoc, getDocuments, getDocById, updateDocument, deleteDoc} = require("../Controllers/DocController.js")
const express = require("express")

const router = express.Router();


router.post("/create", createDoc);
router.put("/update/:id", updateDocument);
router.get("/getDoc", getDocuments);
router.get("/get/:id", getDocById)
router.delete("/delete/:id", deleteDoc)



module.exports = router;