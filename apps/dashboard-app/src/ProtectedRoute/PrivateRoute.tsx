import React, { ReactNode } from "react";

import { useAuth } from "../contexts/AuthContext";

interface PrivateRouteProps {
  children: ReactNode; // Child components to render if authenticated
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { email, username } = useAuth();

  const isAuthenticated = !!email && !!username;

  console.log("isAuthenticated", isAuthenticated);

  // If the user is not authenticated, redirect to Next.js signup page
  if (!isAuthenticated) {
    // window.location.href = "https://d3llp4uth9m31o.cloudfront.net/signup";
    window.location.href = `${process.env.REACT_APP_URL_DAVI}/signup`;
    return null; // Return null to prevent rendering anything else
  }

  // Render the protected content if authenticated
  return <>{children}</>;
};

export default PrivateRoute;
