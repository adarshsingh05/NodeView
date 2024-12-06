import express from 'express';
import mongoose from 'mongoose';
import WalletRoutes from './routes/WalletRoutes.js';
import cors from 'cors';
const app = express();
const port = 9000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
const dbURI = 'mongodb+srv://adarsh:a8400629408@cluster0.glqtu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Routes
app.use("/wallets", WalletRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});