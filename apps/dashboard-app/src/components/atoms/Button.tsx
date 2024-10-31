import classNames from "classnames";
import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium" | "large";
  radius?:
    | "small"
    | "medium"
    | "large"
    | "xl"
    | "2xl"
    | "3xl"
    | "full"
    | "none";
  color?: "primary" | "secondary" | "danger" | "outline";
  isLoading?: boolean;
  isDisabled?: boolean;
  isIconOnly?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  size = "medium",
  radius = "none",
  color = "default",
  isLoading = false,
  isDisabled = false,
  isIconOnly = false,
  startContent,
  endContent,
  className,
  children,
  onClick,
  ...props
}) => {
  const baseStyles =
    "bg-blue-500 inline-flex items-center justify-center font-medium transition-colors duration-200  px-8 py-2";

  const sizeStyles = {
    small: "px-4 py-1 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-12 py-3 text-lg",
  }[size];
  const radiusStyles = {
    small: "rounded-sm",
    medium: "rounded-md",
    large: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-[14px]",
    "3xl": "rounded-3xl",
    full: "rounded-full",
    none: "rounded-none",
  }[radius];
  const colorStyles = {
    primary: "bg-gray-500 text-white border-gray-300 hover:bg-gray-600", // gray
    danger: "bg-red-500 text-white border-blue-500 hover:bg-red-600", // red
    secondary: "bg-blue-500 text-white border-2 border-blue-500 hover:bg-blue-600 hover:border-blue-600", // blue
    outline:
      "bg-white text-black border-gray-500 border-2 border-gray-500 hover:bg-gray-100", // outline
  }[color];

  const loadingSpinner = (
    <svg
      className="animate-spin h-5 w-5 text-current"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        fill="currentColor"
      />
    </svg>
  );
  return (
    <button
      className={classNames(
        baseStyles,
        sizeStyles,
        radiusStyles,
        colorStyles,
        (isLoading || isDisabled) && "opacity-50 cursor-not-allowed",
        isIconOnly && "p-2",
        className
      )}
      disabled={isDisabled || isLoading}
      onClick={!isLoading && !isDisabled ? onClick : undefined}
    >
      {isLoading && (
        <span className={children ? `mr-2` : ""}>{loadingSpinner}</span>
      )}
      {isIconOnly ? (
        startContent || endContent
      ) : (
        <>
          {startContent && <span className="mr-2">{startContent}</span>}
          {children}
          {endContent && <span className="ml-2">{endContent}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
