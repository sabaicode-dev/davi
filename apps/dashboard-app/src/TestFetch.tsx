import React, { useEffect } from 'react';
import request from "@/src/utils/helper";

const TestFetch: React.FC = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await request({ url: "country", method: "GET" });
        console.log("Data fetched:", data);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        console.log("Fetch attempt finished");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Display data or a loading spinner */}
    </div>
  );
};

export default TestFetch;
