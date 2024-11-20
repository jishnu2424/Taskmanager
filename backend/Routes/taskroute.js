const {Router} =require('express')
const taskController = require('../Controller/taskcontroller')
const {verifyToken} =require('../Middleware/middleware')
const route =Router()

route.post('/add',verifyToken,taskController.addBlog)

route.get('/view',verifyToken,taskController.viewTask)

route.get('/viewall',taskController.viewAllTask)


route.get('/viewbyid/:id',taskController.viewTaskById)

route.patch('/update/:id',verifyToken,taskController.updateTask)

route.delete('/delete/:id',taskController.deleteTask)





module.exports=route