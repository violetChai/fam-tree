const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const personRoutes = require("./routes/personRoutes");
const authRoutes = require("./routes/authRoutes");

require("dotenv").config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/people", personRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Family Tree API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});