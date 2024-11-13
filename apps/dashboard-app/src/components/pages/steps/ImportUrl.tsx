// src/components/Step4.tsx
import React from "react";
import { useState } from "react";
import Logo from "@/public/images/step/step4_pic.png";
import Button from "../../atoms/Button";

interface Step4Props {
  onNext: () => void;
  onBack: () => void;
}

const Step4: React.FC<Step4Props> = ({ onNext, onBack }) => {
  const [url, setUrl] = useState(""); // State to manage the URL input
  const [error, setError] = useState(""); // State to manage the error message

  const handleNext = () => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/(www\\.)?|www\\.)[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}(:[0-9]{1,5})?(\\/.*)?$"
    );

    if (url.trim() === "") {
      setError("Please enter your URL.");
      return; // Prevent moving to the next step if URL is empty
    } else if (!urlPattern.test(url)) {
      setError("Please enter a valid URL.");
      return; // Prevent moving to the next step if URL is invalid
    }

    setError(""); // Clear error if URL is valid
    onNext(); // Proceed to the next step
  };

  return (
    <div className="mx-auto max-w-4xl bg-white p-10">
      <div className="flex w-full ">
        {/* Left Image Section */}
        <div className="flex-1 p-8">
          <img
            src={Logo} // Update this path to your image
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
              onClick={onBack}
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
              isLoading={false}
              isIconOnly={false}
              isDisabled={false}
            />
          </div>

          {/* Step indicator */}
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

export default Step4;
