const express = require("express");
const cors = require("cors")
// import { connectDB } from "./Configs/db.js"
const { connectPG } = require("./Configs/pg.js")

const useRoute = require("./Routes/useRoute.js")
const DocRoute = require("./Routes/DocRoute.js")
const ContractRoute = require("./Routes/ContractRoute.js")

const app = express()

const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Paychain Backend")
})

app.use("/", useRoute)
app.use("/api", DocRoute)
app.use("/api", ContractRoute);

app.listen(PORT, async () => {
    await connectPG()
    console.log(`Server running on http://localhost:${PORT}`)
}) 