// app/resource/components/Content.tsx
import Image from "next/image";
import a1 from "/public/images/resource/1.png";
import a2 from "/public/images/resource/2.png";
import a3 from "/public/images/resource/3.png";
import a4 from "/public/images/resource/4.png";
import a5 from "/public/images/resource/5.png";
import a6 from "/public/images/resource/6.png";
import a7 from "/public/images/resource/7.png";
import Upload from "/public/images/resource/Upload.png";
import Link from "/public/images/resource/ImportLink.png";
import Table from "/public/images/resource/Table.png";
import select from "/public/images/resource/select.png";
import save from "/public/images/resource/save.png";

interface ContentProps {
  section: string;
}

const Content: React.FC<ContentProps> = ({ section }) => {
  const renderContent = () => {
    switch (section) {
      case "learn-about-davi":
        return (
          <div>
            <h1 className="text-3xl font-bold mb-4">DAVI Documentation</h1>
            <p className="text-lg text-gray-700 mb-6">
              Explore our guides and application walkthroughs.
            </p>
            <p className="text-gray-600 mb-8">
              Welcome to the DAVI user documentation portal. These guides will
              walk you through every step of the ETL process, from data import
              to analysis and visualization. If you have any questions or need
              assistance, please reach out to us via chat or by emailing
              support@davi.com.
            </p>

            <div className="mb-12">
              <h2 className="text-xl font-bold mb-4">
                Get Started with Your Data Journey in Just a Few Clicks
              </h2>
              <p className="text-gray-700 mb-8">
                Once logged in, users can click on {`"Start New Project"`} to begin
                their data integration and analysis journey.
              </p>
              <div className="w-full md:w-[80%] mx-auto md:mx-0 mt-4 border-black shadow-md rounded-md">
                <Image src={a1} alt="Data Solutions Illustration" />
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-xl font-bold mb-2">Define Your Project</h2>
              <p className="text-gray-700 mb-8">
                In this step, provide a unique project name and a brief
                description. This information will help you easily identify and
                organize your project within DAVI, making it easier to access,
                analyze, and visualize your data efficiently. Once completed,
                click {`"Next"`} to proceed to the data integration setup.
              </p>
              <div className="w-full md:w-[80%] mx-auto md:mx-0 mt-4 border-black shadow-md rounded-md">
                <Image src={a2} alt="Data Solutions Illustration" />
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-xl font-bold mb-2">
                Choose the Data Source to Begin Your Project
              </h2>
              <p className="text-gray-700 mb-8">
                Pick the data source you want to use for this project. DAVI
                supports multiple sources, including file uploads, web scraping,
                and databases like MySQL and MongoDB. Select your preferred
                source to start the data integration process. Once chosen,
                you’ll be guided to the next step for connecting and importing
                your data.
              </p>
              <div className="w-full md:w-[80%] mx-auto md:mx-0 mt-4 border-black shadow-md rounded-md">
                <Image src={a3} alt="Data Solutions Illustration" />
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-xl font-bold mb-2">
                Review and Prepare Your Data for Analysis
              </h2>
              <p className="text-gray-700 mb-8">
                After fetching your data, this screen displays all rows and
                columns for review. To streamline your data, click on
                {` "Transform"`} to check for any empty rows or columns. Use the
                {` "Auto Cleaning"`} feature to automatically clean up missing or
                inconsistent data, ensuring your dataset is ready for accurate
                analysis and visualization. Once cleaned, proceed to the next
                step.
              </p>
              <div className="w-full md:w-[80%] mx-auto md:mx-0 mt-4 border-black shadow-md rounded-md">
                <Image src={a4} alt="Data Solutions Illustration" />
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-xl font-bold mb-2">
                Data Analysis Overview: Easily Explore and Understand Your Data
              </h2>
              <p className="text-gray-700 mb-8">
                This view presents a visual analysis of each data column,
                providing insights at a glance. Each column is represented by a
                chart that displays key metrics and distributions, helping users
                quickly assess data patterns. For a detailed view, click on any
                column’s chart to reveal specific statistics and breakdowns on
                the right sidebar, including data counts, empty values, and
                unique entries. This feature enhances your understanding of the
                data, making it easier to identify trends and areas that may
                need further attention.
              </p>
              <div className="w-full md:w-[80%] mx-auto md:mx-0 mt-4 border-black shadow-md rounded-md">
                <Image src={a5} alt="Data Solutions Illustration" />
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-xl font-bold mb-2">
                Visualization Suggestions: Choose the Best Chart for Your Data
              </h2>
              <p className="text-gray-700 mb-8">
                After selecting the data fields for visualization, click
                {` "Visualize"`} to see chart recommendations tailored to your data.
                DAVI analyzes the data structure and suggests the most suitable
                chart types, such as Pie, Bar, or Line charts, to help present
                your insights effectively. Select your preferred chart type from
                the recommendations to generate an intuitive visual
                representation of your data in the {`"Visualize Overview"`} section.
              </p>
              <div className="w-full md:w-[80%] mx-auto md:mx-0 mt-4 border-black shadow-md rounded-md">
                <Image src={a6} alt="Data Solutions Illustration" />
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-xl font-bold mb-2">
                Save and Showcase Your Visualizations
              </h2>
              <p className="text-gray-700 mb-8">
                After selecting and customizing your visualizations, save them
                for quick access and demonstration. Each visualization is added
                to the {`"Visualization Cart"`}, providing a collection of full-data
                visualizations that represent your insights comprehensively.
                This feature allows you to revisit, share, or present your data
                effectively, making it easy to demonstrate complete datasets
                through clear, organized visuals.
              </p>
              <div className="w-full md:w-[80%] mx-auto md:mx-0 mt-4 border-black shadow-md rounded-md">
                <Image src={a7} alt="Data Solutions Illustration" />
              </div>
            </div>
          </div>
        );

      case "upload-file":
        return (
          <div>
            <h1 className="text-3xl font-bold mb-4">Upload File</h1>
            <p className="text-gray-600 mb-6 leading-relaxed">
              How to Import Data Files into DAVI
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              The DAVI {`"Upload File"`} feature streamlines bringing data from your
              files for further processing and analysis. From data import to
              analysis and visualization, follow these steps to ensure your data
              is correctly uploaded.
            </p>

            {/* Overview Section */}
            <h2 className="text-2xl font-semibold mb-3">Overview</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              The file types that DAVI currently supports are:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6 leading-relaxed">
              <li>
                Import from file formats, such as CSV or Excel, directly into
                DAVI.
              </li>
              <li>
                Supports XLSX, CSV, JSON, and other popular formats for seamless
                data visualization.
              </li>
              <li>
                Helps integrate data from various sources to prepare it for
                analysis or visualization.
              </li>
            </ul>
            <div className="border-l-4 border-blue-600 pl-4 text-gray-600 mb-8 leading-relaxed">{`Note: Ensure your file format is compatible with DAVI's supported
              file types (e.g., CSV, Excel). Large files may take longer to
              process, so check the platform's file size limits if you encounter
              issues.`}
              
            </div>

            {/* Start a New Project Section */}
            <h2 className="text-2xl font-semibold mb-6">Start a New Project</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              To begin, navigate to the Project section and select {`"Start New Project"`}. This will guide you into the data import selection
              process.
            </p>
            <div className="w-full md:w-[80%] mx-auto md:mx-0 mt-4 border-black shadow-md rounded-md">
              <Image src={a1} alt="Data Solutions Illustration" />
            </div>

            {/* Pick Data Source Section */}
            <h2 className="text-2xl font-semibold my-6">Pick a Data Source</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Pick the data source you want to use for this project. Select the
              file upload data from your local device. DAVI also supports direct
              uploads from various sources such as databases and web scraping
              tools.
            </p>
            <div className="w-full md:w-[80%] mx-auto md:mx-0 mt-4 border-black shadow-md rounded-md">
              <Image src={a3} alt="Data Solutions Illustration" />
            </div>

            {/* Select and Confirm File Upload Section */}
            <h2 className="text-2xl font-semibold my-6">
              Select and Confirm File Upload
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              In this section, either drag and drop your file directly or click
              to find the desired file on your local storage. Supported file
              formats will automatically validate and prepare for data
              processing.
            </p>
            <div className="w-full md:w-[80%] mx-auto md:mx-0 mt-4 border-black shadow-md rounded-md">
              <Image src={Upload} alt="Data Solutions Illustration" />
            </div>
          </div>
        );

      case "scraping":
        return (
          <div>
            <h1 className="text-3xl font-bold mb-4">Web Scraping Data</h1>
            <p className="text-gray-600 mb-6 leading-relaxed">
              How to Select and Configure Web Scraping in DAVI
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              DAVI provides an option to directly scrape data from websites as a
              data source. This guide will walk you through selecting web
              scraping as your data source and configuring the necessary
              settings to import data from the web.
            </p>

            {/* Overview Section */}
            <h2 className="text-2xl font-semibold mb-3">Overview</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              The Web Scraping feature in DAVI allows you to:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6 leading-relaxed">
              <li>Extract data directly from online sources.</li>
              <li>
                Bring web data into DAVI for further cleaning, analysis, and
                visualization.
              </li>
            </ul>
            <div className="border-l-4 border-blue-600 pl-4 text-gray-600 mb-8 leading-relaxed">
              Note: Ensure that the website you are scraping allows data
              extraction. Some websites may have restrictions or require API
              access.
            </div>

            {/* Start a New Project Section */}
            <h2 className="text-2xl font-semibold mb-6"> Pick Data Source</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              To begin, navigate to the Project section and select Start New
              Project. On the data source selection screen, choose {`"From Web"`} as
              your data source. Click on {`"From Web"`} to proceed to the scraping
              configuration screen.
            </p>
            <div className="w-full md:w-[80%] mx-auto md:mx-0 mt-4 border-black shadow-md rounded-md">
              <Image src={a3} alt="Data Solutions Illustration" />
            </div>

            {/* Pick Data Source Section */}
            <h2 className="text-2xl font-semibold my-6">
              Configure Web Scraping
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Enter the URL of the website you want to scrape data from.
            </p>
            <div className="w-full md:w-[80%] mx-auto md:mx-0 mt-4 border-black shadow-md rounded-md">
              <Image src={Link} alt="Data Solutions Illustration" />
            </div>

            {/* Select and Confirm File Upload Section */}
            <h2 className="text-2xl font-semibold my-6">
              Select and Confirm File Upload
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              In this section, either drag and drop your file directly or click
              to find the desired file on your local storage. Supported file
              formats will automatically validate and prepare for data
              processing.
            </p>
            <div className="w-full md:w-[80%] mx-auto md:mx-0 mt-4 border-black shadow-md rounded-md">
              <Image src={Table} alt="Data Solutions Illustration" />
            </div>
          </div>
        );

      case "data-cleaning":
        return (
          <div>
            <h1 className="text-3xl font-bold mb-4">Data Cleaning</h1>
            <p className="text-gray-600 mb-6">
              Clean and transform your data for analysis. DAVI provides tools to
              handle missing values, remove duplicates, and standardize formats.
            </p>
            <Image
              src="/images/data-cleaning.png"
              alt="Data Cleaning"
              className="mb-8 rounded-lg shadow-md"
            />
          </div>
        );

      case "analysis":
        return (
          <div>
            <h1 className="text-3xl font-bold mb-4">Data Analysis</h1>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Quickly Gain Insights from Your Data
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              The Data Analysis feature in DAVI helps users understand key
              patterns, trends, and distributions within their dataset by
              providing visual summaries of each column. This enables quick
              insights without needing extensive data manipulation.
            </p>

            {/* Key Analysis Features Section */}
            <h2 className="text-2xl font-semibold mb-3">
              Key Analysis Features
            </h2>

            {/* Column Charts */}
            <h3 className="text-xl font-semibold mb-2">Column Charts</h3>
            <ul className="list-disc list-inside text-gray-600 mb-6 leading-relaxed">
              <li>Improve data quality and accuracy.</li>
              <li>Improve the reliability of your analysis.</li>
              <li>
                Enhance data visualization by providing consistent,
                well-organized formats.
              </li>
            </ul>

            {/* Data Summaries */}
            <h3 className="text-xl font-semibold mb-2">Data Summaries</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Features: Provides basic statistics like counts, unique values,
              and missing values.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Use Case: Understand the spread and identify outliers in data
              fields for immediate analysis.
            </p>

            {/* Interactive Filters */}
            <h3 className="text-xl font-semibold mb-2">Interactive Filters</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Purpose: Interact with the data displayed by applying quick
              filters.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Use Case: Filter by specific values or ranges directly from the
              analysis to derive focused data insights.
            </p>

            {/* Detailed Sidebar for Data */}
            <h3 className="text-xl font-semibold mb-2">
              Detailed Sidebar for Data
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Function: Clicking on each column opens a sidebar with specific
              details about that data, such as the number of unique entries,
              empty fields, and overall data statistics.
            </p>

            {/* Example Image */}
            <div className="w-full md:w-[80%] mx-auto md:mx-0 mt-4 border-black shadow-md rounded-md">
              <Image src={a2} alt="Data Analysis Illustration" />
            </div>
          </div>
        );

      case "cleaning":
        return (
          <div>
            <h1 className="text-3xl font-bold mb-4">Data Cleaning</h1>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Prepare Your Data for Analysis and Visualization
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Data cleaning is a crucial step in the ETL process, ensuring that
              your data is accurate, consistent, and ready for meaningful
              analysis. The DAVI Data Cleaning feature provides tools to help
              you remove errors, handle missing values, and standardize data
              formats, making it easier to derive insights and create
              visualizations.
            </p>

            {/* Why Data Cleaning Matters Section */}
            <h2 className="text-2xl font-semibold mb-3">
              Why Data Cleaning Matters
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Before analysis, raw data often contains inconsistencies,
              duplicates, or missing entries that can skew results or lead to
              inaccurate insights. Data cleaning helps to:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6 leading-relaxed">
              <li>Improve data quality and accuracy.</li>
              <li>Enhance the reliability of your analysis.</li>
              <li>
                Simplify data visualization by providing consistent,
                well-organized datasets.
              </li>
            </ul>

            {/* Tips for Effective Data Cleaning Section */}
            <h2 className="text-2xl font-semibold mb-3">
              Tips for Effective Data Cleaning
            </h2>
            <ul className="list-disc list-inside text-gray-600 mb-6 leading-relaxed">
              <li>
                <strong>Check for Consistency:</strong> Ensure that all columns
                follow a consistent format, especially for date and numerical
                data.
              </li>
              <li>
                <strong>Handle Missing Data Appropriately:</strong> Only remove
                rows with missing data if it won’t impact your analysis.
                Otherwise, consider filling in default values.
              </li>
              <li>
                <strong>Save Frequently:</strong> Regularly save your cleaned
                data to prevent losing progress during the cleaning process.
              </li>
            </ul>

            {/* Example Image */}
            <div className="w-full md:w-[80%] mx-auto md:mx-0 mt-4 border-black shadow-md rounded-md">
              <Image src={a4} alt="Data Cleaning Illustration" />
            </div>
          </div>
        );

      case "visualize":
        return (
          <div>
            <h1 className="text-3xl font-bold mb-4">Visualization</h1>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Turn Data into Insightful Visuals for Better Decision-Making
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              The Data Visualization feature in DAVI allows users to convert complex datasets into clear and informative visuals. By transforming raw data into charts, graphs, and other visual formats, users can easily detect patterns, trends, and correlations to support decision-making.
            </p>
      
            {/* Core Features of Data Visualization in DAVI Section */}
            <h2 className="text-2xl font-semibold mb-3">Core Features of Data Visualization in DAVI</h2>
            
            {/* Recommended Charts */}
            <h3 className="text-xl font-semibold mb-2">Recommended Charts</h3>
            <ul className="list-disc list-inside text-gray-600 mb-6 leading-relaxed">
              <li>Automatically recommends visual charts that are based on the dataset.</li>
              <li>Helps users find the best visualization for their data quickly and easily.</li>
              <li>Supports different chart types, including line charts, bar charts, pie charts, and more.</li>
            </ul>
            <div className="w-full md:w-[80%] mx-auto md:mx-0 mt-4 border-black shadow-md rounded-md">
              <Image src={select} alt="Recommended Charts Illustration" />
            </div>
      
            {/* Interactive Dashboards */}
            <h3 className="text-xl font-semibold mb-2 mt-6">Interactive Dashboards</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Provides customizable and interactive visualizations in a single dashboard, allowing users to explore their data from various perspectives and make data-driven decisions efficiently.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Use Case: Generate dashboards that display critical metrics and key performance indicators (KPIs) for easy monitoring.
            </p>
            <div className="w-full md:w-[80%] mx-auto md:mx-0 mt-4 border-black shadow-md rounded-md">
              <Image src={a7} alt="Interactive Dashboards Illustration" />
            </div>
      
            {/* Save and Export Visualizations */}
            <h3 className="text-xl font-semibold mb-2 mt-6">Save and Export Visualizations</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Users can save or export visualizations as static files (like PDF or images) for presentations, reports, or further analysis.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Use Case: Exporting charts for reports and presentations, making data easily shareable.
            </p>
            <div className="w-full md:w-[80%] mx-auto md:mx-0 mt-4 border-black shadow-md rounded-md">
              <Image src={save} alt="Save and Export Visualization Illustration" />
            </div>
          </div>
        );
    }
  };

  return <div>{renderContent()}</div>;
};

export default Content;
