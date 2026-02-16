import Event from "../models/Event.js";

export const getEvents = async (req, res) => {

  const { search, location, category, page = 1 } = req.query;

  let query = {};

  // 🔎 Search by event name
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  // 📍 Flexible location search
  if (location) {
    query.location = { $regex: location, $options: "i" };
  }

  // 🏷 Flexible category search
  if (category) {
    query.category = { $regex: category, $options: "i" };
  }

  const limit = 10;
  const skip = (page - 1) * limit;

  const events = await Event.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ dateTime: 1 });   // ⭐ also fixing sort field

  res.json(events);
};
