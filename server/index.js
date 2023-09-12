import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

import connectDB from './config/db.js';

// routes
import AuthRoute from './routes/AuthRoute.js'
import UserRoute from './routes/UserRoute.js'
import PostRoute from './routes/PostRoute.js'
import UploadRoute from './routes/UploadRoute.js'
import ChatRoute from './routes/ChatRoute.js'
import MessageRoute from './routes/MessageRoute.js'


connectDB();
const app = express();

//! MiddleWare
app.use(bodyParser.json({ limit : "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// to serve images inside public folder
app.use(express.static('public')); 
app.use('/images', express.static('images'));

app.get('/', (req,res)=>{ 
    res.send('server is ready')
});  


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use('/auth', AuthRoute);
app.use('/user', UserRoute)
app.use('/posts', PostRoute)
app.use('/upload', UploadRoute)
app.use('/chat', ChatRoute)
app.use('/message', MessageRoute)