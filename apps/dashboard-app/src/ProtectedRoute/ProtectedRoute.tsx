import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      // No token found, redirect to signup page
      window.location.href = "http://localhost:3000/signup";
    } else {
      // Verify the token with /v1/auth/me endpoint
      axios
        .get("http://localhost:4001/v1/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("Token is valid. User can access the dashboard.");
            // Allow access to the protected route
          } else {
            console.warn("Token is invalid. Redirecting to signup...");
            localStorage.removeItem("authToken");
            window.location.href = "http://localhost:3000/signup";
          }
        })
        .catch((err) => {
          console.error("Token verification failed:", err);
          localStorage.removeItem("authToken");
          window.location.href = "http://localhost:3000/signup";
        });
    }
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;
