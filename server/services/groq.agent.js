const Groq = require("groq-sdk")
const TaskControlllar = require("../controllars/task.controllar.js")
const { deleteTask, addTask, CompliteTask, editTask } = require("../lib/taskCrud.js")
const getTaskList = TaskControlllar.getAll

const groq = new Groq({ apiKey: process.env.GROQ_KEY });

const messages = [
  {
    role: "system",
    content: `
    You are an assistant you help to manage my task and other activity or data.
    
    ## Basic Data:
    Today: ${new Date().toString()}
    
    
    ## Return Ans Type:
    - the assisstant answer must be like a human telking.
    - your response present by a telegram message so your response optomize for this.
    - Return only useful data not everything.
    - build your own answer using the context.
    - add linebreak for understand message easyly
    - don't use table format data show use endentation for look good
    
    ## Task Output Example:
    '01. Update menu.
    ✍️ Fix the menu show feature as sokn as possible.
    👀 pending
    
    02. Update menu.
    ✍️ Fix the menu show feature as sokn as possible.
    👀 pending'
    
    
    
    `
  }
  ]
const tools = [
  {
    type: "function",
    function: {
      name: "getTaskList",
      description: "this function return all task from database."
    }
  },
  {
    type: "function",
    function: {
      name: "deleteTask",
      description: "this function delete a task with _id.",
      parameters:{
        type: "object",
        properties:{
          _id:{
            type: "string",
            description: "a mongodb document id to find and delete document"
          }
        },
        required: ["_id"]
      }
    },
  },
  {
    type: "function",
    function: {
      name: "CompliteTask",
      description: "this function Update a task to status complite",
      parameters:{
        type: "object",
        properties:{
          _id:{
            type: "string",
            description: "a mongodb document id to find and Update document"
          }
        },
        required: ["_id"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "addTask",
      description: "this function add a new task",
      parameters:{
        type: "object",
        properties:{
          note:{
            type: "string",
            description: "its a description of task."
          },
          title:{
            type: "string",
            description: "this is title of task. title must be small"
          },
          due:{
            type: "string",
            description: "a date string format is : 2026/04/23"
          },
          due_time:{
            type: "string",
            description: "a time string format is  '00:00'"
          },
        },
        required: ["note","title"]
      }
    },
  },
  {
    type: "function",
    function: {
      name: "editTask",
      description: "this function edit a task",
      parameters:{
        type: "object",
        properties:{
          _id:{
            type: "string",
            description: "mongodb document _id."
          },
          data:{
            type: "object",
            description: "updated task as object"
            
          }
        },
        required: ["_id","data"]
      }
    },
  }

  ]


async function askToAgent(message) {
  if(message) messages.push(message)
  const chatCompletion = await getGroqChatCompletion(message);
  // Print the completion returned by the LLM.
  const answer = chatCompletion.choices[0].message.content
  if(answer){
    messages.push({role:"assistant",content: answer})
    return answer
  }
  const tool_calls = chatCompletion.choices[0].message.tool_calls
  if(!tool_calls) return
  for(let i = 0; i < tool_calls.length; i++){
    const tool = tool_calls[i]
    console.log(tool)
    const toolName = tool.function.name
    const arg = tool.function.arguments
    if(toolName === "getTaskList"){
      const list = await getTaskList(arg)
      messages.push({ role: "tool", tool_call_id: tool.id, name: toolName, content: JSON.stringify(list) })
    }else if(toolName === "deleteTask"){
      const args = arg ? JSON.parse(arg) : {}
      const r = await deleteTask(args)
      messages.push({ role: "tool", tool_call_id: tool.id, name: toolName, content: r })
    }else if(toolName === "addTask"){
      const args = arg ? JSON.parse(arg) : {}
      const r = await addTask(args)
      messages.push({ role: "tool", tool_call_id: tool.id, name: toolName, content: r })
    }else if(toolName === "CompliteTask"){
      const args = arg ? JSON.parse(arg) : {}
      const r = await CompliteTask(args)
      messages.push({ role: "tool", tool_call_id: tool.id, name: toolName, content: r })
    }else if(toolName === "editTask"){
      const args = arg ? JSON.parse(arg) : {}
      const r = await editTask(args)
      messages.push({ role: "tool", tool_call_id: tool.id, name: toolName, content: r })
    }
  }
  return await askToAgent()
}

async function getGroqChatCompletion(message) {
  //console.log(messages)
  return groq.chat.completions.create({
    messages,
    tools,
    model: "openai/gpt-oss-20b",
  });
}

module.exports = askToAgent