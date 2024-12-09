import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { API_ENDPOINTS } from "@/src/utils/const/apiEndpoint";

interface AuthContextType {
  username: string | null;
  email: string | null;
  setUsername: (value: string | null) => void;
  setEmail: (value: string | null) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.USER_PROFILE, {
          method: "GET",
          credentials: "include", // Include cookies in the request
        });

        console.log("response", response);

        if (response.ok) {
          const data = await response.json();
          console.log("User data", data);
          setUsername(data.username);
          setEmail(data.email);
        } else {
          console.error("Failed to fetch user details");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <AuthContext.Provider value={{ username, email, setUsername, setEmail }}>
      {isLoading ? "loading..." : children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
