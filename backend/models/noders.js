import mongoose from "mongoose";

const NoderSchema = new mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
});

const Noder = mongoose.model('Noder', NoderSchema);
export default Noder;
