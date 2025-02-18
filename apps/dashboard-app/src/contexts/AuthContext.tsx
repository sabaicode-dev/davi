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
  profile: string | null;
  setUsername: (value: string | null) => void;
  setEmail: (value: string | null) => void;
  setProfile: (value: string | null) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.USER_PROFILE, {
          method: "GET",
          credentials: "include", // Include cookies in the request
        });

        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);
          setEmail(data.email);
          setProfile(data.profile);
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
    <AuthContext.Provider
      value={{ username, email, profile, setUsername, setEmail, setProfile }}
    >
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
