require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const connectDB = require('./config/db')
const authRouter = require('./routes/auth.route')
const messageRouter = require('./routes/message.route')
connectDB()

const app = express();
app.use(express.json()); 
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // your frontend URL
    credentials: true
}));

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

app.listen(process.env.PORT, console.log("app is listening on", process.env.PORT))