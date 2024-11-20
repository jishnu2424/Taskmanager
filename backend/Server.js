const  express = require('express');
require ('./DataBase/DB.js')
const authRoute = require('./Routes/authroute')
const taskRoute =require('./Routes/taskroute.js')
const cors =require('cors')
const app = express()


app.use(cors())
app.use(express.json())
app.use('/auth',authRoute)
app.use('/task',taskRoute)


app.listen(5000,()=>{
    console.log("server running");
})