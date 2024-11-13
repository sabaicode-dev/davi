// src/components/DataFlow.tsx
import React, { useState } from "react";
import { Step1 } from "@/src/components/pages/steps/GetStart";
import Step2 from "@/src/components/pages/steps/CreateProject";
import Step3 from "@/src/components/pages/steps/PickDataSource";
import UploadCsv from "@/src/components/pages/steps/UploadCSV";
import Step4 from "@/src/components/pages/steps/ImportUrl";

const DataFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1); // Start at Step 1
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () =>
    setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));

  const handleSelectSource = (source: string) => {
    setSelectedSource(source);
    if (source === "CSV")
      setCurrentStep(4); // Go to UploadCsv if CSV is selected
    else if (source === "URL") setCurrentStep(5); // Go to Step4 if URL is selected
  };
  return (
    <div>
      {currentStep === 1 && <Step1 onNext={handleNext} />}
      {currentStep === 2 && <Step2 onNext={handleNext} onBack={handleBack} />}
      {currentStep === 3 && (
        <Step3
          onSelectSource={handleSelectSource}
          onBack={handleBack}
          onNext={handleNext}
        />
      )}
      {currentStep === 4 && selectedSource === "CSV" && (
        <UploadCsv onBack={() => setCurrentStep(3)} />
      )}
      {currentStep === 5 && selectedSource === "URL" && (
        <Step4
          onNext={handleNext}
          onBack={() => setCurrentStep(3)}
          selectedSource="URL"
        />
      )}
    </div>
  );
};

export default DataFlow;
