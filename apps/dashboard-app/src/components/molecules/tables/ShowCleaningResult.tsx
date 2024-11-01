import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Table from "./Table";
import CategoryMock from "../charts/Mock/CatagoryMock";

const ShowCleaningResult: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const headers = useMemo(
    () => [
      { label: "Country Name", key: "country" },
      { label: "Population", key: "population" },
      { label: "Yearly Change", key: "yearlyChange" },
      { label: "Net Change", key: "netChange" },
      { label: "Density", key: "density" },
    ],
    []
  );

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/country");
      setData(response.data);
      console.log(response.data);
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
      console.log(`Hello`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Table
        headers={headers}
        editable={false}
        data={data}
        showCheckbox={true}  
        showIndex={true}
        selectableColumns={"all"}
        firstRowHasChildren={true}
        childrenContent={<CategoryMock/>}
      />
    </div>
  );
};

export default ShowCleaningResult;
