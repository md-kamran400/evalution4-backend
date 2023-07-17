const express = require("express")
const mongoose = require("mongoose")
const {userRouter} = require("./routes/user.route")
const {postRouter} = require("./routes/post.route")
const {AuthMiddleWAre} = require("./middleware/auth.middlware")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors());
const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGOOSE_LIN)
        console.log("conncted")
    } catch (error) {
        console.log(error)
    }
}

app.use("/users", userRouter)
app.use("/posts",AuthMiddleWAre, postRouter)

app.listen(4040, ()=>{
    connect()
    console.log("server runing on 4040")
});