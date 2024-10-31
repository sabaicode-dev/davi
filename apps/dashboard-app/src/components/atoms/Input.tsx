import React, { FC } from "react";
import classNames from "classnames";

export interface InputProps {
  type?: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  size?: "sm" | "md" | "lg";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  variant?: "flat" | "bordered" | "underlined" | "faded";
  radius?: "none" | "sm" | "md" | "lg"|"2xl" | "full";
  labelPlacement?: "inside" | "outside" | "outside-left";
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  className?: string;
  description?: string;
}

const Input: FC<InputProps> = ({
  type = "text",
  label,
  placeholder = "",
  defaultValue = "",
  size = "md",
  color = "default",
  variant = "flat",
  radius = "md",
  labelPlacement = "outside",
  isDisabled = false,
  isReadOnly = false,
  isRequired = false,
  className = "",
  description = "",
  ...props
}) => {
  const baseStyles = "px-4 py-3 w-full outline-none";
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };
  const colorClasses = {
    default: "text-black border-gray-300",
    primary: "text-blue-500 border-blue-500",
    secondary: "text-gray-500 border-gray-500",
    success: "text-green-500 border-green-500",
    warning: "text-yellow-500 border-yellow-500",
    danger: "text-red-500 border-red-500",
  };
  const variantClasses = {
    flat: "bg-white",
    bordered: "border",
    underlined: "border-b",
    faded: "bg-gray-100",
  };
  const radiusClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    "2xl": "rounded-[14px]",
    full: "rounded-full",
  };

  const labelInside = labelPlacement === "inside";
  const labelOutsideLeft = labelPlacement === "outside-left";

  return (
    <div
      className={classNames(
        "flex",
        { "flex-col": !labelOutsideLeft, "flex-row": labelOutsideLeft },
        className
      )}
    >
      {label && labelPlacement !== "inside" && (
        <label
          className={classNames(
            "mb-1",
            { "mr-2": labelOutsideLeft },
            {
              "text-sm": size === "sm",
              "text-base": size === "md",
              "text-lg": size === "lg",
            }
          )}
          {...props}
        >
          {label}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={labelInside ? label : placeholder}
        defaultValue={defaultValue}
        disabled={isDisabled}
        readOnly={isReadOnly}
        required={isRequired}
        className={classNames(
          baseStyles,
          sizeClasses[size],
          colorClasses[color],
          variantClasses[variant],
          radiusClasses[radius],
          {
            "opacity-50 cursor-not-allowed": isDisabled,
            "bg-gray-100 cursor-not-allowed": isReadOnly,
          }
        )}
      />
      {label && labelInside && (
        <label
          className={classNames(
            "absolute inset-y-0 left-4 flex items-center pointer-events-none",
            {
              "text-sm": size === "sm",
              "text-base": size === "md",
              "text-lg": size === "lg",
            }
          )}
        >
          {label}
        </label>
      )}
      {description && (
        <span className="mt-1 text-xs text-gray-500">{description}</span>
      )}
    </div>
  );
};

export default Input;

export function InputTest() {
  return (
    <div className="flex flex-col mx-32">
      <Input
        type="text-area"
        label="Full name"
        placeholder="Enter full name..."
        defaultValue=""
        size="md"
        color="primary"
        variant="bordered"
        radius="md"
        labelPlacement="outside"
        isDisabled={false}
        isReadOnly={false}
        isRequired={false}
        className="max-w-full"
        // description="Please enter your fullname"
      />
    </div>
  );
}