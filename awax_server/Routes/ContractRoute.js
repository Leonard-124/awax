const express = require("express");
const { ContraSet } =  require("../Contracts/contracts.js")

const router = express.Router();


router.get("/contract", ContraSet);

module.exports = router;