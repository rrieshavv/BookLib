import React, { useState } from "react";
import { loginUser } from "../services/authService"; // Make sure this function returns a Promise
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    const response = await loginUser(username, password);
    console.log(response);
  
    if (response.success) {
      toast.success(response.message || "Logged in successfully");
      nav("/");
    } else {
      setError(response.message || "Login failed");
      toast.error(response.message || "Login failed");
    }
  
    setLoading(false);
  };
  

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left panel */}
      <div className="w-full md:w-1/2 h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white/80 shadow-xl rounded-lg p-6 sm:p-8 w-full max-w-md">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
            Login to BookLib
          </h2>
          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label
                className="block text-sm sm:text-base text-gray-700 mb-1"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm sm:text-base focus:ring-2 focus:ring-indigo-400 outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                className="block text-sm sm:text-base text-gray-700 mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm sm:text-base focus:ring-2 focus:ring-indigo-400 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-right text-sm">
              <Link
                to="/forget-password"
                className="text-emerald-500 hover:text-emerald-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-2 sm:py-3 rounded-md hover:bg-emerald-700 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-emerald-500 hover:text-emerald-600 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>

      {/* Right image panel */}
      <div className="hidden md:block w-1/2 h-screen">
        <img
          src="../src/assets/rightPannelImageAuth.jpg"
          alt="Background Art"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
