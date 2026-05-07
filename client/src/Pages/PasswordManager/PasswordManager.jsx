import React, { useState } from "react";
import AddAndUpdateForm from "../../Components/AddAndUpdateContainerForm.jsx"
//import Button from "../../Components/Button.jsx"
import TitleBar from "../../Components/TitleBar.jsx"
import { useSelector, useDispatch } from "react-redux"
import { add, edit, _delete } from "../../feature/my_state/my_state_slice.js"
import {POST,PUT,DELETE} from "../../utilities/ReqManager.js"
import { popup } from "../../utilities/Alert.js"

const EmptyForm = {
    site: "facebook",
    username: "",
    email: "",
    phone: "",
    password: "",
    note: ""
  }


export default function PasswordManager() {
  const dispatch = useDispatch()
  
  const [formData,setForm] = useState(EmptyForm)

  const passwords = useSelector(state => state.my_state.data.passwords)
  const fildConfig = [
  {
    name: "site",
    placeholder: "Enter site_name:",
    value: 'facebook',
    chengeEvent: (e)=>setForm(prev => ({...prev, site: e.target.value})),
    type: "text",
    element: "select",
    options: ["facebook","youtube","instagram","telegram","whatsapp"]
  },
  {
    name: "username",
    placeholder: "Enter username:",
    value: '',
    chengeEvent: (e)=>setForm(prev => ({...prev, username: e.target.value})),
    type: "url"
  },
  {
    name: "email",
    placeholder: "Enter Email:",
    value: '',
    chengeEvent: (e)=>setForm(prev => ({...prev, email: e.target.value})),
    type: "email"
  },
  {
    name: "phone",
    placeholder: "Enter Phone:",
    value: '',
    chengeEvent: (e)=>setForm(prev => ({...prev, phone: e.target.value})),
    type: "text"
  },
  {
    name: "password",
    placeholder: "Enter password:",
    value: '',
    chengeEvent: (e)=>setForm(prev => ({...prev, password: e.target.value})),
    type: "password"
  },
  {
    name: "note",
    placeholder: "Write Note:",
    value: '',
    chengeEvent: (e)=>setForm(prev => ({...prev, note: e.target.value})),
    type: "text",
    element: "textarea"
  },
  ]
  
  async function AddPassword(e){
    e.preventDefault()
    const data = {}
    for (const key of Object.keys(EmptyForm)){
      data[key] = formData[key]
    }
    
    console.log(formData)
    const req = !formData._id ? await POST("/passwords",formData) : await PUT("/passwords",formData._id,data)
    const res = await req.json()
    console.log(res)
    if(!req.ok){
      popup("Error",res.message)
      return
    }
    if(formData._id){
      const data = { name: "passwords", data:formData }
      dispatch(edit(data))
    }else{
      dispatch(add({ name:"passwords", data: res }))
    }
    
    //dispatch(add({ name:"passwords", data: res }))
    setForm(EmptyForm)
  }
  
  function editPass(data){
    setForm(data)
  }
  async function deletePass(id){
    if(!id){
      popup("Not found","Id not found!")
    }
    const req = await DELETE("/passwords",id)
    if(req.ok){
       dispatch(_delete({name:"passwords",id}))
    }
  }
  
  
  return(
    <>
      <div className="p-5 w-full">
        
        <TitleBar 
          title="Passwords"
          text="Safely store and access your important passwords."
          icon="fa-solid fa-key"
        />
        
        {/*Add Notes*/}
        <AddAndUpdateForm 
          title="Add Password"
          fildConfig={fildConfig}
          fildData={formData}
          submitButtonFunc={AddPassword} />
          
          
          
        {passwords.length === 0 ? (
        <div className="text-center text-gray-500 border rounded-xl p-10 mt-5">
          No passwords saved
        </div>
      ) : (
        <div className=" mt-5 gap-3 grid md:grid-cols-3">
          {passwords.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-white shadow rounded-xl border space-y-2"
            >
              
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{item.site}</h3>

                <div className="flex gap-2">
                  <button onClick={()=>editPass(item)} className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg">
                    Edit
                  </button>

                  <button onClick={()=>deletePass(item._id)} className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg">
                    Delete
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-600">
                <span className="font-semibold">Username:</span> {item.username}
              </p>

              <p className="text-sm text-gray-600">
                <span className="font-semibold">Email:</span> {item.email}
              </p>

              <p className="text-sm text-gray-600">
                <span className="font-semibold">Phone:</span> {item.phone}
              </p>

              <p className="text-sm text-gray-600">
                <span className="font-semibold">Password:</span>{" "}
                <span className="font-mono">{item.password}</span>
              </p>

              <p className="text-sm text-gray-500 italic">
                {item.note}
              </p>

            </div>
          ))}
        </div>
      )}
        
      </div>
      
      
    </>
    )
}


