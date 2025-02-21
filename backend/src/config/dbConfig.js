import dotenv from 'dotenv';
dotenv.config();
import pkg from 'pg';
const { Pool } = pkg;

console.log(typeof process.env.DB_PASSWORD, process.env.DB_PASSWORD);

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.on("connect", () => {
    console.log("✅ Connected to PostgreSQL Database!");
});

pool.on("error", (err) => {
    console.error("❌ Database Connection Error:", err);
});

// Testing the connection by querying the database
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error("❌ Error executing query:", err);
    } else {
        console.log("Database time:", res.rows[0]);
    }
});

export default pool;