import React, { useState } from "react";
import AddAndUpdateForm from "../../Components/AddAndUpdateContainerForm.jsx"
import TitleBar from "../../Components/TitleBar.jsx"
import { POST, PUT, DELETE } from "../../utilities/ReqManager.js"
import { useSelector, useDispatch } from "react-redux"
import { add, edit, _delete } from "../../feature/my_state/my_state_slice.js"
import { popup } from "../../utilities/Alert.js"

const date = new Date()

const EmptyForm = {
  title: "",
  note: "",
  due: `${date.getFullYear()}-${ date.getMonth()<10 ? "0"+date.getMonth() : date.getMonth() }-${ date.getDate()<10 ? "0"+date.getDate() : date.getDate() }`,
  status: "pending"
}
console.log(EmptyForm)

export default function TaskManager(){
  const name = "tasks"
  const dispatch = useDispatch()
  const [formData,setForm] = useState(EmptyForm)

  const tasks = useSelector(state => state.my_state.data.tasks)

  const fildConfig = [
  {
    name: "title",
    placeholder: "Task Title:",
    value: formData.title,
    chengeEvent: (e)=>setForm(prev => ({...prev, title: e.target.value})),
    type: "text"
  },
  {
    name: "note",
    placeholder: "Task Description:",
    value: formData.note,
    chengeEvent: (e)=>setForm(prev => ({...prev, note: e.target.value})),
    type: "text",
    element: "textarea"
  },
  {
    name: "due",
    placeholder: "Due Date:",
    value: formData.due,
    chengeEvent: (e)=>setForm(prev => ({...prev, due: e.target.value})),
    type: "date"
  }
  ]

  async function AddTask(e){
    e.preventDefault()
    // get actual data 
    const data = {}
    for(const key of Object.keys(EmptyForm)){
      data[key]= formData[key]
    }
    // save and update req
    const req = !formData._id ? await POST("/tasks",formData) : await PUT("/tasks",formData._id, data)
    const res = await req.json()
    // alert popup
    if(!req.ok){
      popup("Error","Operation Faild!")
      return
    }
    /// ui update
    if(!formData._id) dispatch(add({ name, data: res }))
    if(formData._id) dispatch(edit({ name, data: formData }))

    setForm(EmptyForm)
  }

  function editTask(data){
    setForm(data)
  }

  async function deleteTask(id){
    if(!id){
      popup("error","Id not found!")
      return
    }
    const req = await DELETE("/tasks",id)
    if(!req.ok){
      popup("Error","Faild to Delete!")
      return
    }
    dispatch(_delete({name,id}))
  }

  async function toggleStatus(task){
    const updated = {
      ...task,
      status: task.status === "pending" ? "completed" : "pending"
    }
    
    // save update 
    const req = await PUT("/tasks",task._id, updated)
    if(!req.ok){
      popup("Error","Faild to mark as done!")
      return
    }

    dispatch(edit({name:"tasks",data:updated}))
  }

  return(
    <div className="p-5 w-full">

      <TitleBar 
          title="Tasks"
          text="Create and track your daily tasks and to-do list."
          icon="fa-solid fa-clipboard-check"
        />

      <AddAndUpdateForm
        title={formData.id ? "Update Task" : "Add Task"}
        fildConfig={fildConfig}
        fildData={formData}
        submitButtonFunc={AddTask}
      />

      {tasks.length === 0 ? (
        <div className="text-center text-gray-500 border rounded-xl p-10 mt-5">
          No tasks added
        </div>
      ) : (

        <div className="mt-5 gap-3 grid md:grid-cols-2">

          {tasks.map((item)=>(

            <div
              key={item.id}
              className="p-4 bg-white shadow rounded-xl border space-y-2"
            >

              <div className="flex justify-between items-center">

                <h3 className={`text-lg font-semibold ${
                  item.status === "completed"
                  ? "line-through text-gray-400"
                  : ""
                }`}>
                  {item.title}
                </h3>

                <div className="flex gap-2">

                  <button
                    onClick={()=>toggleStatus(item)}
                    className={`px-3 py-1 text-xs rounded-lg ${
                      item.status === "completed"
                      ? "bg-green-500 text-white"
                      : "bg-yellow-500 text-white"
                    }`}
                  >
                    {item.status === "completed" ? "Done" : "Pending"}
                  </button>

                  <button
                    onClick={()=>editTask(item)}
                    className="px-3 py-1 text-xs bg-blue-500 text-white rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={()=>deleteTask(item._id)}
                    className="px-3 py-1 text-xs bg-red-500 text-white rounded-lg"
                  >
                    Delete
                  </button>

                </div>

              </div>

              {item.due && (
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Due:</span> {item.due}
                </p>
              )}

              {item.note && (
                <p className="text-sm text-gray-500 italic">
                  {item.note}
                </p>
              )}

            </div>

          ))}

        </div>

      )}

    </div>
  )
}