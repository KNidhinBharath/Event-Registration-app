import Registration from "../models/Registration.js";
import Event from "../models/Event.js";

export const registerEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.seatsLeft <= 0) {
      return res.status(400).json({ message: "No seats left" });
    }

    // ⭐ create registration record
    const registration = await Registration.create({
      user: req.user.id,
      event: event._id,
      status: "active",
    });

    event.seatsLeft -= 1;
    await event.save();

    res.json(registration);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Register failed" });
  }
};

export const cancelRegistration = async (req, res) => {
  try {
    const reg = await Registration.findById(req.params.id);

    if (!reg) {
      return res.status(404).json({ message: "Registration not found" });
    }

   
    const event = await Event.findById(reg.event);

    if (event) {
      event.seatsLeft += 1;
      await event.save();
    }

        await reg.deleteOne();

    res.json({ message: "Cancelled successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cancel failed" });
  }
};



