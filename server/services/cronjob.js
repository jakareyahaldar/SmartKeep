const TaskColl = require("../controllars/task.controllar.js")
const { sendMessage } = require("../lib/telegram.js")
const getRemainTime = require("../utilities/getRemainTime.js")
const Q = []


function getMilliseconds(dateTimeStr) {
  // Convert "2026-04-18,11:23" -> "2026-04-18T11:23"
  let formatted = dateTimeStr.replace(",", "T");
  formatted = dateTimeStr.replace("/", "-");

  // Create Date object
  const date = new Date(formatted);

  // Return milliseconds timestamp
  return date.getTime();
}

async function AddInNotifyQ(task){
  if(task.status !== "pending" || (task.seventyNotify && task.endNotify)) return
  const dueTime = !task.due ? null : getMilliseconds( `${task.due},${task.due_time}` )
  if(!dueTime) return
  if(Date.now() > dueTime){
    const remainTime = getRemainTime(Date.now(),dueTime)
    sendMessage(`${task.title} task has started on ${remainTime} ago Start the task.`)
    //sendMessage(`${task.title} Task is started few time ago.`)
    TaskColl.updateById(task._id, { seventyNotify: true, endNotify: true } )
    return
  }
  const totalDuratuon = (dueTime-new Date(task.createdAt).getTime())
  const seventyPercentOfDuration = (70/100)*totalDuratuon
  const Notify = {task}
  Notify.seventy = (new Date(task.createdAt).getTime())+seventyPercentOfDuration
  Notify.startTask = dueTime
  Q.push(Notify)
}

async function AnalizeTask(){
  const tasks = await TaskColl.getAll()
  const inQ= Q.map( t => String(t.task._id) ) // store all task id 
  for(const task of tasks){ // Check if not in Q
    if(!inQ.includes(String(task._id))){
      AddInNotifyQ(task)
    }
  }
}

function RemoveFromQ(n){
  try{
    const index = Q.findIndex( i => i === n )
    Q.splice(index,1)
  }catch(err){}
}

function seventyNotifyComplite(n,data){
  try{
    const index = Q.findIndex( i => i === n )
    Q.splice(index,1,data)
  }catch(err){}
}



function CheckQ(Q){
  for(let n of Q){
    const dueMills = !n.task.due ? null : getMilliseconds( `${n.task.due},${n.task.due_time}` )
    const nowTime = Date.now()
    const isSeventy = n.seventy <= nowTime
    const isStart = n.startTask <= nowTime
    if(isStart && !n.task.endNotify){
      const remainTime = getRemainTime(Date.now(),dueMills)
      sendMessage(`${n.task.title} task has started on ${remainTime} ago Start the task.`) // send started notification 
      TaskColl.updateById(n.task._id,{ seventyNotify: true, endNotify: true }) //update database
      RemoveFromQ(n) // remove the doc on q 
    }else if (isSeventy && !n.task.seventyNotify){
      //send almost started  notification 
      const remainTime = getRemainTime(dueMills)
      sendMessage(`${remainTime} left for ${n.task.title} task to start `)
      TaskColl.updateById(n.task._id,{ seventyNotify: true }) //update database
      seventyNotifyComplite(n,{ ...n, task: { ...n.task.toObject(), seventyNotify: true } })
    }
  }
}

setInterval(()=>{
  AnalizeTask()
},10000)
setInterval(()=>{
  CheckQ(Q)
},5000)