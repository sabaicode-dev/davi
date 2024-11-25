import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      // Redirect to Next.js signup if no token found
      window.location.href = "http://localhost:3000/signup";
    } else {
      // Optionally verify the token with Next.js backend
      axios
        .get("http://localhost:3000/api/verify-token", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.status !== 200) {
            localStorage.removeItem("authToken"); // Clear invalid token
            window.location.href = "http://localhost:3000/signup";
          }
        })
        .catch(() => {
          localStorage.removeItem("authToken");
          window.location.href = "http://localhost:3000/signup";
        });
    }
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;
