import Layout from "./layout/MainLayout";
import "./styles.css";
export const App = () => {
  return (
    <Layout>
      <div className="ml-[110px]">
        {/* Content goes here */}
        <h1 className="text-2xl font-bold">Welcome to my Team</h1>
      </div>
    </Layout>
  );
};

export default App;
