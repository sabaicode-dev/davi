// import React, { useEffect } from "react";
// import { useAPI } from "@/src/context/APIContext";
// import ImageProject from "@/public/images/saveImage.png";
// import formatDate from "@/src/utils/formatDate";
// import { useNavigate } from "react-router-dom";

// interface Project {
//   _id: string;
//   project_name: string;
//   project_description: string;
//   created_at: string;
// }

// interface SelectProjectProps {
//   selectedSort?: "recent" | "alphabetical" | null;
//   onSelectProject?: (projectId: string) => void;
//   onBack?: () => void;
// }

// const SelectProject: React.FC<SelectProjectProps> = ({
//   selectedSort = "recent",
//   onSelectProject,
//   onBack,
// }) => {
//   const { projects, fetchProjects, getFilteredProjects, isLoading, error } =
//     useAPI();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (projects.length === 0) {
//       fetchProjects();
//     }
//   }, [fetchProjects, projects.length]);

//   const filteredProjects = getFilteredProjects(selectedSort);

//   const handleProjectSelect = (projectId: string) => {
//     if (onSelectProject) {
//       onSelectProject(projectId);
//     }
//     navigate("/pick-datasource");
//   };

//   if (isLoading) {
//     return <p className="text-gray-600">Loading projects...</p>;
//   }

//   if (error) {
//     return <p className="text-red-500">Error: {error}</p>;
//   }

//   return (
//     <div className="space-y-4 overflow-auto mt-4 p-2 w-full">
//       {filteredProjects.map((project: Project) => (
//         <div
//           key={project._id}
//           className="flex justify-between p-4 shadow-lg rounded-xl cursor-pointer ring-2 hover:ring-blue-500 transition-all"
//           onClick={() => handleProjectSelect(project._id)}
//         >
//           <div className="flex flex-row space-x-4">
//             <img
//               src={ImageProject}
//               alt="Project icon"
//               className="w-12 h-12 object-cover rounded-lg"
//             />
//             <div className="flex flex-col">
//               <h1 className="font-bold text-lg">{project.project_name}</h1>
//               <p className="text-gray-600">
//                 {project.project_description || "No description"}
//               </p>
//               <p className="text-xs text-gray-500">
//                 {formatDate(project.created_at)}
//               </p>
//             </div>
//           </div>
//         </div>
//       ))}
//       {onBack && (
//         <button
//           onClick={onBack}
//           className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md transition-colors"
//         >
//           Back
//         </button>
//       )}
//     </div>
//   );
// };

// export default SelectProject;

import React, { useEffect } from "react";
import { useAPI } from "@/src/context/APIContext";
import ImageProject from "@/public/images/saveImage.png";
import formatDate from "@/src/utils/formatDate";
import { useNavigate } from "react-router-dom";

interface Project {
  _id: string;
  project_name: string;
  project_description: string;
  created_at: string;
}

interface SelectProjectProps {
  selectedSort?: "recent" | "alphabetical" | null;
  onBack?: () => void;
}

const SelectProject: React.FC<SelectProjectProps> = ({
  selectedSort = "recent",
  onBack,
}) => {
  const { projects, fetchProjects, getFilteredProjects, isLoading, error } =
    useAPI();
  const navigate = useNavigate();

  useEffect(() => {
    if (projects.length === 0) {
      fetchProjects();
    }
  }, [fetchProjects, projects.length]);

  const filteredProjects = getFilteredProjects(selectedSort);

  const handleProjectSelect = (projectId: string) => {
    navigate(`/pick-datasource?projectId=${projectId}`);
  };

  if (isLoading) {
    return <p className="text-gray-600">Loading projects...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="space-y-4 overflow-auto mt-4 p-2 w-full">
      {filteredProjects.map((project: Project) => (
        <div
          key={project._id}
          className="flex justify-between p-4 shadow-lg rounded-xl cursor-pointer ring-2 hover:ring-blue-500 transition-all"
          onClick={() => handleProjectSelect(project._id)}
        >
          <div className="flex flex-row space-x-4">
            <img
              src={ImageProject}
              alt="Project icon"
              className="w-12 h-12 object-cover rounded-lg"
            />
            <div className="flex flex-col">
              <h1 className="font-bold text-lg">{project.project_name}</h1>
              <p className="text-gray-600">
                {project.project_description || "No description"}
              </p>
              <p className="text-xs text-gray-500">
                {formatDate(project.created_at)}
              </p>
            </div>
          </div>
        </div>
      ))}
      {onBack && (
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md transition-colors"
        >
          Back
        </button>
      )}
    </div>
  );
};

export default SelectProject;
