import React, { createContext, useContext, useState, ReactNode } from "react";

interface DataFlowContextType {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  selectedSource: string | null;
  setSelectedSource: React.Dispatch<React.SetStateAction<string | null>>;
  projectId: string | null;
  setProjectId: React.Dispatch<React.SetStateAction<string | null>>;
}

const DataFlowContext = createContext<DataFlowContextType | undefined>(
  undefined
);

export const DataFlowProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [projectId, setProjectId] = useState<string | null>(null);

  return (
    <DataFlowContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        selectedSource,
        setSelectedSource,
        projectId,
        setProjectId,
      }}
    >
      {children}
    </DataFlowContext.Provider>
  );
};

export const useDataFlow = (): DataFlowContextType => {
  const context = useContext(DataFlowContext);
  if (!context) {
    throw new Error("useDataFlow must be used within a DataFlowProvider");
  }
  return context;
};
