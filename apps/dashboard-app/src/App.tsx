import Layout from "@/src/components/organisms/layout/MainLayout";
import "@/src/styles.css";
import CleaningPage from "./components/pages/CleaningPage";

// Test my UI_Chart

export const App = () => {
  return (
    <Layout>
      <div className="ml-[110px]">
        <CleaningPage />
      </div>
    </Layout>
  );
};

export default App;
