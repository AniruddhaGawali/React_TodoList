import React from "react";

import { RiAddFill } from "react-icons/ri";
import { MdOutlineClear } from "react-icons/md";
import { GoSync } from "react-icons/go";

const AddTodo = ({ addTodo, isSyncing }) => {
  const [input, setInput] = React.useState("");

  return (
    <div className="flex px-28 mt-4 items-center justify-center">
      <GoSync
        color="black"
        className={`text-3xl mr-5 ${isSyncing ? "animate-spin" : ""}`}
      />
      <input
        type="text"
        className="w-full px-4 py-2  text-gray-700 bg-gray-200 rounded-lg focus:outline-none  h-14"
        placeholder="Add Todo"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        type="button"
        className="w-fit ml-5 px-4 py-2 h-14 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
        onClick={() => {
          setInput("");
          addTodo(input);
        }}
      >
        <RiAddFill color="white" className="text-3xl" />
      </button>

      <button
        type="button"
        className="w-fit ml-5 px-4 py-2 h-14 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
        onClick={() => setInput("")}
      >
        <MdOutlineClear color="white" className="text-3xl" />
      </button>
    </div>
  );
};

export default AddTodo;
