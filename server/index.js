const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoute');
const categoryRouter = require('./routes/categoryRoute');
const productRouter = require('./routes/productRoute');
const uploadRouter = require('./routes/uploadRoute');
const orderRouter = require('./routes/orderRoute');

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

//connect database
mongoose
  .connect(process.env.MONGO)
  .then(console.log('Database connected successfully'));

app.use('/api/users', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/products', productRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/orders', orderRouter);

app.use('/uploads', express.static(path.join(__dirname + '/uploads')));
app.listen(3001, () => console.log('server running on port 3001'));
