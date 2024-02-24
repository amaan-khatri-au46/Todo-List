const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const todoItemRoute = require("./routes/todoItem.js");
const app = express();

dotenv.config();

const PORT = 8000;

app.use(express.json());
app.use(cors());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected To db");
  } catch (error) {
    throw error;
  }
};

app.use("/api", todoItemRoute);

app.listen(PORT, () => {
  console.log(`app started at ${PORT}`);
  connect();
});
