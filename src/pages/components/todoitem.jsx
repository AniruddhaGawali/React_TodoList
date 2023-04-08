import React from "react";

import { useDrag } from "react-dnd";

const itemTypes = {
  CARD: "card",
};

const TodoItem = ({ todo, func }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: {
      todo,
    },
    collect: (moniter) => ({
      isDragging: !!moniter.isDragging(),
    }),
  });
  return (
    <div
      className={`flex items-center justify-start w-full px-4 py-2 bg-gray-200 rounded-lg ${
        isDragging ? "opacity-0" : ""
      }`}
      ref={drag}
    >
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={(e) => {
          console.log(e.target.checked);
          const temp = {
            _id: todo._id,
            text: todo.text,
            isCompleted: e.target.checked,
          };
          func(temp);
        }}
      />
      <span className="mx-3">|</span>
      {/* {console.log(todo)} */}
      <h1 className={`text-gray-700 `}>{todo.text}</h1>
    </div>
  );
};

export default TodoItem;
