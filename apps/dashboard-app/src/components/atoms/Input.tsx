import { FC } from "react";
import classNames from "classnames";
import { AIIcon } from "./icons/Icon";

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
  radius?: "none" | "sm" | "md" | "lg" | "2xl" | "full";
  labelPlacement?: "inside" | "outside" | "outside-left";
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isIconLeft?: boolean; // New prop for showing/hiding the icon
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
  isIconLeft = false, // Default value
  className = "",
  description = "",
  ...props
}) => {
  const baseStyles = "px-4 py-2 w-full outline-none";
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base py-2",
    lg: "text-lg",
  };
  const radiusClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    "2xl": "rounded-[10px]",
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
      <div className="flex justify-start items-center border-2 rounded-[10px]">
        {/* Conditionally render the AIIcon based on isIconLeft prop */}
        {isIconLeft && (
          <div className="pl-3">
            <AIIcon />
          </div>
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
            radiusClasses[radius],
            {
              "opacity-50 cursor-not-allowed": isDisabled,
              "bg-gray-100 cursor-not-allowed": isReadOnly,
            }
          )}
        />
      </div>
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
        type="text"
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
        isIconLeft={true} // Change this to true or false to test
        isRequired={false}
        className="max-w-full"
        // description="Please enter your fullname"
      />
    </div>
  );
}
