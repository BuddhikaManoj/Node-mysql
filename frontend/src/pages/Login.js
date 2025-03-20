import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    console.log(formData);

    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        formData
      );
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-10 w-80 flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <label className="text-left font-bold">Email</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="border rounded-md p-2"
          required
        />

        <label className="text-left font-bold">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="border rounded-md p-2"
          required
        />

        <button
          type="submit"
          className="bg-green-500 text-white rounded-md p-2 mt-4 hover:bg-green-600"
        >
          Login
        </button>

        <button
          type="button"
          onClick={handleRegister}
          className="border border-green-200 text-blue-500 rounded-md p-2 hover:bg-green-100"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;
