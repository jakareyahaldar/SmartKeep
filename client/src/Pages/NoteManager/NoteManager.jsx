import React, { useState } from "react";
import AddAndUpdateForm from "../../Components/AddAndUpdateContainerForm.jsx"
import Button from "../../Components/Button.jsx"
import TitleBar from "../../Components/TitleBar.jsx"

import { POST,DELETE,PUT } from "../../utilities/ReqManager.js"
import { useSelector, useDispatch } from "react-redux"
import { add, edit, _delete } from "../../feature/my_state/my_state_slice.js"

const initialFormData = { title:"",description:"" }

export default function NoteManagement() {
  const dispatch = useDispatch()
  const Api = import.meta.env.VITE_API_URL
  const [formData,setForm] = useState(initialFormData)
  const fildConfig = [
  {
    name: "title",
    placeholder: "write title..",
    value: '',
    chengeEvent: (e)=>setForm(prev => ({...prev, title: e.target.value})),
    type: "text"
  },
  {
    name: "description",
    placeholder: "write description..",
    value: '',
    chengeEvent: (e)=>setForm(prev => ({...prev, description: e.target.value})),
    type: "text",
    element: "textarea"
  },
  ]
  
  
  
  async function AddNote(e){
    e.preventDefault()
    const name = "notes"
    
    if(formData._id){
      const { title, description } = formData
      const req2 = await PUT("/notes",formData._id,{ title, description })
      const res = await req2.json()
      if(!req2.ok) return
      dispatch(edit({name,data:formData}))
      setForm(initialFormData)
      return
    }
    
    const req = await POST("/notes",formData)
    const res = await req.json()
    if(req.ok){
    console.log(res)
      dispatch(add({name,data:res}))
    }else{
      alert("Faild to Save")
    }
    setForm(initialFormData)
  }
  
  function EditNote(note){
    setForm(note)
  }
  
  async function DeleteNote(id){
    if(!id) return
    const req = await DELETE("/notes",id)
    const res = await req.json()
    if(!req.ok) return
    dispatch(_delete({ name:"notes", id }))
  }
  
  const notes = useSelector(state => state.my_state.data.notes)
  return(
    <>
      <div className="p-5 w-full">
        
        <TitleBar 
          title="Notes"
          text="Quickly write and save your important ideas and information."
          icon="fa-solid fa-note-sticky"
        />
        
        {/*Add Notes*/}
        <AddAndUpdateForm 
          title="Add Note"
          fildConfig={fildConfig}
          fildData={formData} 
          submitButtonFunc={AddNote} />
          
          
          
        {/*Print Error*/}
        { !notes.length && <p className="mt-5 text-red-400 font-bold">Empty Notes</p> }
        {/*PRINT NOTES*/}
        {
          !!notes.length && <div className="grid md:grid-cols-2 gap-4">
            {
              notes?.map((note)=>{
              console.log(note)
                return(
                  <div className="p-5 rounded-xl shadow-2xl">
                    <p className="font-bold">{note.title}</p>
                    <p >{note.description}</p>
                    <div className="flex gap-3">
                      <Button func={()=>EditNote(note)} text="Edit" />
                      <Button func={()=>DeleteNote(note._id)} text="Delete" />
                    </div>
                  </div>
                )
              })
        }
          </div>
        }
      </div>
    </>
    )
}


