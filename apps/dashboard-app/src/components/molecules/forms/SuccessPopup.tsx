import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface SuccessPopupProps {
  message?: string;
  navigateTo: string;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ message, navigateTo }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(navigateTo);
    }, 800);

    return () => clearTimeout(timer);
  }, [navigate, navigateTo]);

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md transition-opacity duration-500">
      <div className="relative animate-popup-scale p-6 ">
        {/* Animated Check Circle */}
        <div className="flex items-center justify-center mb-4 relative">
          <svg
            className="h-20 w-20 text-green-500"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              className="animate-draw-circle"
            />
            <path
              d="M30 50 L45 65 L70 35"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              className="animate-draw-check"
            />
          </svg>
        </div>
        {/* Success Message */}
        <h2 className="flex justify-center text-xl font-semibold text-gray-900 mb-4 w-full animate-fade-in">
          Success
        </h2>
        <p className="text-center text-gray-700 mb-6 animate-fade-in">
          {message}
        </p>
      </div>
    </div>
  );
};

export default SuccessPopup;
