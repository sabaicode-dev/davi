import React from "react";

const InfoMessage = () => {
  return (
    <div
      className="font-[sans-serif] bg-blue-100 text-blue-800 0 p-4 rounded-lg relative"
      role="alert"
    >
      <strong className="font-bold text-sm">Info!</strong>
      <span className="block text-sm sm:inline max-sm:mt-2 max-sm:ml-0 ml-4 mr-8">
        This is a info message that requires your attention.
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 hover:bg-blue-200 rounded-lg transition-all p-2 cursor-pointer fill-blue-500 absolute right-4 top-1/2 -translate-y-1/2"
        viewBox="0 0 320.591 320.591"
      >
        <path
          d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
          data-original="#000000"
        />
        <path
          d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
          data-original="#000000"
        />
      </svg>
    </div>
  );
};

export default InfoMessage;
