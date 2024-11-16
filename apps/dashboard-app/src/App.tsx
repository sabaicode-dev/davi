import React from "react";
import Layout from "@/src/components/organisms/layout/MainLayout";
import "@/src/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Visualize from "@/src/components/pages/Visualize";
import Dataset from "@/src/components/pages/Dataset";
import Helps from "@/src/components/pages/Helps";
import AccountSettings from "@/src/components/templates/AccountSettings";
import Project from "@/src/components/pages/Project";
import { APIProvider } from "./context/APIContext";
import { DataFlowProvider } from "@/src/context/UIContext"; // Import DataFlowProvider

export const App = () => {
  return (
    <BrowserRouter>
      <APIProvider>
        <DataFlowProvider>
          {/* Wrapping Layout and Routes with DataFlowProvider */}
          <Layout>
            <Routes>
              <Route path="/" element={<Project />} />
              <Route path="/visualize" element={<Visualize />} />
              <Route path="/dataset" element={<Dataset />} />
              <Route path="/helps" element={<Helps />} />
              <Route path="/accountsetting" element={<AccountSettings />} />
            </Routes>
          </Layout>
        </DataFlowProvider>
      </APIProvider>
    </BrowserRouter>
  );
};

export default App;
