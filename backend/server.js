import express from 'express';
import mongoose from 'mongoose';
import WalletRoutes from './routes/WalletRoutes.js';
import cors from 'cors';
const app = express();
const port = 9000;
import dotenv from 'dotenv';
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Routes
app.use("/wallets", WalletRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});