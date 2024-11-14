import Layout from "@/src/components/organisms/layout/MainLayout";
import "@/src/styles.css";
import {
  BrowserRouter as Router,
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import Visualize from "@/src/components/pages/Visualize";
import Dataset from "@/src/components/pages/Dataset";
import Helps from "@/src/components/pages/Helps";
import AccountSettings from "@/src/components/templates/AccountSettings";
import Project from "@/src/components/pages/Project";

export const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Project />} />
          <Route path="/visualize" element={<Visualize />} />
          <Route path="/dataset" element={<Dataset />} />
          <Route path="/helps" element={<Helps />} />
          <Route path="/accountsetting" element={<AccountSettings />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
export default App;
