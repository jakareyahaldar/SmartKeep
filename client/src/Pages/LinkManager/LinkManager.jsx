import React, { useState } from "react";
import AddAndUpdateForm from "../../Components/AddAndUpdateContainerForm.jsx"
import TitleBar from "../../Components/TitleBar.jsx"

import { useSelector, useDispatch } from "react-redux"
import { add, edit, _delete } from "../../feature/my_state/my_state_slice.js"
import { Link } from "react-router-dom"
import { POST, PUT, DELETE } from "../../utilities/ReqManager.js"

const EmptyForm = {
  title: "",
  url: "",
  note: ""
}

export default function LinksManager(){

  const dispatch = useDispatch()
  const [formData,setForm] = useState(EmptyForm)

  const links = useSelector(state => state.my_state.data.links)

  const fildConfig = [
  {
    name: "title",
    placeholder: "Link Title:",
    value: formData.title,
    chengeEvent: (e)=>setForm(prev => ({...prev, title: e.target.value})),
    type: "text"
  },
  {
    name: "url",
    placeholder: "Enter URL:",
    value: formData.url,
    chengeEvent: (e)=>setForm(prev => ({...prev, url: e.target.value})),
    type: "url"
  },
  {
    name: "note",
    placeholder: "Write Note:",
    value: formData.note,
    chengeEvent: (e)=>setForm(prev => ({...prev, note: e.target.value})),
    type: "text",
    element: "textarea"
  }
  ]

  async function AddLink(e){
    e.preventDefault()
    const  name = "links"
    
    // remove extra data 
    const data = {} 
    for(const key of Object.keys(EmptyForm)){
      data[key]= formData[key]
    }
    // request to server
    const req = !formData._id ? await POST("/links",formData) : await PUT("/links",formData._id,data)
    const res = await req.json()
    // update ui
    if(!formData._id){
      dispatch(add({ name, data: res }))
    }else{
      dispatch(edit({ name, data: formData }))
    }
    setForm(EmptyForm)
  }

  function editLink(data){
    setForm(data)
  }

 async function deleteLink(id){
    if(!id){
      popup("error","An error Occor id Not Found!")
      return
    }
    const req = await DELETE("/links",id)
    if(!req.ok){
      popup("Error","Cant Delete!")
      return
    }
    
    dispatch(_delete({name:"links",id}))
  }

  return(
    <div className="p-5 w-full">

      <TitleBar 
          title="Links|Urls"
          text="Save your Fevarite And Usefull Urls."
          icon="fa-solid fa-link"
        />

      <AddAndUpdateForm
        title={formData.id ? "Update Link" : "Add Link"}
        fildConfig={fildConfig}
        fildData={formData}
        submitButtonFunc={AddLink}
      />

      {links.length === 0 ? (
        <div className="text-center text-gray-500 border rounded-xl p-10 mt-5">
          No links saved
        </div>
      ) : (

        <div className="mt-5 gap-3 grid md:grid-cols-3">

          {links.map((item)=>(

            <div
              key={item.id}
              className="p-4 bg-white shadow rounded-xl border space-y-2"
            >

              <div className="flex justify-between items-center">

                <h3 className="text-lg font-semibold">{item.title}</h3>

                <div className="flex gap-2">

                  <button
                    onClick={()=>editLink(item)}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={()=>deleteLink(item._id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg"
                  >
                    Delete
                  </button>

                </div>

              </div>

              <div className="flex items-center gap-2">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 text-blue-500"
                  fill="currentColor"
                >
                  <path d="M3.9 12a5 5 0 017.1 0l1 1-1.4 1.4-1-1a3 3 0 10-4.2 4.2l2.8 2.8a3 3 0 004.2 0l1-1 1.4 1.4-1 1a5 5 0 01-7.1 0L3.9 16.2a5 5 0 010-7.1z"/>
                  <path d="M20.1 12a5 5 0 00-7.1 0l-1 1 1.4 1.4 1-1a3 3 0 114.2 4.2l-2.8 2.8a3 3 0 01-4.2 0l-1-1-1.4 1.4 1 1a5 5 0 007.1 0l2.8-2.8a5 5 0 000-7.1z"/>
                </svg>

                <Link
                  to={item.url}
                  target="_blank"
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  Open Link
                </Link>

              </div>

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