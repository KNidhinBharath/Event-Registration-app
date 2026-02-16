import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";

export default function Dashboard() {

  const [registrations, setRegistrations] = useState([]);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Dashboard data:", res.data);
      setRegistrations(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  const cancelRegistration = async (registrationId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/registrations/${registrationId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Cancelled successfully");

      // 🔥 Tell Explorer to refresh seats
      window.dispatchEvent(new Event("refreshEvents"));

      // Refresh dashboard locally
      fetchDashboard();

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Cancel failed");
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // ✅ Remove null events safely
  const validRegs = registrations.filter(r => r.event);

  const now = new Date();

  // ✅ Upcoming + Past split (Assignment requirement)
  const upcoming = validRegs.filter(
    r => new Date(r.event.dateTime) > now
  );

  const past = validRegs.filter(
    r => new Date(r.event.dateTime) <= now
  );

  return (
    <MainLayout>

      {/* 🟢 Upcoming Events */}
      <h1 className="text-2xl font-bold mb-4">
        Upcoming Events
      </h1>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {upcoming.length === 0 ? (
          <p className="text-gray-500">No upcoming events</p>
        ) : (
          upcoming.map((r) => (
            <div
              key={r._id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
            >
              <h2 className="font-bold text-lg">
                {r.event.name}
              </h2>

              <p className="text-gray-500">
                {r.event.location}
              </p>

              <p className="text-sm mb-4">
                {r.event.dateTime
                  ? new Date(r.event.dateTime).toLocaleDateString()
                  : ""}
              </p>

              <button
                onClick={() => cancelRegistration(r._id)}
                className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
              >
                Cancel
              </button>
            </div>
          ))
        )}
      </div>

      {/* 🔵 Past Events */}
      <h1 className="text-2xl font-bold mb-4">
        Past Events
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {past.length === 0 ? (
          <p className="text-gray-500">No past events</p>
        ) : (
          past.map((r) => (
            <div
              key={r._id}
              className="bg-gray-200 p-5 rounded-xl"
            >
              <h2 className="font-semibold">
                {r.event.name}
              </h2>
            </div>
          ))
        )}
      </div>

    </MainLayout>
  );
}
