import { useEffect, useState } from "react";
import useEvents from "../hooks/useEvents";
import EventCard from "../components/EventCard";
import MainLayout from "../layouts/MainLayout";

export default function Explorer() {

  const { events, fetchEvents } = useEvents();

  const [filters, setFilters] = useState({
    search: "",
    location: "",
    category: ""
  });

  useEffect(() => {
    fetchEvents(filters);
  }, [filters]);

  useEffect(() => {
    const refresh = () => fetchEvents(filters);

    window.addEventListener("refreshEvents", refresh);
    return () => window.removeEventListener("refreshEvents", refresh);

  }, [filters]);

  return (
    <MainLayout>

      <div className="bg-white p-4 rounded-2xl shadow mb-8">

        <h2 className="text-lg font-semibold mb-4">
          Explore Events
        </h2>

        <div className="grid md:grid-cols-3 gap-3">

          <input
            placeholder="🔎 Search events..."
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            onChange={(e) =>
              setFilters(prev => ({ ...prev, search: e.target.value }))
            }
          />

          <input
            placeholder="📍 Location"
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            onChange={(e) =>
              setFilters(prev => ({ ...prev, location: e.target.value }))
            }
          />

          <input
            placeholder="🏷 Category"
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            onChange={(e) =>
              setFilters(prev => ({ ...prev, category: e.target.value }))
            }
          />

        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {events.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No events found
          </div>
        ) : (
          events.map(e => (
            <EventCard key={e._id} event={e} />
          ))
        )}

      </div>

    </MainLayout>
  );
}
