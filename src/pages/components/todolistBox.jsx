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
            {/* {console.log(todos)} */}
            {todos !== null &&
              todos !== undefined &&
              todos.map((todo, key) => {
                // console.log(todo.dueDate);
                if (
                  Date.now() > new Date(todo.dueDate).getTime() &&
                  (todo.status === "OPEN" || todo.status === "WORKING") &&
                  type == "OVERDUE"
                ) {
                  return <TodoItem todo={todo} key={key} func={func} />;
                } else if (type === "OPEN" && todo.status === "OPEN") {
                  if (Date.now() < new Date(todo.dueDate).getTime()) {
                    return <TodoItem todo={todo} key={key} func={func} />;
                  }
                } else if (type === "DONE" && todo.status === "DONE") {
                  return <TodoItem todo={todo} key={key} func={func} />;
                } else if (type === "WORKING" && todo.status === "WORKING") {
                  if (Date.now() < new Date(todo.dueDate).getTime()) {
                    return <TodoItem todo={todo} key={key} func={func} />;
                  }
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoListBox;
