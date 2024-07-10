const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const router = require("./routes/index");
const bodyParser = require("body-parser");

const corsConfig = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

const app = express();
app.use(cors(corsConfig));

app.options("", cors(corsConfig));

// Increase the payload size limit
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

const PORT = process.env.PORT || 8080;
connectDB().then(() => {
  console.log("mongodb connected");
  app.listen(PORT, () => {
    console.log("Server is running");
  });
});
