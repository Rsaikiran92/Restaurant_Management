import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";

const app = express();

app.use(express.json());


// Routes
app.use("/", userRoute);


app.listen(5000,async()=>{
    try {
        await mongoose.connect("mongodb+srv://saikiran92rk_db_user:X7KxuOshEND7aKjA@cluster0.zxcb5vm.mongodb.net/?appName=Cluster0");
        console.log("Connected success")
    } catch (error) {
        console.log("not able to connect to data base")
    }
    console.log("Server running")
})
