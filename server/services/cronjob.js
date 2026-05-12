const TaskColl = require("../controllars/task.controllar.js")
const { sendMessage } = require("../lib/telegram.js")

function getTime(mil){
  const min = Math.floor(mil/60000) + " Minutes ago"
  return min
}
async function AnalizeTask(){
  const tasks = await TaskColl.getAll()
  const taskTitles = []
  for(const task of tasks){
    const date = new Date(task.createdAt)
    const passedTime = Date.now()-date.getTime()
    if(passedTime > 60000 && task.status === "pending"){
      const timeStr = getTime(passedTime)
      const text = `
      🗣️ Task alert!!\n\n🪧${task.title}\n📜${task.note}\n\nThis task created ${timeStr} But not complete.
      `
      sendMessage(text)
      
    }
  }
}

// setInterval(()=>{
//   AnalizeTask()
// },60000)