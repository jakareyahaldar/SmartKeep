const TaskColl = require("../db/models/task.model.js")

async function deleteTask(e){
  try{
    const res = await TaskColl.findOneAndDelete(e)
    return "Task Delete successfull!"
  }catch(err){
    return "Can't delete got an error!"
  }
}
async function addTask(task){
  try{
    if( !task.note ) return "Can't Add Task because Invalid Data."
    const t = new TaskColl(task)
    await t.save()
    return "Task Added successfull!"
  }catch(err){
    return "Can't add got an error!"
  }
}
async function CompliteTask({_id}){
  try{
    if( !_id ) return "Can't set as CompliteTask _id not found."
    const dta = await TaskColl.findOneAndUpdate({_id},{status: "completed"})
    console.log(dta)
    return "set Task status completed successfull!"
  }catch(err){
    return "Can't completed task got an error!"
  }
}
async function editTask({_id,data}){
  try{
    if( !_id ) return "Can't editTask _id not found."
    const dta = await TaskColl.findOneAndUpdate({_id},data)
    console.log(dta)
    return "task edited successfull!"
  }catch(err){
    return "Can't update task got an error!"
  }
}


module.exports = {
  deleteTask,
  addTask,
  CompliteTask,
  editTask
}