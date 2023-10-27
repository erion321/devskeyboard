require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//API MIDDLEWARE
app.use("/api/user", require("./routes/authRoutes.js"));
app.use("/api/posts", require("./routes/postRoutes.js"));

app.listen("4000", () => {
  console.log("first");
});
