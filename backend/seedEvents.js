import mongoose from "mongoose";
import dotenv from "dotenv";
import Event from "./models/Event.js";
import events from "./data/events.json" assert { type: "json" };

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const importData = async () => {
  try {
    await Event.deleteMany();   // optional reset
    await Event.insertMany(events);

    console.log("Events Imported!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();
