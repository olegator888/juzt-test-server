import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  colorUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  engineType: {
    type: String,
    required: true,
  },
  transmission: {
    type: String,
    required: false,
  },
  powerReserve: {
    type: Number,
    required: false,
  },
});

export default mongoose.model("Car", CarSchema);
