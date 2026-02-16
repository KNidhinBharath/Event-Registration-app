import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  console.log("NAVBAR USER:", user);

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link
          to="/explorer"
          className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition"
        >
          EventPlatform
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {user && (
            <>
              <Link
                to="/dashboard"
                className="text-gray-600 font-medium hover:text-blue-600 transition"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-1.5 rounded-lg transition duration-200 shadow-sm"
              >
                Logout
              </button>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}
