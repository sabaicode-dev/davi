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
      <Route
        path="pick-datasource/mongoDB_Connection/:projectId"
        element={<MongoConnection />}
      />
      <Route
        path="pick-datasource/MySQL_connection/:projectId"
        element={<MySQLConnection />}
      />
      <Route
        path="pick-datasource/SQLServer_connection/:projectId"
        element={<SQLServerConnection />}
      />
      <Route
        path="pick-datasource/PosgresSQL_connection/:projectId"
        element={<PosgresSQLConnection />}
      />
      <Route
        path="pick-datasource/MariaDB_connection/:projectId"
        element={<MariaDBConnection />}
      />
    </Routes>
  );
};
// project/projectId/pick-datasource/import/
// http://localhost:8080/project/pick-datasource/import/6752655b6b20191452f44cb4
const routes = [
  {
    path: "/",
    element: <Navigate to="/project" replace />,
  },
  { path: "/project", element: <Project /> },
  { path: "/project/create", element: <CreateProject /> },
  { path: "/project/:projectId", element: <ProjectDetail /> },
  {
    path: "/project/:projectId/pick-datasource/import/selectTable",
    element: <SelectTable />,
  },
  {
    path: "/project/:projectId/pick-datasource/query/confirmFiles",
    element: <ConfirmFiles />,
  },
  { path: "/select-project", element: <ShowProject /> },
  { path: "/project/*", element: <ProjectFlow /> },
  { path: "/project/create/pick-datasource", element: <PickDataSource /> },
  { path: "/visualize", element: <Visualize /> },
  { path: "/dataset", element: <Dataset/> },
  { path: "/helps", element: <Helps /> },
  { path: "/accountsetting", element: <AccountSettings /> },
  { path: "/cleaning", element: <AccountSettings /> },
  { path: "/template-table", element: <CleaningProject /> },
  {
    path: "/project/:projectId/file/:fileId/cleaning",
    element: <CleaningProject />,
  },

  {
    path: "/project/:projectId/file/:fileId/finalscreen",
    element: <FinalScreen />,
  },
  {
    path: "/project/:projectId/file/:fileId/finalscreen",
    element: <FinalScreen />,
  },
  { path: "/visualize/detail-visualize", element: <DetailVisualize />},
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
