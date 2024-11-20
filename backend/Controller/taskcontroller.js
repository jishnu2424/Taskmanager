const jwt = require('jsonwebtoken')
const userDB =require('../Model/user')
const TaskDB = require('../Model/Tasks')
require('dotenv').config()

const addBlog = async (req, res) => {
    const tokenUserId = req.userId;  
    
    if (!tokenUserId) {
      return res.status(401).send("Unauthorized: Token expired or invalid.");
    }
  
    try {
      const body = req.body;
      const newTask= await TaskDB.create({ ...body, owner: tokenUserId });
    
      await userDB.findByIdAndUpdate(tokenUserId, { $push: { tasks: newTask._id } });
    
      console.log(newTask);
      return res.status(200).send("Task  created successfully.");
    } catch (err) {
      console.error("Error while creating task post:", err);
      return res.status(500).send("Internal Server Error");
    }
  };
  
  

const viewTask = async(req,res)=>{
    try{
        const userId = req.userId
        const findTask =await TaskDB.find({owner:userId})
        if (!findTask){
            return res.status(404).send("design not found")
        }
        return res.status(200).send(findTask);

    }catch(err){
        console.log(err);
    }
}





const viewAllTask = async (req,res)=>{
    try {
        const Task = await TaskDB.find()
        return res.status(200).send(Task)
    } catch (error) {
        console.error(error);
    }
}

const viewTaskById = async (req, res) => {
    const { id } = req.params; 
    
    try {
        const task = await TaskDB.findById(id);
        if (!task) {
          return res.status(404).json({ message: "task not found" });
        }
        return res.status(200).json(task);
      } catch (error) {
        console.error("Error retrieving task:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
};


const updateTask = async (req, res) => {
    
        const { id } = req.params;
        const tokenUserId = req.userId;
        const body = req.body;

        try {
        const task = await TaskDB.findById(id);
        if (!task) {
            return res.status(404).json({ message: "task not found" });
        }
        if (task.owner.toString() !== tokenUserId) {
            return res.status(403).json({ message: "Not authorized to update this task" });
        }
        await task.updateOne(body);
        return res.status(200).json({ message: "task Updated" });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};


const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const findTask = await TaskDB.findById(id);
        if (!findTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        await TaskDB.deleteOne({ _id: id });
        return res.status(200).json({ message: "Task deleted" });
    } catch (error) {
        res.status(500).json(error);
    }
};






    
module.exports ={addBlog,viewTask,updateTask,deleteTask,viewAllTask,viewTaskById}