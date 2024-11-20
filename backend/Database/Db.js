const mongoose = require('mongoose')

require('dotenv').config()
mongoose.connect(process.env.DB).then(()=>{
    console.log("DataBase connected")
}).catch((err)=>{
    console.log(err);
})