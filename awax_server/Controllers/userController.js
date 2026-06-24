
// const bcrypt = require("bcryptjs");
// require("dotenv").config();

// const {
//   createUser,
//   findUserByEmail,
//   findUserById,
//   storeRefreshToken,
//   getUserByRefreshToken,
// } = require("../Models/User.js");

// const {
//   generateAccessToken,
//   generateRefreshToken,
//   verifyRefreshToken,
// } = require("../Utils/tokens.js");

// function setRefreshTokenCookie(res, token) {
//   res.cookie("refreshToken", token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//   });
// }

// async function register(req, res) {
//   try {
//     const { username, email, phone, password } = req.body;

//     if (!username || !email || !phone || !password) {
//       return res.status(400).json({ error: "All fields are required" });
//     }
//     if (password.length < 8) {
//       return res.status(400).json({ error: "Password must be at least 8 characters" });
//     }
//     if (username.trim().length >= 50) {
//       return res.status(400).json({ error: "Username must be less than 50 characters" });
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return res.status(400).json({ error: "Please enter a valid email address" });
//     }

//     const existing = await findUserByEmail(email.toLowerCase().trim());
//     if (existing) {
//       return res.status(409).json({ error: "Email already registered!" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);
//     const user = await createUser({
//       username: username.trim(),
//       email: email.toLowerCase().trim(),
//       phone: phone.trim(),
//       password: hashedPassword,
//     });

//     res.status(201).json({
//       message: "Account created successfully",
//       user: { id: user.id, email: user.email, username: user.username },
//     });
//   } catch (err) {
//     console.error("Registration error:", err);
//     res.status(500).json({ error: "Registration failed. Please try again later." });
//   }
// }

// async function login(req, res) {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ error: "Email and password are required" });
//     }

//     const user = await findUserByEmail(email.toLowerCase().trim());
//     if (!user) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     const accessToken = generateAccessToken(user.id);
//     const refreshToken = generateRefreshToken(user.id);
//     await storeRefreshToken(user.id, refreshToken);

//     setRefreshTokenCookie(res, refreshToken);

//     // Return refreshToken in body too — mobile clients can't read httpOnly cookies
//     res.json({
//       accessToken,
//       refreshToken,
//       kycVerified: user.kyc_verified || false,
//       user: { id: user.id, email: user.email, username: user.username },
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ error: "Login failed. Please try again." });
//   }
// }

// async function refresh(req, res) {
//   try {
//     // Accept token from cookie (web) or body (mobile)
//     const token = req.cookies?.refreshToken || req.body?.token;
//     if (!token) {
//       return res.status(401).json({ error: "Missing refresh token" });
//     }

//     let payload;
//     try {
//       payload = verifyRefreshToken(token);
//     } catch {
//       return res.status(403).json({ error: "Refresh token expired or invalid" });
//     }

//     const user = await getUserByRefreshToken(token);
//     if (!user) {
//       return res.status(403).json({ error: "Refresh token revoked" });
//     }

//     const newAccessToken = generateAccessToken(user.id);
//     const newRefreshToken = generateRefreshToken(user.id);
//     await storeRefreshToken(user.id, newRefreshToken);

//     setRefreshTokenCookie(res, newRefreshToken);

//     res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
//   } catch (err) {
//     console.error("Refresh error:", err);
//     res.status(500).json({ error: "Token refresh failed" });
//   }
// }

// async function logout(req, res) {
//   try {
//     const token = req.cookies?.refreshToken || req.body?.token;
//     if (token) {
//       const user = await getUserByRefreshToken(token);
//       if (user) await storeRefreshToken(user.id, null);
//     }

//     res.clearCookie("refreshToken", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
//     });

//     res.json({ message: "Logged out successfully" });
//   } catch (err) {
//     console.error("Logout error:", err);
//     res.status(500).json({ error: "Logout failed" });
//   }
// }

// async function getMe(req, res) { //
//   try {
//     const user = await findUserById(req.userId);
//     console.log(user)
//     if (!user) return res.status(404).json({ error: "User not found" });

//     res.json({
//       id: user.id,
//       email: user.email,
//       username: user.username,
//       phone: user.phone,
//       kycVerified: user.kyc_verified || false,
//     });
//   } catch (err) {
//     console.error("Error getting user:", err);
//     res.status(500).json({ error: "Failed to fetch user" });
//   }
// }

// module.exports = { register, login, refresh, logout, getMe };

////////////////////////////////////////////////////////////////////////

const bcrypt = require("bcryptjs");
require("dotenv").config();

const {
  createUser,
  findUserByEmail,
  findUserById,
  storeRefreshToken,
  getUserByRefreshToken,
} = require("../Models/User.js");

const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../Utils/tokens.js");

function setRefreshTokenCookie(res, token) {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

async function register(req, res) {
  try {
    const { username, email, phone, password } = req.body;

    if (!username || !email || !phone || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters" });
    }
    if (username.trim().length >= 50) {
      return res.status(400).json({ error: "Username must be less than 50 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Please enter a valid email address" });
    }

    const existing = await findUserByEmail(email.toLowerCase().trim());
    if (existing) {
      return res.status(409).json({ error: "Email already registered!" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await createUser({
      username: username.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Account created successfully",
      user: { id: user.id, email: user.email, username: user.username },
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Registration failed. Please try again later." });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await findUserByEmail(email.toLowerCase().trim());
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    await storeRefreshToken(user.id, refreshToken);

    setRefreshTokenCookie(res, refreshToken);

    // Return refreshToken in body too — mobile clients can't read httpOnly cookies
    res.json({
      accessToken,
      refreshToken,
      kycVerified: user.kyc_verified || false,
      user: { id: user.id, email: user.email, username: user.username },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed. Please try again." });
  }
}

async function refresh(req, res) {
  try {
    // Accept token from cookie (web) or body (mobile)
    const token = req.cookies?.refreshToken || req.body?.token;
    if (!token) {
      return res.status(401).json({ error: "Missing refresh token" });
    }

    let payload;
    try {
      payload = verifyRefreshToken(token);
    } catch {
      return res.status(403).json({ error: "Refresh token expired or invalid" });
    }

    const user = await getUserByRefreshToken(token);
    if (!user) {
      return res.status(403).json({ error: "Refresh token revoked" });
    }

    const newAccessToken = generateAccessToken(user.id);
    const newRefreshToken = generateRefreshToken(user.id);
    await storeRefreshToken(user.id, newRefreshToken);

    setRefreshTokenCookie(res, newRefreshToken);

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (err) {
    console.error("Refresh error:", err);
    res.status(500).json({ error: "Token refresh failed" });
  }
}

async function logout(req, res) {
  try {
    const token = req.cookies?.refreshToken || req.body?.token;
    if (token) {
      const user = await getUserByRefreshToken(token);
      if (user) await storeRefreshToken(user.id, null);
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    });

    res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ error: "Logout failed" });
  }
}

async function getMe(req, res) {
  try {
    const user = await findUserById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      id: user.id,
      email: user.email,
      username: user.username,
      phone: user.phone,
      // kyc_verified is added via migration — fall back to false if column
      // doesn't exist yet so the endpoint doesn't crash before migration runs
      kycVerified: user.kyc_verified ?? false,
    });
  } catch (err) {
    console.error("getMe error:", err.message);
    // Surface the real DB error in the response during development
    res.status(500).json({
      error: "Failed to fetch user",
      detail: process.env.NODE_ENV !== "production" ? err.message : undefined,
    });
  }
}

module.exports = { register, login, refresh, logout, getMe };