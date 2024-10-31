import TableTest from "@/src/components/atoms/TableTest";
import Layout from "@/src/components/organisms/layout/MainLayout";
import "@/src/styles.css";
import Button from "./components/atoms/Button";
import { InputTest } from "./components/atoms/Input";
import {
  BrowserRouter as Router,
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import Visualize from "./components/pages/Visualize";
import Dataset from "./components/pages/Dataset";
import Project from "./components/pages/Project";
import Helps from "./components/pages/Helps";

export const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Project />} />
          <Route path="/visualize" element={<Visualize />} />
          <Route path="/dataset" element={<Dataset />} />
          <Route path="/helps" element={<Helps />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
export default App;
