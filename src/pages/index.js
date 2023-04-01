import React from "react";
import Head from "next/head";
import TodoListBox from "./components/todolistBox";
import AddTodo from "./components/addtodo";

const TodoContext = React.createContext();

export default function Home() {
  const [todos, setTodos] = React.useState(null);
  const [isSyncing, setIsSyncing] = React.useState(false);

  React.useEffect(() => {
    setIsSyncing(true);
    fetch("http://localhost:5000/get_todos")
      .then((response) => response.json())
      .then((json) => setTodos(json.data));

    setTimeout(() => {
      setIsSyncing(false);
    }, 2000);
  }, []);

  const addTodo = async (text) => {
    if (text === "") {
      return;
    }

    const newTodos = [...todos, { text, isCompleted: false }];
    setTodos(newTodos);

    setIsSyncing(true);

    await fetch("http://localhost:5000/add_todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, isCompleted: false }),
    })
      .then((response) => response.json())
      .then((json) => console.log(json));

    setIsSyncing(false);
  };

  // const deleteTodo = (id) => {
  //   const newTodos = todos.filter((todo) => todo.id !== id);
  //   setTodos(newTodos);
  // };

  const completeTodo = async (todo_data) => {
    if (!todos.isCompleted) {
      setIsSyncing(true);
      const newTodos = todos.map((todo) => {
        if (todo._id === todo_data._id) {
          todo.isCompleted = true;
        }
        return todo;
      });
      setTodos(newTodos);

      await fetch("http://localhost:5000/change_todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo_data),
      });

      setIsSyncing(false);
    }
  };

  const incompleteTodo = async (todo_data) => {
    if (todo_data.isCompleted) {
      setIsSyncing(true);
      const newTodos = todos.map((todo) => {
        if (todo._id === todo_data._id) {
          todo.isCompleted = false;
        }
        return todo;
      });
      setTodos(newTodos);
      await fetch("http://localhost:5000/change_todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo_data),
      });
      setIsSyncing(false);
    }
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
        <main className="flex flex-col items-center justify-center">
          <div className="flex flex-col mt-32 w-2/3">
            <h1 className="text-5xl font-semibold text-gray-700 text-center">
              Todo List
            </h1>
            <AddTodo addTodo={addTodo} isSyncing={isSyncing} />
          </div>

          <div className="flex w-full  items-start justify-center h-fit my-32">
            <TodoListBox
              title={"❌ Not Done"}
              type={"notdone"}
              func={incompleteTodo}
            />
            {/* <TodoListBox title={"⏳ Working On"} /> */}
            <TodoListBox title={"✅ Done"} type={"done"} func={completeTodo} />
          </div>
        </main>
      </TodoContext.Provider>
    </>
  );
}

export { TodoContext };
