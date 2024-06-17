const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
app.use(cors());

const PORT = 8080 || process.env.PORT;
connectDB().then(() => {
  console.log("mongodb connected");
  app.listen(PORT, () => {
    console.log("Server is running");
  });
});
