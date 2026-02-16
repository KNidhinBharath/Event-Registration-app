import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: String,
  organizer: String,
  location: String,
  description: String,
  category: String,
  capacity: Number,
  seatsLeft: Number,   
  dateTime: Date
}, { timestamps: true });


export default mongoose.model("Event",eventSchema);
