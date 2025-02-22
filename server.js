require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("AgroEdge Backend is Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
