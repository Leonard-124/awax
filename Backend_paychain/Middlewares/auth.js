const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or malformed token." });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Access token required." });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decoded.id; // ✅ match what you signed
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    return res.status(403).json({ error: "Invalid token" });
  }
}

module.exports = { verifyToken };

////////////////////////////////////////////////////////

// const jwt = require("jsonwebtoken");
// const { User }  = require("../Models/User.js")
// require("dotenv").config()

// async function verifyToken(req, res, next) {
//   const authHeader = req.headers.authorization;

//   try {
//       if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ error: "Missing or malformed token." });
//   }

//   const token = authHeader.split(" ")[1];
//   if (!token) {
//     return res.status(401).json({
//       success: false, 
//       error: "Access token required." 
//     });
//   }

//   // try {
//   //   const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//   //   req.userId = decoded.id; // ✅ match what you signed
//   //   next();
//   // } catch (err) {
//   //   if (err.name === "TokenExpiredError") {
//   //     return res.status(401).json({ error: "Token expired" });
//   //   }
//   //   return res.status(403).json({ error: "Invalid token" });
//   // }

//   const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//   console.log(decoded)

//   const user = await User.findUserById(decoded.id).select("-password");
//   if(!user) {
//     return res.status(401).json({
//       success: false,
//       error: "User not found"
//     })
//   }

//   // req.user = {
//   //   id: user._id.toString() || user.id.toString(),
//   //   username: user.username,
//   //   email: user.email,

//   // }
//   req.userId = decoded.id
//   next();
    
//   } catch (error) {
//     if(error.name === "TokenExpired") {
//       return res.status(401).json({
//         success: false,
//         error: "Token expired",
//       });
//     } else if (error.name === "JsonWebTokenError") {
//       return res.status(403).json({
//         success: false,
//         error: "Invalid token."
//       })
//     }
//   }
// }

// module.exports = { verifyToken };
