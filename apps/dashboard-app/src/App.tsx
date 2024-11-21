import Visualize from "@/src/components/pages/Visualize";
import Dataset from "@/src/components/pages/Dataset";
import Helps from "@/src/components/pages/Helps";
import AccountSettings from "@/src/components/templates/AccountSettings";
import React, { Children } from "react";
import Layout from "@/src/components/organisms/layout/MainLayout";
import "@/src/styles.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { GetStart } from "@/src/components/molecules/steps/GetStart";
import CreateProject from "@/src/components/molecules/steps/CreateProject";
import SelectProject from "@/src/components/molecules/steps/SelectProject";
import PickDataSource from "@/src/components/molecules/steps/PickDataSource";
import UploadCsv from "./components/molecules/steps/UploadCSV";
import ImportUrl from "./components/molecules/steps/ImportUrl";

const routes = [
  { path: "/", element: <GetStart /> },
  { path: "/create-project", element: <CreateProject /> },
  { path: "/select-project", element: <SelectProject /> },
  { path: "/pick-datasource", element: <PickDataSource /> },
  { path: "/upload/:projectId", element: <UploadCsv /> },
  { path: "/import/:projectId", element: <ImportUrl /> },
  { path: "/visualize", element: <Visualize /> },
  { path: "/dataset", element: <Dataset /> },
  { path: "/helps", element: <Helps /> },
  { path: "/accountsetting", element: <AccountSettings /> },
  { path: "/cleaning", element: <AccountSettings /> },
];

export const App: React.FC = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default App;
