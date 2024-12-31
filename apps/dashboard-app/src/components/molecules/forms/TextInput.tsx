import React from "react";

interface TextInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: "text" | "email" | "password" | "number";
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder = "",
  required = false,
  type = "text",
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-4 text-gray-900 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default TextInput;
