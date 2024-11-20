import React, { useState } from "react";
import Logo from "@/public/images/step/step4_pic.png";
import Button from "../../atoms/Button";
import request from "@/src/utils/helper";

interface Step4Props {
  selectedSource?: string;
}

const ImportUrl: React.FC<Step4Props> = () => {
  const [url, setUrl] = useState(""); 
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [scrapedData, setScrapedData] = useState<any>(null);
  const handleNext = async () => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/(www\\.)?|www\\.)[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}(:[0-9]{1,5})?(\\/.*)?$"
    );

    if (url.trim() === "") {
      setError("Please enter your URL.");
      return;
    } else if (!urlPattern.test(url)) {
      setError("Please enter a valid URL.");
      return;
    }

    setError(""); 
    setIsLoading(true);

    try {
      const response = await request({
        url: "http://127.0.0.1:8000/api/v1/scrape/url/",
        method: "POST",
        data: { url },
      });

      if (response.success) {
        setScrapedData(response.data);
        console.log("Scraped Data:", response.data);
      } else {
        setError(response.message || "Failed to scrape the URL.");
      }
    } catch (err) {
      console.error("Error during scraping:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="mx-auto max-w-4xl bg-white p-10">
      <div className="flex w-full ">
        {/* Left Image Section */}
        <div className="flex-1 p-8">
          <img
            src={Logo}
            alt="Data Scraping Tool"
            className="w-full h-auto"
          />
        </div>

        {/* Right Form Section */}
        <div className="flex-1 p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-black mb-2">
              Import Link & Data Scraping Tool
            </h2>

            <p className="text-sm text-gray-600 mb-6">
              Easily import links to automatically extract and display relevant
              data.
            </p>

            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="shareLink"
              >
                Share link
              </label>
              <input
                type="url"
                id="shareLink"
                placeholder="www.example.com/product"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {error && <p className="text-red-600 text-sm mt-1">{error}</p>}{" "}
              {/* Display error message */}
            </div>
          </div>

          {/* Button Section */}
          <div className="flex justify-end space-x-3">
            <Button
              // onClick={onBack} // Optional back handler
              children="Back"
              size="medium"
              radius="2xl"
              color="outline"
              isLoading={false}
              isIconOnly={false}
              isDisabled={false}
            />

            <Button
              onClick={handleNext}
              children="Next"
              size="small"
              radius="2xl"
              color="secondary"
              isLoading={isLoading}
              isIconOnly={false}
              isDisabled={isLoading}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-12">
        <div className="h-1 w-8 bg-blue-600 rounded-full mx-1"></div>
        <div className="h-1 w-8 bg-blue-600 rounded-full mx-1"></div>
        <div className="h-1 w-8 bg-blue-600 rounded-full mx-1"></div>
      </div>
    </div>
  );
};

export default ImportUrl;
