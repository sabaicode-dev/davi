import Layout from "@/src/components/organisms/layout/MainLayout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CreateProject from "@/src/components/molecules/steps/CreateProject";
import PickDataSource from "@/src/components/molecules/steps/PickDataSource";
import UploadCsv from "@/src/components/molecules/steps/UploadCSV";
import ImportUrl from "@/src/components/molecules/steps/ImportUrl";
import Visualize from "@/src/components/pages/Visualize";
import Dataset from "./components/pages/Dataset";
import Helps from "@/src/components/pages/Helps";
import AccountSettings from "@/src/components/templates/AccountSettings";
import Project from "@/src/components/pages/Project";
import { AuthProvider } from "@/src/contexts/AuthContext";
import ShowProject from "@/src/components/molecules/steps/ShowProject";
import ProjectDetail from "@/src/components/molecules/project/ProjectDetail";
import FinalScreen from "./components/molecules/steps/FinalScreen";
import CleaningProject from "./components/molecules/steps/CleaningProject";
import PrivateRoute from "./ProtectedRoute/PrivateRoute";
import SelectTable from "./components/molecules/steps/selectTable";
import { MongoConnection } from "./components/molecules/steps/MongoConnection";
import { MySQLConnection } from "./components/molecules/steps/MySQLConnection";
import { SQLServerConnection } from "./components/molecules/steps/SQLServerConnection";
import { ConfirmFiles } from "./components/molecules/steps/ConfirmFiles";
import { PosgresSQLConnection } from "./components/molecules/steps/PosgresSQLConnection";
import { MariaDBConnection } from "./components/molecules/steps/MariaDBConnection";
import DetailVisualize from "./components/molecules/visualize/DetailVisualize";
import GetStarted from "@/src/components/pages/GetStarted";

const ProjectFlow = () => {
  return (
    <Routes>
      <Route path="/" element={<PickDataSource />} />
      <Route
        path="/csv"
        element={<UploadCsv />}
      />
      <Route path="/web" element={<ImportUrl />} />
      <Route
        path="/mongo-db"
        element={<MongoConnection />}
      />
      <Route
        path="/mysql"
        element={<MySQLConnection />}
      />
      <Route
        path="/sql-server"
        element={<SQLServerConnection />}
      />
      <Route
        path="/postgre-sql"
        element={<PosgresSQLConnection />}
      />
      <Route
        path="maria-db"
        element={<MariaDBConnection />}
      />
    </Routes>
  );
};

const routes = [
  {
    path: "/",
    element: <Navigate to="/projects" replace />,
  },
  { path: "/get-started", element: <GetStarted /> },
  { path: "/new-project", element: <CreateProject /> },
  { path: "/projects", element: <Project /> },
  { path: "/projects/:projectId", element: <ProjectDetail /> },
  { path: "/projects/:projectId/data-sources/*", element: <ProjectFlow /> },
  {
    path: "/projects/:projectId/files/:fileId/cleaning",
    element: <CleaningProject />,
  },
  {
    path: "/projects/:projectId/files/:fileId/finalscreen",
    element: <FinalScreen />,
  },

  {
    path: "/project/:projectId/data-sources/import/selectTable",
    element: <SelectTable />,
  },
  {
    path: "/project/:projectId/data-sources/query/confirmFiles",
    element: <ConfirmFiles />,
  },
  { path: "/select-project", element: <ShowProject /> },
  { path: "/project/create/data-sources", element: <PickDataSource /> },
  { path: "/visualize", element: <Visualize /> },
  { path: "/dataset", element: <Dataset /> },
  { path: "/helps", element: <Helps /> },
  { path: "/accountsetting", element: <AccountSettings /> },
  { path: "/cleaning", element: <AccountSettings /> },
  { path: "/template-table", element: <CleaningProject /> },

  {
    path: "/visualize/:visualizationId/detail",
    element: <DetailVisualize />,
  },
];

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <PrivateRoute>
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
        </PrivateRoute>
      </BrowserRouter>
    </AuthProvider>
  );
};
