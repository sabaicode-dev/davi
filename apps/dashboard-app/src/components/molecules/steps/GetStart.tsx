import Logo from "@/public/images/step/step1_pic.png";
import Button from "@/src/components/atoms/Button";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export const GetStart = function () {
  const navigate = useNavigate();

  const goToCreateProject = () => {
    navigate("/project");
  };


  return (
    <div className="flex justify-center items-center">
      <div className="flex w-full max-w-4xl rounded-lg">
        {/* Left Image Section */}
        <div className="flex-1 p-8">
          <img
            src={Logo} // Update this path to your image
            alt="Welcome to DAVI"
            className="w-full h-auto"
          />
        </div>

        {/* Right Text Section */}
        <div className="flex-1 p-8 mt-24">
          <h1 className="text-2xl font-bold text-gray-800">Welcome to DAVI!</h1>
          <p className="text-gray-600 mt-2">
            Start Your First ETL Pipeline with DAVI
          </p>
          <p className="text-black mt-4">
            Let’s help you set up a new ETL pipeline to
            <br /> transform your data and extract valuable
            <br /> insights.
          </p>
          <div className="flex mt-10 mr-20">
            <Button
              className="ml-auto py-3 !px-4 flex flex-row"
              onClick={goToCreateProject}
              startContent={<FaPlus />}
              children="Start New Project"
              size="small"
              radius="2xl"
              color="secondary"
              isLoading={false}
              isIconOnly={false}
              isDisabled={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};