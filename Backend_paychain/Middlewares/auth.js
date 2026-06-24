// const jwt = require("jsonwebtoken");

// function verifyToken(req, res, next) {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ error: "Missing or malformed token." });
//   }

//   const token = authHeader.split(" ")[1];
//   if (!token) {
//     return res.status(401).json({ error: "Access token required." });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     req.userId = decoded.id; // ✅ match what you signed
//     next();
//   } catch (err) {
//     if (err.name === "TokenExpiredError") {
//       return res.status(401).json({ error: "Token expired" });
//     }
//     return res.status(403).json({ error: "Invalid token" });
//   }
// }

// module.exports = { verifyToken };

//////////////////////////////////////////////////////

const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;


if (!ACCESS_TOKEN_SECRET) {
  throw new Error("ACCESS_TOKEN_SECRET is not defined in environment variables.");
}

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or malformed token." });
  }

  const token = authHeader.slice(7).trim(); // "Bearer ".length === 7
  if (!token) {
    return res.status(401).json({ error: "Missing or malformed token." });
  }

  // ── Verify ─────────────────────────────────────────────────────────────────
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);

    if (!decoded.id) {

      return res.status(403).json({ error: "Invalid token payload." });
    }

    req.userId = decoded.id;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired." });
    }

    return res.status(403).json({ error: "Invalid token." });
  }
}

module.exports = { verifyToken };
