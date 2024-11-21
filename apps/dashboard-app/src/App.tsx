import Layout from "@/src/components/organisms/layout/MainLayout";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { GetStart } from "@/src/components/molecules/steps/GetStart";
import CreateProject from "@/src/components/molecules/steps/CreateProject";
import SelectProject from "@/src/components/molecules/steps/SelectProject";
import PickDataSource from "@/src/components/molecules/steps/PickDataSource";
import UploadCsv from "./components/molecules/steps/UploadCSV";
import ImportUrl from "./components/molecules/steps/ImportUrl";
import Visualize from "./components/pages/Visualize";
import Dataset from "./components/pages/Dataset";
import Helps from "./components/pages/Helps";
import AccountSettings from "./components/templates/AccountSettings";
// import Project from "./components/pages/Project";
import { AuthProvider } from "./contexts/AuthContext";
import Spinner from "./components/loading/Spinner";

const routes = [
  { path: "/", element: <Spinner /> },
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

export const App = () => {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
};
export default App;
