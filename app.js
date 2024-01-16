import express from "express";
import questionRouter from "./apps/questionRouter.js";
import { client } from "./utils/db.js";

async function init() {
  const app = express();
  const port = 4000;
  await client.connect();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/question", questionRouter);

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

init();
