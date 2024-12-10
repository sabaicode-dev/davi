import React, { ReactNode} from "react";
import { useAuth } from "../contexts/AuthContext";
import { API_DEV_AUTH } from "@/src/utils/const/apiEndpoint";

interface PrivateRouteProps {
  children: ReactNode; // Child components to render if authenticated
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {

  const { email, username } = useAuth();

  const isAuthenticated = !!email && !!username;

  console.log("isAuthenticated", isAuthenticated);

  // If the user is not authenticated, redirect to Next.js signup page
  if (!isAuthenticated) {
    window.location.href = API_DEV_AUTH.SIGN_UP; // Redirect to signup
    //   window.open("http://localhost:3000/signup", "_blank");
    return null; // Return null to prevent rendering anything else
  }

  // Render the protected content if authenticated
  return <>{children}</>;
};

export default PrivateRoute;
