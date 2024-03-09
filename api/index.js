import express from "express";
import mongoose from "mongoose";
import dotenv  from 'dotenv';
import userRouter  from './routes/user.route.js'
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser";
import listingRouter from './routes/listing.route.js';
import path from 'path';
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to mongodb");
}).catch((err)=>{
    console.log(err);
    console.log("not connected to db ");
});

const app = express()
app.use(express.json());
app.use(cookieParser());
const port = 3000



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing',listingRouter)

// Get the directory path using import.meta.url
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})




app.use((err,rq,res,next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || 'internal server error';
  return res.status(statusCode).json({
    succes:false,
    statusCode,
    message,
  });
});