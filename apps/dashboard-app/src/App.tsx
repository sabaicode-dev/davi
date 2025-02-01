import Layout from "@/src/components/organisms/layout/MainLayout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CreateProject from "@/src/components/molecules/steps/CreateProject";
import PickDataSource from "@/src/components/molecules/steps/PickDataSource";
import UploadCsv from "@/src/components/molecules/steps/UploadCSV";
import ImportUrl from "@/src/components/molecules/steps/ImportUrl";
import Visualize from "@/src/components/pages/Visualize";
import Helps from "@/src/components/pages/Helps";
import AccountSettings from "@/src/components/templates/AccountSettings";
import Project from "@/src/components/pages/Project";
import { AuthProvider } from "@/src/contexts/AuthContext";
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
      <Route path="/web/select-table" element={<SelectTable />} />
      <Route
        path="/mongo-db/confirm-files"
        element={<ConfirmFiles />}
      />
      <Route
        path="/mysql/confirm-files"
        element={<ConfirmFiles />}
      />
      <Route
        path="/sql-server/confirm-files"
        element={<ConfirmFiles />}
      />
      <Route
        path="/postgre-sql/confirm-files"
        element={<ConfirmFiles />}
      />
      <Route
        path="/maria-db/confirm-files"
        element={<ConfirmFiles />}
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
    path: "/projects/:projectId/files/:fileId/final-screen",
    element: <FinalScreen />,
  },
  { path: "/visualize", element: <Visualize /> },
  {
    path: "/visualize/:visualizationId/detail",
    element: <DetailVisualize />,
  },
  { path: "/helps", element: <Helps /> },
  { path: "/accountsetting", element: <AccountSettings /> },

  // HAVENT REVIEWD YET
  { path: "/project/create/data-sources", element: <PickDataSource /> },
  { path: "/template-table", element: <CleaningProject /> },
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
