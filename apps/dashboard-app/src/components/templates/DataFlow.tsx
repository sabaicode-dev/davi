import React from "react";
import { GetStart } from "@/src/components/molecules/steps/GetStart";
import CreateProject from "@/src/components/molecules/steps/CreateProject";
import SelectProject from "@/src/components/molecules/steps/SelectProject";
import PickDataSource from "@/src/components/molecules/steps/PickDataSource";
import UploadCSV from "@/src/components/molecules/steps/UploadCSV";
import ImportUrl from "@/src/components/molecules/steps/ImportUrl";
import { useDataFlow } from "@/src/context/UIContext";
import { useAPI } from "@/src/context/APIContext";
import HomeProject from "../molecules/HomeProject";
const DataFlow: React.FC = () => {
  const {
    currentStep,
    setCurrentStep,
    selectedSource,
    setSelectedSource,
    projectId,
    setProjectId,
  } = useDataFlow();

  const handleNext = () => {
    console.log(`Navigating to step ${currentStep + 1}`);
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    console.log(`Navigating back to step ${currentStep - 1}`);
    setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleProjectSelect = (id: string) => {
    console.log(`Project selected: ${id}`);
    setProjectId(id);
    setCurrentStep(4); // Move to PickDataSource after project selection
  };

  const handleSelectSource = (source: string) => {
    console.log(`Source selected: ${source}`);
    setSelectedSource(source);
    setCurrentStep(source === "CSV" ? 5 : 6); // Go to appropriate step based on source
  };
  const { projects } = useAPI();
  const nextIfProject = () => {
    alert("Hello ");
  };
  return (
    <div>
      {currentStep === 1 && <GetStart onNext={handleNext} />}
      {projects.length !== 0 && currentStep === 1 && (
        <HomeProject onNext={nextIfProject} />
      )}
      {currentStep === 2 && (
        <CreateProject onNext={handleNext} onBack={handleBack} />
      )}
      {currentStep === 3 && (
        <SelectProject
          selectedSort={null}
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
export default DataFlow

