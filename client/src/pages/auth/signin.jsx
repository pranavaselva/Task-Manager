import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(""); // ✅ For backend error messages

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setServerError(""); // ✅ Clear server error on input change
  };

  // Handle Login Submission
const handleSubmit = async (e) => {
  e.preventDefault();
  setServerError(""); // ✅ Clear previous errors

  try {
    const response = await axios.post("http://localhost:3000/api/auth/login", formData, {
      headers: { "Content-Type": "application/json" },
    });

    const data = response.data; // ✅ Axios automatically parses JSON

    if (response.status === 200) {
      alert("Login Successful! Redirecting...");
      // console.log(data.token)
      localStorage.setItem("token",data.token)
      navigate("/home"); // ✅ Redirect to Home page
    } else {
      setServerError(data.message || "Invalid credentials, try again!");
    }
  } catch (error) {
    console.error("Login Error:", error);
    setServerError(error.response?.data?.message || "Invalid email or password");
  }
};

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1 text-black"
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1 text-black"
              required
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {serverError && <p className="text-red-500 text-sm text-center">{serverError}</p>}

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/signup")}>
            Signup
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
