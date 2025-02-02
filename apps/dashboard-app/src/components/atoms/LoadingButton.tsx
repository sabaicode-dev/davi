import React from "react";

interface LoadingButtonProps {
  loading: boolean;
  label: string;
  loadingLabel?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  label,
  loadingLabel = "Loading...",
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`${
        loading
          ? "bg-blue-300 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      } text-white font-medium py-2 px-6 rounded-lg transition ${className}`}
    >
      {loading ? loadingLabel : label}
    </button>
  );
};

export default LoadingButton;
