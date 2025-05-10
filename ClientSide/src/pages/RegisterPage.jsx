import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import InputField from "../components/Frms/InputFIeld";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [formdata, setFormdata] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formdata.confirmPassword !== formdata.password) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true); // Start loading

    try {
      const result = await registerUser(formdata);
      if (result.success) {
        toast.success(result.message);
        navigate("/login");
      } else {
        setError(result.message);
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white/80 shadow-xl rounded-lg p-6 sm:p-8 w-full max-w-md">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
            Register for BookLib
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}

            <InputField
              id="username"
              label="Username"
              value={formdata.username}
              onChange={handleChange}
              required
            />
            <div className="flex space-x-2">
              <InputField
                id="firstname"
                label="First Name"
                value={formdata.firstname}
                onChange={handleChange}
                half
                required
              />
              <InputField
                id="lastname"
                label="Last Name"
                value={formdata.lastname}
                onChange={handleChange}
                half
                required
              />
            </div>
            <InputField
              id="email"
              label="Email"
              type="email"
              value={formdata.email}
              onChange={handleChange}
              required
            />
            <InputField
              id="mobile"
              label="Mobile Number"
              type="tel"
              value={formdata.mobile}
              onChange={handleChange}
              required
            />
            <InputField
              id="password"
              label="Password"
              type="password"
              value={formdata.password}
              onChange={handleChange}
              required
            />
            <InputField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              value={formdata.confirmPassword}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white py-2 sm:py-3 rounded-md transition ${
                loading
                  ? "bg-emerald-400 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-500 hover:text-emerald-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>

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

export default RegisterPage;
