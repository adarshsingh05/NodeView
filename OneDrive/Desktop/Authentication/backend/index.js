import express, { Router } from "express";
import { connectDB } from "./db/connectDB.js";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"
dotenv.config();
const app = express();
const port = process.env.PORT || 5000

// middleware to get data
app.use(express.json());
app.get('/', (req, res) => {
    res.send("Hello world");
});

app.use('/api/auth', authRoutes)

app.listen(port,  () => {
    connectDB(); // Call the connectDB function
    console.log("server started running ");
});

