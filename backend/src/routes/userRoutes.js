import express from "express";
import { registerFarmer, loginFarmer, updateFarmerProfile, deleteFarmerProfile } from "../controllers/userController.js"
const router = express.Router();

router.post("/register", registerFarmer);
router.post("/login", loginFarmer);
router.put("/:id", updateFarmerProfile);
router.delete("/:id", deleteFarmerProfile);
router.get("/farmers", getAllFarmers);
router.get("/test", (req, res) => {
    res.json({ message: "Server is working!" });
});


export default router;