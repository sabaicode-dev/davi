import Layout from "@/src/components/organisms/layout/MainLayout";
import "./styles.css";
import {
  BrowserRouter as Router,
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import Visualize from "./components/pages/Visualize";
import Dataset from "./components/pages/Dataset";
import Helps from "./components/pages/Helps";
import AccountSettings from "./components/templates/AccountSettings";
import DataFlow from "./components/templates/DataFlow";

export const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<DataFlow />} />
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
