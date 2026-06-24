// const express = require("express");
// const cors = require("cors")
// // import { connectDB } from "./Configs/db.js"
// const { connectPG } = require("./Configs/pg.js")

// const useRoute = require("./Routes/useRoute.js")
// const DocRoute = require("./Routes/DocRoute.js")
// const ContractRoute = require("./Routes/ContractRoute.js")

// const app = express()

// const PORT = process.env.PORT || 4000

// app.use(express.json())
// app.use(cors())

// app.get("/", (req, res) => {
//     res.send("Paychain Backend")
// })

// app.use("/", useRoute)
// app.use("/api", DocRoute)
// app.use("/api", ContractRoute);

// app.listen(PORT, async () => {
//     await connectPG()
//     console.log(`Server running on http://localhost:${PORT}`)
// }) 

//////////////////////////////////////////////

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectPG } = require("./Configs/pg.js");

const useRoute = require("./Routes/useRoute.js");
const DocRoute = require("./Routes/DocRoute.js");

const app = express();
const PORT = process.env.PORT || 4000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: "*", // tighten to your domain in production
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(cookieParser());
app.use(express.json());

// Catch malformed JSON bodies — without this, body-parser throws an unhandled
// SyntaxError that logs a stack trace and leaves the request hanging.
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      error: "Invalid JSON in request body.",
      detail: process.env.NODE_ENV !== "production" ? err.message : undefined,
    });
  }
  next(err);
});

// ── Routes ────────────────────────────────────────────────────────────────────
app.get("/", (req, res) => res.send("Paychain Backend"));

app.use("/", useRoute);
app.use("/api", DocRoute);

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({
    error: "Internal server error.",
    detail: process.env.NODE_ENV !== "production" ? err.message : undefined,
  });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, async () => {
  await connectPG();
  console.log(`Server running on http://localhost:${PORT}`);
});