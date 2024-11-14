import React, { useState } from "react";
import { GetStart } from "@/src/components/molecules/steps/GetStart";
import CreateProject from "@/src/components/molecules/steps/CreateProject";
import SelectProject from "@/src/components/molecules/steps/SelectProject";
import PickDataSource from "@/src/components/molecules/steps/PickDataSource";
import UploadCSV from "@/src/components/molecules/steps/UploadCSV";
import ImportUrl from "@/src/components/molecules/steps/ImportUrl";

const DataFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1); // Start at Step 1
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [projectId, setProjectId] = useState<string | null>(null);

  // Step change logic
  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  // Handle project selection
  const handleProjectSelect = (id: string) => {
    setProjectId(id);
    setCurrentStep(4); // Move to PickDataSource after project selection
  };
console.log(projectId)
  // Handle selecting a data source (CSV or URL)
  const handleSelectSource = (source: string) => {
    setSelectedSource(source);
    if (source === "CSV") {
      setCurrentStep(5); // Go to UploadCSV if CSV is selected
    } else if (source === "URL") {
      setCurrentStep(6); // Go to ImportUrl if URL is selected
    }
  };

  return (
    <div>
      {currentStep === 1 && <GetStart onNext={handleNext} />}
      {currentStep === 2 && (
        <CreateProject onNext={handleNext} onBack={handleBack} />
      )}
      {currentStep === 3 && (
        <SelectProject
          onSelectProject={handleProjectSelect}
          onBack={handleBack}
        />
      )}
      {currentStep === 4 && (
        <PickDataSource
          onSelectSource={handleSelectSource}
          onBack={handleBack}
          onNext={handleNext}
        />
      )}
      {currentStep === 5 && projectId && selectedSource === "CSV" && (
        <UploadCSV onBack={() => setCurrentStep(4)} projectId={projectId} />
      )}
      {currentStep === 6 && selectedSource === "URL" && (
        <ImportUrl
          onNext={handleNext}
          onBack={() => setCurrentStep(4)}
          selectedSource="URL"
        />
      )}
    </div>
  );
};

export default DataFlow;
