import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from "cors"
import AuthRoute from "./Routes/AuthRoute.js"
import UserRoute from "./Routes/UserRoute.js"
import postRoute from "./Routes/postRoute.js"
import UploadRoute from "./Routes/UploadRoute.js"
//routes
const app=express();

//to serve images for public
app.use(express.static('public'))
app.use('/images',express.static("images"))

//Middlewares
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
dotenv.config()
mongoose
    .connect(
        process.env.MONGO_DB,{useNewUrlParser: true,
        useUnifiedTopology: true}
    )
    .then(() => 
        app.listen(process.env.PORT,() => 
            console.log(`Server side is running at port ${process.env.PORT}`)
        )
    )
    .catch((error)=>console.log(error));


app.use('/auth',AuthRoute)
app.use('/User',UserRoute)
app.use('/post',postRoute)
app.use('/upload',UploadRoute)