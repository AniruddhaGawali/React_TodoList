import React from "react";

import { useDrag } from "react-dnd";

const itemTypes = {
  CARD: "card",
};

const TodoItem = ({ todo }) => {
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
      className={`flex items-center justify-between w-full px-4 py-2 bg-gray-200 rounded-lg ${
        isDragging ? "opacity-0" : ""
      }`}
      ref={drag}
    >
      <h1 className={`text-gray-700 ${todo.isCompleted ? "line-through" : ""}`}>
        {todo.text}
      </h1>
    </div>
  );
};

export default TodoItem;
