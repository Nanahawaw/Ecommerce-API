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
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');

const currentDir = process.cwd();

// Read the Swagger document
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(currentDir, 'swagger-output.json'), 'utf-8')
);

const app = express();

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(cors());
app.use(cookieParser());

//connect database
mongoose
  .connect(process.env.MONGO)
  .then(console.log('Database connected successfully'));

app.use('/api', userRouter);
app.use('/api', categoryRouter);
app.use('/api', productRouter);
app.use('/api', uploadRouter);
app.use('/api', orderRouter);

app.use('/uploads', express.static(path.join(__dirname + '/uploads')));
app.listen(3001, () => console.log('server running on port 3001'));
