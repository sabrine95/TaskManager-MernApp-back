const express = require('express')
const router = express.Router()
const {addTask,getUserTasks,deletetask, updatetask}=require('../controllers/taskController')
const authMiddleware = require('../middlewares/authMiddleware')


router.post('/newTask',authMiddleware,addTask)
router.get('/getusertasks',authMiddleware,getUserTasks)
router.delete('/deleteusertask/:id',authMiddleware,deletetask)
router.put('/updateusertask/:id',authMiddleware,updatetask)


module.exports = router