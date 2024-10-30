import { TableHeader, TableRowData } from "@/src/data/types/table.type";

export const tableHeaders: TableHeader[] = [
  { label: "Country (or Dependency)", key: "country" },
  { label: "Population (2020)", key: "population" },
  { label: "Yearly Change", key: "yearlyChange" },
  { label: "Net Change", key: "netChange" },
  { label: "Density (P/Km²)", key: "density" },
];

export const initialData: TableRowData[] = [
  {
    country: "China",
    population: 1439323776,
    yearlyChange: "0.39%",
    netChange: 5540090,
    density: 153,
  },
  {
    country: "India",
    population: 1380004385,
    yearlyChange: "0.99%",
    netChange: 13586631,
    density: 464,
  },
  {
    country: "United States",
    population: 331002651,
    yearlyChange: "0.59%",
    netChange: 1937734,
    density: 36,
  },
  {
    country: "Indonesia",
    population: 273523615,
    yearlyChange: "1.07%",
    netChange: 2898047,
    density: 151,
  },
  {
    country: "Pakistan",
    population: 220892340,
    yearlyChange: "2.00%",
    netChange: 4327022,
    density: 287,
  }, {
    country: "China",
    population: 1439323776,
    yearlyChange: "0.39%",
    netChange: 5540090,
    density: 153,
  },
  {
    country: "India",
    population: 1380004385,
    yearlyChange: "0.99%",
    netChange: 13586631,
    density: 464,
  },
  {
    country: "United States",
    population: 331002651,
    yearlyChange: "0.59%",
    netChange: 1937734,
    density: 36,
  },
  {
    country: "Indonesia",
    population: 273523615,
    yearlyChange: "1.07%",
    netChange: 2898047,
    density: 151,
  },
  {
    country: "Pakistan",
    population: 220892340,
    yearlyChange: "2.00%",
    netChange: 4327022,
    density: 287,
  },
];
