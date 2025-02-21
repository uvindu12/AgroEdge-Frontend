import asyncHandler from "express-async-handler"
import  { registerFarmerService, findFarmerByEmail, updateFarmerProfileService, deleteFarmerProfileService } from "../models/userModels.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

//register farmer
const registerFarmer = asyncHandler (async (req,res)=> {
    
    const {firstName, lastName, email, password } = req.body;
    if(!firstName || !lastName || !email || !password){
        res.status(400);
        throw new Error ("All fields are mandatory!" );    
    }
    
    const farmerAvailability = await findFarmerByEmail(email);
    if (farmerAvailability){
        res.status(400);
        throw new Error("User alredy registered!!")
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newFarmer = await registerFarmerService (firstName, lastName, email, hashedPassword);

    res.status(201).json({
        message:"Registered farmer successfully ",
        farmer:{
            id: newFarmer.id,
            firstName: newFarmer.first_name,
            lastName: newFarmer.last_name,
            email: newFarmer.email,
        }
    })
});


//login farmer
const loginFarmer = asyncHandler (async (req,res) => {
    
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error ("All fields are mandotory");
    }
    
    const farmer = await findFarmerByEmail(email);

    if(!farmer){
        res.status(400);
        throw new Error ("Farmer not found! ")
    }
    
    if(farmer && (await bcrypt.compare (password, farmer.password))){
        const accessToken = jwt.sign({
            farmer :{
                id: farmer.id,
                email: farmer.email,
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
    );
    res.status(200).json({
        message: "Login successful",
        farmer: {
          id: farmer.id,
          firstName: farmer.first_name,
          lastName: farmer.last_name,
          email: farmer.email,
        },
        accessToken,
    })
} else {
    res.status(400);
    throw new Error("Email or Passwors is not valid! ")
}
});

//update farmer profile
const updateFarmerProfile = asyncHandler(async (req,res) => {
    const {id} = req.params;
    const {firstName,lastName,email} = req.body;

    const updatedFarmer = await updateFarmerProfileService (id,firstName,lastName,email);
    if(!updatedFarmer){
        res.status(400);
        throw new Error ("Farmer not found")
    }
    res.status(200).json(updatedFarmer);

})

//delete farmer
const deleteFarmerProfile = asyncHandler(async (req,res) => {
    const {id} = req.params;

    const deletedFarmer = await deleteFarmerProfileService(id);
    if(!deletedFarmer){
        res.status(400);
        throw new Error ("Farmer not found")
    }

    res.status(200).json({ message: "Farmer deleted successfully", deletedFarmer });
})

import asyncHandler from "express-async-handler";
import { getAllFarmersService } from "../models/userModels.js";

// Get all farmers
const getAllFarmers = asyncHandler(async (req, res) => {
    try {
        const farmers = await getAllFarmersService();
        res.status(200).json({ success: true, farmers });
    } catch (error) {
        console.error("Error fetching farmers:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

export { registerFarmer, loginFarmer, updateFarmerProfile, deleteFarmerProfile, getAllFarmers };