const Task= require('../models/taskSchema')

const addTask = async(req,res)=>{
    try{
        const {title,desc}=req.body
        const userId = req.body.userId
        // console.log(userId)
        const newTask= await Task.create({title,desc,owner:userId})
        res.status(201).json({msg:"task created",Task:newTask})
    }
    catch(err){
        res.status(500).json({msg:"something went wrong",err:err.message})
    }
}


const getUserTasks = async(req,res)=>{
    try {
        const tasks= await Task.find({owner: req.body.userId})
        res.status(200).json({msg:"get all tasks",tasks:tasks})
    }
    catch(err){
        res.status(500).json({msg:"something went wrong",err:err.message})
    }
}



const deletetask = async (req,res) =>{
    try {
        const task = await Task.findByIdAndDelete({_id:req.params.id})
        res.status(200).json({msg: "Task deleted",task: task})
    } catch (err){
        res.status(500).json({msg:"something went wrong",err:err.message})
    }
}

const updatetask =  async (req,res)  =>{
        try {
            const task = await Task.findByIdAndUpdate({_id:req.params.id},{...req.body})
            res.status(200).json({msg: "task updated",task: task})
        } catch (err){
            res.status(500).json({msg: err.message})
        }
}



module.exports = {addTask,getUserTasks,deletetask,updatetask}