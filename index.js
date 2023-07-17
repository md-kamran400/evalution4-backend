const express = require("express")
const mongoose = require("mongoose")
const {userRouter} = require("./routes/user.route")
const {postRouter} = require("./routes/post.route")
const {auth} = require("./middleware/auth.middlware")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors());
const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGOOSE_URL)
        console.log("conncted")
    } catch (error) {
        console.log(error)
    }
}

app.use("/users", userRouter)
app.use("/posts",auth, postRouter)

app.listen(4040, ()=>{
    connect()
    console.log("server is runing on 4040")
});