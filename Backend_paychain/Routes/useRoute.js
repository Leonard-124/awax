const express = require("express");

const {
    register,
    login,
    logout,
    refresh,
    getMe,
} = require("../Controllers/userController.js")

const { verifyToken } = require("../Middlewares/auth.js")

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me",verifyToken, getMe)


module.exports = router;