import React, { createContext, useState, useContext, useCallback, ReactNode } from "react";
import request from "../utils/helper";

interface Project {
  _id: string;
  project_name: string;
  project_description: string;
  created_at: string;
}

interface APIContextType {
  projects: Project[];
  fetchProjects: () => Promise<void>;
  getFilteredProjects: (filter: "recent" | "alphabetical" | null) => Project[];
  isLoading: boolean;
  error: string | null;
}

const APIContext = createContext<APIContextType | undefined>(undefined);

export const APIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects from API
  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await request({
        url: `http://127.0.0.1:8000/api/v1/projects/`,
        method: "GET",
      });

      if (response.success && response.data.results) {
        setProjects(response.data.results);
      } else {
        throw new Error("Failed to fetch projects.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching projects.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Filter projects locally
  const getFilteredProjects = useCallback(
    (filter: "recent" | "alphabetical" | null): Project[] => {
      if (filter === "recent") {
        return [...projects].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      }
      if (filter === "alphabetical") {
        return [...projects].sort((a, b) => a.project_name.localeCompare(b.project_name));
      }
      return projects;
    },
    [projects]
  );

  return (
    <APIContext.Provider value={{ projects, fetchProjects, getFilteredProjects, isLoading, error }}>
      {children}
    </APIContext.Provider>
  );
};

export const useAPI = () => {
  const context = useContext(APIContext);
  if (!context) {
    throw new Error("useAPI must be used within APIProvider");
  }
  return context;
};
