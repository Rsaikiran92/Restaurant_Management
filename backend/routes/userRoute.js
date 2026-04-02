import express from "express"

const userRoute=express.Router();

userRoute.get("/",async()=>{
    try {
        console.log("fod")
    } catch (error) {
        console.log("error")
    }
})

export default userRoute