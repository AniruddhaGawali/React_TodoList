import React from "react";
import TodoItem from "./todoitem";
import { TodoContext } from "../index";
import { useDrop } from "react-dnd";

const TodoListBox = ({ title, type, func }) => {
  const todos = React.useContext(TodoContext);

  const [{ isOver }, drop] = useDrop({
    accept: "card",
    drop: (e) => {
      func(e.todo);
    },
    collect: (montier) => ({
      isOver: !!montier.isOver(),
    }),
  });

  return (
    <div
      className={`flex flex-col items-center justify-center h-fit w-1/2 py-2 `}
    >
      <div className="flex flex-col items-center justify-center w-full max-w-md px-4 py-6 space-y-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-700">{title}</h1>

        <div className="flex flex-col items-center justify-center w-full space-y-4">
          <div
            className={`flex flex-col items-center justify-center w-full min-h-[100px]  rounded-lg space-y-4 ${
              isOver ? "bg-gray-400" : ""
            }`}
            ref={drop}
          >
            {todos !== null &&
              todos.map((todo, key) => {
                if (type === "notdone" && todo.isCompleted === false) {
                  return <TodoItem todo={todo} key={key} />;
                } else if (type === "done" && todo.isCompleted === true) {
                  return <TodoItem todo={todo} key={key} />;
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoListBox;
