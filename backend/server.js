import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import pool from "./src/config/dbConfig.js";  
import userRoutes from "./src/routes/userRoutes.js";
import errorHandler from "./src/middlewares/errorHandler.js"; 


dotenv.config() 
const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors()) 
app.use("/api/users", userRoutes);
app.use(errorHandler);

//test the database 
app.get("/", async (req, res) => {
    const result = await pool.query("SELECT current_database()")
    res.send(`The database name is: ${result.rows[0].current_database}`);});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});