import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
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

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    } else {
      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        formData
      );
      console.log(response);

      if (response.data.success) {
        alert("Registration successful");
      }
    }
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-5">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-10 w-96 flex flex-col gap-2"
      >
        <h1 className="text-2xl font-bold text-center">Register</h1>

        <label className="text-left font-bold">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter username"
          className="border rounded-md p-2"
          required
        />

        <label className="text-left font-bold">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
          className="border rounded-md p-2"
          required
        />

        <label className="text-left font-bold">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          className="border rounded-md p-2"
          required
        />

        <label className="text-left font-bold">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm password"
          className="border rounded-md p-2"
          required
        />

        <button
          type="submit"
          className="bg-green-500 text-white rounded-md p-2 mt-4 hover:bg-green-600"
        >
          Register
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="border border-green-200 text-blue-500 rounded-md p-2 hover:bg-green-100"
        >
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default Register;
