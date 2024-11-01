// src/App.tsx
import React, { useState } from "react";
import { Step1 } from "./steps/Step1";
import  Step2  from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
// interface StepProps {
//   onNext?: () => void;
//   onBack: () => void;
//   onSelectSource: (source: string) => void;
// }

const Project: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedSource, setSelectedSource] = useState("");

  const handleNextStep = () => setStep((prev) => prev + 1);
  const handleBackStep = () => setStep((prev) => prev - 1);

  const handleSelectSource = (source: string) => {
    setSelectedSource(source);
    handleNextStep(); // Move to Step 4 after selecting a source
  };

  return (
    <div>
      {step === 1 && <Step1 onNext={handleNextStep} />}
      {step === 2 && <Step2 onNext={handleNextStep} onBack={handleBackStep} />}
      {step === 3 && (
        <Step3
          onNext={handleNextStep}
          onBack={handleBackStep}
          onSelectSource={handleSelectSource}
        />
      )}
      {step === 4 && (
        <Step4
          onNext={handleNextStep}
          onBack={handleBackStep}
          selectedSource={selectedSource}
        />
      )}
    </div>
  );
};

export default Project;
