import { useState } from "react";

function ToggleButton({ func, isChecked }) {
  const handleToggle = () => {
    func(!isChecked);
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="form-checkbox h-6 w-12 transition duration-200 ease-in-out rounded-full bg-gray-400 focus:outline-none focus:shadow-outline-blue"
          checked={isChecked}
          onChange={handleToggle}
        />
        <div className="absolute top-0 bottom-0 left-0 right-0 rounded-full bg-white shadow-inner"></div>
        <div className="absolute top-1 bottom-1 left-1 right-1 rounded-full transition-all duration-200 ease-in-out bg-gray-300"></div>
        <div
          className={`absolute top-1 bottom-1 ${
            isChecked ? "right-1" : "left-1"
          } rounded-full transition-all duration-200 ease-in-out transform`}
          style={{ width: "38px" }}
        >
          <div
            className={`rounded-full transition-all duration-200 ease-in-out ${
              isChecked
                ? "bg-blue-500 translate-x-full"
                : "bg-gray-200 translate-x-0"
            }`}
            style={{
              width: "18px",
              height: "18px",
              marginTop: "2px",
              marginLeft: "0px",
            }}
          ></div>
        </div>
      </div>
      <div className="ml-2 text-gray-700 font-medium">Table</div>
    </label>
  );
}

export default ToggleButton;
