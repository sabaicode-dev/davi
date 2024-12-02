import Layout from "@/src/components/organisms/layout/MainLayout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CreateProject from "@/src/components/molecules/steps/CreateProject";
import PickDataSource from "@/src/components/molecules/steps/PickDataSource";
import UploadCsv from "@/src/components/molecules/steps/UploadCSV";
import ImportUrl from "@/src/components/molecules/steps/ImportUrl";
import Visualize from "@/src/components/pages/Visualize";
import Dataset from "@/src/components/pages/Dataset";
import Helps from "@/src/components/pages/Helps";
import AccountSettings from "@/src/components/templates/AccountSettings";
import Project from "@/src/components/pages/Project";
import { AuthProvider } from "@/src/contexts/AuthContext";
import ShowProject from "@/src/components/molecules/steps/ShowProject";
import ProjectDetail from "@/src/components/molecules/project/ProjectDetail";
import FinalScreen from "./components/molecules/steps/FinalScreen";
import CleaningProject from "./components/molecules/steps/CleaningProject";

const ProjectFlow = () => {
  return (
    <Routes>
      {/* <Route path="/project/create" element={<CreateProject />} /> */}
      <Route path="/pick-datasource" element={<PickDataSource />} />
      <Route
        path="pick-datasource/upload-csv/:projectId"
        element={<UploadCsv />}
      />
      <Route path="pick-datasource/import/:projectId" element={<ImportUrl />} />
    </Routes>
  );
};

const routes = [
  {
    path: "/",
    element: <Navigate to="/project" replace />,
  },
  { path: "/project", element: <Project /> },
  { path: "/project/create", element: <CreateProject /> },
  { path: "/project/:projectId", element: <ProjectDetail /> },
  { path: "/select-project", element: <ShowProject /> },
  { path: "/project/*", element: <ProjectFlow /> },
  { path: "/project/create/pick-datasource", element: <PickDataSource /> },
  { path: "/visualize", element: <Visualize /> },
  { path: "/dataset", element: <Dataset /> },
  { path: "/helps", element: <Helps /> },
  { path: "/accountsetting", element: <AccountSettings /> },
  { path: "/cleaning", element: <AccountSettings /> },
  { path: "/template-table", element: <CleaningProject /> },
  {
    path: "/project/:projectId/file/:fileId/cleaning",
    element: <CleaningProject />,
  },
  { path: "/project/:projectId/file/:fileId/finalscreen", element: <FinalScreen/> },
];


export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* <PrivateRoute> */}
          <Layout>
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Routes>
          </Layout>
        {/* </PrivateRoute> */}
      </BrowserRouter>
    </AuthProvider>
  );
};
