const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const userRouter = require("./routes/userRoute");
const authRouter = require("./routes/userRoute");

const app = express();

app.use(express.json());
app.use(cors());

//connect database
mongoose
  .connect(process.env.MONGO)
  .then(console.log("Database connected successfully"));

app.use("/user", userRouter);
app.use("/auth", userRouter);

app.listen(3001, () => console.log("server running on port 3001"));
