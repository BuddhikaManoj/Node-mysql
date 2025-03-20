import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/auth/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.data.success) {
        navigate("/");
      }
    } catch (error) {
      navigate("/");
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  return <div>Dashboard</div>;
};

export default Dashboard;
