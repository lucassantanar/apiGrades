import express from "express";
import accounstRouter from "./routes/accounts.js";
import { promises as fs } from "fs";

const {readFile, writeFile} = fs;
global.fileName = "grades.json";

const app = express();
app.use(express.json());

app.use("/account", accounstRouter);

app.listen(3000, async () => {
  try {
    await readFile(global.fileName);
    console.log("Server em execução!");
  } catch (err) {
    const initialJson = {
      nextId: 0,
      accounts: []
    }
    writeFile(global.fileName, JSON.stringify(initialJson)).then(() => {
      console.log("Server em execução e arquivo criado!");
    }).catch(err => {
      console.log(err);
    });
  }
});