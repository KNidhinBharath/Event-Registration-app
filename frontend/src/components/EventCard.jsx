import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function EventCard({ event }) {

  const navigate = useNavigate();
  const [localEvent, setLocalEvent] = useState(event);

  const handleRegister = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:5000/api/registrations/${localEvent._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Registered successfully!");

      setLocalEvent(prev => ({
        ...prev,
        seatsLeft: prev.seatsLeft - 1
      }));

      window.dispatchEvent(new Event("refreshEvents"));

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">

      {/* Title */}
      <h2
        onClick={() => navigate(`/events/${localEvent._id}`)}
        className="font-bold text-lg cursor-pointer hover:text-blue-500"
      >
        {localEvent.name}
      </h2>

      {/* Organizer */}
      <p className="text-sm text-gray-600 mt-1">
        Organized by <span className="font-medium">{localEvent.organizer}</span>
      </p>

      {/* Description */}
      <p className="text-sm text-gray-500 mt-2 line-clamp-2">
        {localEvent.description}
      </p>

      {/* Location */}
      <p className="text-gray-500 mt-2">{localEvent.location}</p>

      {/* Date */}
      <p className="text-sm mt-1">
        {localEvent.dateTime
          ? new Date(localEvent.dateTime).toLocaleDateString()
          : "No Date"}
      </p>

      {/* Tags */}
      <div className="mt-2 flex gap-2 items-center flex-wrap">
        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
          {localEvent.category || "General"}
        </span>

        <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
          Seats Left: {localEvent.seatsLeft ?? "N/A"}
        </span>
      </div>

      {/* Register Button */}
      <button
        onClick={handleRegister}
        className="mt-4 w-full bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600 transition"
      >
        Register
      </button>

    </div>
  );
}
