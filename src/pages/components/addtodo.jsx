import React from "react";

import { RiAddFill } from "react-icons/ri";
import { MdOutlineClear } from "react-icons/md";
import { GoSync } from "react-icons/go";

const AddTodo = ({ addTodo, isSyncing }) => {
  const [input, setInput] = React.useState("");
  const [date, setDate] = React.useState("");
  const [desc, setDesc] = React.useState("");

  return (
    <div className="flex flex-col px-28 w-full items-start justify-center">
      <div className="flex  mt-4 w-full items-center justify-center">
        <GoSync
          color="black"
          className={`text-3xl mr-5 ${isSyncing ? "animate-spin" : ""}`}
        />
        <input
          type="text"
          className="w-full px-4 py-2  text-gray-700 bg-gray-200 rounded-l-lg focus:outline-none  h-14"
          placeholder="Add Todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input
          type="datetime-local"
          name=""
          id=""
          value={date}
          onChange={(e) => {
            // console.log(e.target.value);
            if (Date.now() > new Date(e.target.value).getTime()) {
              setDate("");
              alert("Date cannot be in the past");
            } else {
              setDate(e.target.value);
            }
          }}
          className="w-1/3 px-4 py-2  text-gray-700 bg-gray-200 rounded-r-lg focus:outline-none  h-14"
        />

        <button
          type="button"
          className="w-fit ml-5 px-4 py-2 h-14 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
          onClick={() => {
            setInput("");
            setDate("");
            setDesc("");
            addTodo(input, desc, date);
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
      <div className="flex mt-4 ml-9 w-full items-start justify-start">
        <textarea
          name=""
          id=""
          rows="3"
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          placeholder="Description"
          className="w-2/3 px-4 py-2  text-gray-700 bg-gray-200 rounded-lg focus:outline-none  "
        ></textarea>
      </div>
    </div>
  );
};

export default AddTodo;
