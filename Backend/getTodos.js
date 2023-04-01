const { MongoClient } = require("mongodb");
const express = require("express");
const router = express.Router();

const client = new MongoClient(
  "mongodb+srv://aniruddhagawali:RjBBQ5A8KyhMMnRp@shopmanager.qegag9v.mongodb.net/?retryWrites=true&w=majority"
);
router.get("/", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("todolist");
    const collection = database.collection("todos");

    const data = await collection.aggregate().toArray();

    console.log(data);
    return res.json({ message: "Success", isSuccess: true, data });
  } catch (err) {
    console.log(err);

    res.json({ message: "Error connecting to db", isSuccess: false });

    return res
      .status(500)
      .json({ message: "Error connecting to db", isSuccess: false });
  }
});

module.exports = router;
