const { MongoClient } = require("mongodb");
const express = require("express");
const router = express.Router();

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://aniruddhagawali:RjBBQ5A8KyhMMnRp@shopmanager.qegag9v.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

router.post("/", async (req, res) => {
  const todo_data = req.body;
  try {
    await client.connect();
    const database = client.db("todolist");
    const collection = database.collection("todos");

    const result = await collection.insertOne(todo_data);

    console.log(
      `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`
    );
    res.json({ isSuccess: true });
  } catch (e) {
    console.error(e);
    res.json({ isSuccess: false });
  } finally {
    await client.close();
  }
});

module.exports = router;
