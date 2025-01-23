import React, { ReactNode } from "react";

import { useAuth } from "../contexts/AuthContext";

interface PrivateRouteProps {
  children: ReactNode; // Child components to render if authenticated
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { email, username } = useAuth();

  const isAuthenticated = !!email && !!username;

  // If the user is not authenticated, redirect to Next.js signup page
  if (!isAuthenticated) {
    window.location.href = `${process.env.REACT_APP_URL_DAVI}/signup`;
    return null; // Return null to prevent rendering anything else
  }

  // Render the protected content if authenticated
  return <>{children}</>;
};

export default PrivateRoute;
