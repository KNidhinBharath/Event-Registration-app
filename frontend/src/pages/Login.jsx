import { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);

      login(res.data);

      navigate("/dashboard", { replace: true });

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* ✅ Success message from Register */}
        {location.state?.message && (
          <p className="text-green-500 text-center mb-2">
            {location.state.message}
          </p>
        )}

        {/* ❌ Error message */}
        {error && (
          <p className="text-red-500 text-center mb-2">
            {error}
          </p>
        )}

        <input
          value={form.email}
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded-lg"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          value={form.password}
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3 rounded-lg"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg"
        >
          Login
        </button>

        
        <div className="text-center mt-4 border-t pt-4">
          <p className="text-gray-600">
            New user?
            <Link
              to="/register"
              className="ml-2 text-green-600 font-semibold hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>

      </form>
    </div>
  );
}
