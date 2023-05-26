import mongoose from "mongoose";

const TravellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    place: {
        type: String,
        required: true
    },

    persons: {
        type: Number,
        required: true
    },

    budget: {
        type: Number,
        required: true
    },
})

export default mongoose.models.travellers || mongoose.model("travellers", TravellerSchema);