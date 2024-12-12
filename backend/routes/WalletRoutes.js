import express from 'express';
const router = express.Router();
import Wallet from '../models/waleet.js';
import Noder from '../models/noders.js';

// Insert multiple wallets
router.post("/add", async (req, res) => {
    const wallets = req.body; // Expecting an array of wallets
  
    try {
      // Use `insertMany` to insert all wallets at once
      await Wallet.insertMany(wallets);
      res.status(201).json({ message: "Wallets added successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
router.post("/noder", async (req, res) => {

    try {
      const transactionData = req.body.transactions; // Extract transactions array from the body
  
      // Ensure that the data is an array and loop through it
      for (const tx of transactionData) {
        // Validate and save each transaction using your Mongoose model
        const transaction = new Noder(tx);
        await Noder.insertMany(transaction);      }
  
      res.status(200).json({
        message: "Transactions saved successfully",
      });
    } catch (err) {
      console.error("Error saving transaction", err);
      res.status(500).json({ message: "Failed to save transaction", error: err.message });
    }
  });
  router.get("/noder", async (req, res) => {
    try {
      // Fetch all transactions from the database
      const transactions = await Noder.find({}, "from to"); // Fetch only 'from' and 'to' fields
  
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  

// Get all wallets
router.get("/all", async (req, res) => {
  try {
    const wallets = await Wallet.find();
    res.status(200).json(wallets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/noder/:walletId', async (req, res) => {
  const walletId = req.params.walletId;

  try {
    // Fetch transactions where the walletId is either the sender or receiver
    const transactions = await Noder.find({
      $or: [{ from: walletId }, { to: walletId }],
    });

    // Respond with the transaction data
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});


export default router;