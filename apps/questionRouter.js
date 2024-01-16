import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const questionRouter = Router();

questionRouter.post("/", async (req, res) => {
  try {
    const collection = db.collection("test");

    const questionData = { ...req.body, created_at: new Date() };

    if (
      questionData.category === "Software" ||
      questionData.category === "Food" ||
      questionData.category === "Travel" ||
      questionData.category === "Science" ||
      questionData.category === "Etc."
    ) {
      await collection.insertOne(questionData);

      return res.json({ message: "question has been created successfully" });
    }
  } catch (error) {
    console.log(`${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

questionRouter.get("/", async (req, res) => {
  try {
    const collection = db.collection("test");

    const data = await collection.find().limit(10).toArray();
    return res.json({ data: data });
  } catch (error) {
    console.log(`${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

questionRouter.get("/question/:id", async (req, res) => {
  try {
    const collection = db.collection("test");
    const questionId = new ObjectId(req.params.id);

    const data = await collection.findOne({ _id: questionId });
    return res.json({ data: data });
  } catch (error) {
    console.log(`${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

questionRouter.put("/question/:id", async (req, res) => {
  try {
    const collection = db.collection("test");
    const questionId = new ObjectId(req.params.id);

    const newQuestionData = { ...req.body };

    if (newQuestionData.title && newQuestionData.description) {
      await collection.updateOne(
        {
          _id: questionId,
        },
        {
          $set: newQuestionData,
        }
      );

      return res.json({
        message: "question has been updated successfully",
      });
    }
  } catch (error) {
    console.log(`${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

questionRouter.delete("/question/:id", async (req, res) => {
  try {
    const collection = db.collection("test");
    const questionId = new ObjectId(req.params.id);

    await collection.deleteOne({
      _id: questionId,
    });
    return res.json({ message: "question has been deleted successfully" });
  } catch (error) {
    console.log(`${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default questionRouter;
