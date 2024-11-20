const {Router} =require('express')
const authcontroller =require ('../Controller/authcontroller.js')
const route = Router()

route.post('/add/user',authcontroller.addUser)

route.post('/login/user',authcontroller.loginUser)

module.exports=route