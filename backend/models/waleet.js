// models/Wallet.js
import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
  id: { type: String, required: true }, // Unique wallet ID
  label: { type: String, required: true }, // Wallet name
  balance: { type: Number }, // Wallet balance
  
});

const Wallet = mongoose.model('Wallet', walletSchema);
export default Wallet;
