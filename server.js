require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let sessions = []; // Temporary in-memory storage

// Route: Start a farming session
app.post("/sessions/start", (req, res) => {
    const { farmerName, farmSize, cropType, village, district, plantingStartDate } = req.body;

    if (!farmerName || !farmSize || !cropType || !village || !district || !plantingStartDate) {
        return res.status(400).json({ error: "All required fields must be filled." });
    }

    const newSession = {
        id: sessions.length + 1,
        farmerName,
        farmSize,
        cropType,
        village,
        district,
        plantingStartDate,
        plantingEndDate: null,
        status: "active",
        expectedHarvest: null,
        soilType: null,
        soilPhLevel: null,
        seedType: null,
        seedVariety: null,
        seedSource: null,
        seedQuantity: null,
        seedCost: null,
        data: [],
    };

    sessions.push(newSession);
    res.status(201).json({ message: "Session started successfully!", session: newSession });
});

// Route: Update missing session details before ending
app.post("/sessions/:id/update", (req, res) => {
    const { id } = req.params;
    const session = sessions.find(s => s.id == id);

    if (!session) {
        return res.status(404).json({ error: "Session not found!" });
    }
    if (session.status !== "active") {
        return res.status(400).json({ error: "Cannot update a closed session!" });
    }

    const {
        expectedHarvest,
        soilType,
        soilPhLevel,
        seedType,
        seedVariety,
        seedSource,
        seedQuantity,
        seedCost
    } = req.body;

    // Update only if provided
    if (expectedHarvest) session.expectedHarvest = expectedHarvest;
    if (soilType) session.soilType = soilType;
    if (soilPhLevel) session.soilPhLevel = soilPhLevel;
    if (seedType) session.seedType = seedType;
    if (seedVariety) session.seedVariety = seedVariety;
    if (seedSource) session.seedSource = seedSource;
    if (seedQuantity) session.seedQuantity = seedQuantity;
    if (seedCost) session.seedCost = seedCost;

    res.status(200).json({ message: "Session updated successfully!", session });
});

// Route: End a farming session (Only if all required details are provided)
app.post("/sessions/:id/end", (req, res) => {
    const { id } = req.params;
    const session = sessions.find(s => s.id == id);

    if (!session) {
        return res.status(404).json({ error: "Session not found!" });
    }

    // Check if all required fields are filled before ending session
    if (!session.expectedHarvest || !session.soilType || !session.soilPhLevel || !session.seedType || 
        !session.seedVariety || !session.seedSource || !session.seedQuantity || !session.seedCost) {
        return res.status(400).json({ 
            error: "Cannot end session. Some required details are missing!", 
            missingFields: {
                expectedHarvest: session.expectedHarvest,
                soilType: session.soilType,
                soilPhLevel: session.soilPhLevel,
                seedType: session.seedType,
                seedVariety: session.seedVariety,
                seedSource: session.seedSource,
                seedQuantity: session.seedQuantity,
                seedCost: session.seedCost
            }
        });
    }

    // End the session
    session.status = "ended";
    session.plantingEndDate = new Date();
    
    res.status(200).json({ message: "Session ended successfully!", session });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
