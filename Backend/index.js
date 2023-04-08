const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/add_todo", require("./addTodo"));
app.use("/get_todos", require("./getTodos"));
app.use("/change_todo", require("./changeTodo"));
app.use("/delete_todo", require("./deleteTodo"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
