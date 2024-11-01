import Logo from "@/public/images/step/step1_pic.png";

interface StepProps {
  onNext: () => void;
}

export const Step1 = function ({ onNext }: StepProps) {
  return (
    <div className="flex justify-center items-center ">
      <div className="flex w-full max-w-4xl  rounded-lg">
        {/* Left Image Section */}
        <div className="flex-1 p-8">
          <img
            src={Logo} // Update this path to your image
            alt="Welcome to DAVI"
            className="w-full h-auto"
          />
        </div>

        {/* Right Text Sectionn */}
        <div className="flex-1 p-8 mt-24">
          <h1 className="text-2xl font-bold text-gray-800">Welcome to DAVI!</h1>
          <p className="text-gray-600 mt-2">
            Start Your First ETL Pipeline with DAVI
          </p>
          <p className="text-gray-500 mt-4">
            Let’s help you set up a new ETL pipeline to transform your data and
            extract valuable insights.
          </p>
          <button
            onClick={onNext}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
          >
            + Start New Project
          </button>
        </div>
      </div>
    </div>
  );
};
