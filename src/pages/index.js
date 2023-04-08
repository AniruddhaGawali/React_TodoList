import React from "react";
import Head from "next/head";
import TodoListBox from "./components/todolistBox";
import AddTodo from "./components/addtodo";
import Table from "./components/table";
import ToggleButton from "./components/toggle";

const TodoContext = React.createContext();

export default function Home() {
  const [todos, setTodos] = React.useState([]);
  const [isSyncing, setIsSyncing] = React.useState(false);
  const [isTable, setIsTable] = React.useState(false);

  const fetchData = async () => {
    setIsSyncing(true);
    await fetch("https://backend-todolist.up.railway.app/get_todos")
      .then((response) => response.json())
      .then((json) => {
        console.log(json.data);
        setTodos(json.data);
      });

    setTimeout(() => {
      setIsSyncing(false);
    }, 2000);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const addTodo = async (text, desc, dueDate) => {
    if (text === "") {
      return;
    }

    const newTodos = [
      ...todos,
      { _id: todos.length + 1, text, desc, dueDate, status: "OPEN", tag: [] },
    ];
    setTodos(newTodos);

    setIsSyncing(true);

    await fetch("https://backend-todolist.up.railway.app/add_todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, desc, dueDate, status: "OPEN", tag: [] }),
    })
      .then((response) => response.json())
      .then((json) => console.log(json));

    setIsSyncing(false);
    fetchData();
  };

  const deleteTodo = async (todo_data) => {
    setIsSyncing(true);

    const newTodos = todos.filter((item) => item._id !== todo_data._id);

    await fetch("https://backend-todolist.up.railway.app/delete_todo", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo_data),
    });

    setTodos(newTodos);
    setIsSyncing(false);
  };

  const completeTodo = async (todo_data) => {
    setIsSyncing(true);
    const newTodos = todos.map((todo) => {
      if (todo._id === todo_data._id) {
        todo.status = "DONE";
      }
      return todo;
    });
    setTodos(newTodos);

    await fetch("https://backend-todolist.up.railway.app/change_todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo_data),
    });

    setIsSyncing(false);
    fetchData();
  };
  const workingTodo = async (todo_data) => {
    setIsSyncing(true);
    const newTodos = todos.map((todo) => {
      if (todo._id === todo_data._id) {
        todo.status = "WORKING";
      }
      return todo;
    });
    console.log(newTodos);
    setTodos(newTodos);

    await fetch("https://backend-todolist.up.railway.app/change_todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo_data),
    });

    setIsSyncing(false);
    fetchData();
  };

  const incompleteTodo = async (todo_data) => {
    const newTodos = todos.map((todo) => {
      if (todo._id === todo_data._id) {
        todo.status = "OPEN";
      }
      return todo;
    });
    setTodos(newTodos);
    await fetch("https://backend-todolist.up.railway.app/change_todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo_data),
    });
    setIsSyncing(false);
    fetchData();
    // }
  };

  return (
    <>
      <TodoContext.Provider value={todos}>
        <Head>
          <title>Todo List</title>
          <meta name="description" content="Simple Drag and Drop Todo list" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex w-full flex-col items-center justify-center">
          <div className="flex flex-col mt-32 w-2/3">
            <div className="w-full flex items-center justify-center">
              <h1 className="text-5xl font-semibold text-gray-700 text-center mr-5">
                Todo List
              </h1>
              <ToggleButton func={setIsTable} isChecked={isTable} />
            </div>
            <AddTodo addTodo={addTodo} isSyncing={isSyncing} />
          </div>

          {!isTable ? (
            <div className="flex w-full  items-start justify-center h-fit my-32 mx-32">
              <TodoListBox
                title={"❌ Not Done"}
                type={"OPEN"}
                func={incompleteTodo}
              />
              <TodoListBox
                title={"👨‍💻 Working"}
                type={"WORKING"}
                func={workingTodo}
              />
              <TodoListBox
                title={"✅ Done"}
                type={"DONE"}
                func={completeTodo}
              />
              <TodoListBox
                title={"❗️ Overdue"}
                type={"OVERDUE"}
                func={() => {}}
              />
            </div>
          ) : (
            <Table todos={todos} remove={deleteTodo} />
          )}
        </main>
      </TodoContext.Provider>
    </>
  );
}

export { TodoContext };
