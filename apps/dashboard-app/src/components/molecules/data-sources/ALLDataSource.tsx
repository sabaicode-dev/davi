import React from "react";
import DataSourceCard from "./DataSourceCard";
import SQLServerImage from "@/public/images/sql_server.png";
import MongoImage from "@/public/images/step/MongoDB_logo.png";
import PosgresSQLImage from "@/public/images/my-svg/postgresql-icon.svg";
import MariaDBImage from "@/public/images/my-svg/mariadb.svg";
import MySqlImage from "@/public/images/my-svg/mysql-official.svg";
import CSV from "@/public/images/step/CSV_logo.png";
import URL from "@/public/images/step/URL_logo.png";

// usage for CSV
export const SourceCSV: React.FC<{ projectId?: string | null }> = ({
  projectId,
}) => (
  <DataSourceCard
    title="Upload File"
    imageSrc={CSV}
    bgColor="bg-blue-100"
    hoverColor="hover:bg-orange-200"
    navigatePath="/project/pick-datasource/upload-csv"
    projectId={projectId}
    type="csv"
  />
);

// usage for Web
export const SourceWeb: React.FC<{ projectId?: string | null }> = ({
  projectId,
}) => (
  <DataSourceCard
    title="From Web"
    imageSrc={URL}
    bgColor="bg-gray-100"
    hoverColor="hover:bg-cyan-200"
    navigatePath="/project/pick-datasource/import"
    projectId={projectId}
    type="query"
  />
);

// usage for MySQL
export const SourceMySQL: React.FC<{ projectId?: string | null }> = ({
  projectId,
}) => (
  <DataSourceCard
    title="MySQL"
    imageSrc={MySqlImage}
    bgColor="bg-blue-100"
    hoverColor="hover:bg-green-200"
    navigatePath="/project/pick-datasource/MySQL_Connection"
    projectId={projectId}
    type="query"
  />
);

// usage for MongoDB
export const SourceMongoDB: React.FC<{ projectId?: string | null }> = ({
  projectId,
}) => (
  <DataSourceCard
    title="MongoDB"
    imageSrc={MongoImage}
    bgColor="bg-gray-100"
    hoverColor="hover:bg-yellow-200"
    navigatePath="/project/pick-datasource/mongoDB_Connection"
    projectId={projectId}
    type="query"
  />
);

// usage for SQL Server
export const SourceSQLServer: React.FC<{ projectId?: string | null }> = ({
  projectId,
}) => (
  <DataSourceCard
    title="SQL Server"
    imageSrc={SQLServerImage}
    bgColor="bg-blue-100"
    hoverColor="hover:bg-purple-200"
    navigatePath="/project/pick-datasource/SQLServer_Connection"
    projectId={projectId}
    type="sql"
  />
);

// usage for PosgresSQL
export const SourcePosgresSQL: React.FC<{ projectId?: string | null }> = ({
  projectId,
}) => (
  <DataSourceCard
    title="PosgresSQL"
    imageSrc={PosgresSQLImage}
    bgColor="bg-gray-100"
    hoverColor="hover:bg-light-blue-200"
    navigatePath="/project/pick-datasource/PosgresSQL_connection"
    projectId={projectId}
    type="sql"
  />
);

// usage for MariaDB
export const SourceMariaDB: React.FC<{ projectId?: string | null }> = ({
  projectId,
}) => (
  <DataSourceCard
    title="MariaDB"
    imageSrc={MariaDBImage}
    bgColor="bg-blue-100"
    hoverColor="hover:bg-pink-200"
    navigatePath="/project/pick-datasource/MariaDB_connection"
    projectId={projectId}
    type="sql"
  />
);
