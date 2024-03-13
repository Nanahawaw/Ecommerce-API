const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoute");

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

//connect database
mongoose
  .connect(process.env.MONGO)
  .then(console.log("Database connected successfully"));

app.use("/user", userRouter);

app.listen(3001, () => console.log("server running on port 3001"));
