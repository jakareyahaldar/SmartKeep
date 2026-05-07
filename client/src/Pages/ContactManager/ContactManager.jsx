import React, { useState } from "react";
import AddAndUpdateForm from "../../Components/AddAndUpdateContainerForm.jsx"
import TitleBar from "../../Components/TitleBar.jsx"
import { useSelector, useDispatch } from "react-redux"
import { add, edit, _delete } from "../../feature/my_state/my_state_slice.js"
import { Link } from "react-router-dom"
import { POST, PUT, DELETE } from "../../utilities/ReqManager.js"
import { popup } from "../../utilities/Alert.js"

const EmptyForm = {
  name: "",
  email: "",
  phone: "",
  facebook: ""
}

function getFacebookUsername(url) {
  try {
    const parts = url.split("/")
    return parts.filter(Boolean).pop()
  }catch {
    return ""
  }
}

export default function ContactManager() {

  const dispatch = useDispatch()
  const [ formData, setForm ] = useState(EmptyForm)

  const contacts = useSelector(state => state.my_state.data.contacts)

  const fildConfig = [{
    name: "name",
    placeholder: "Enter Name:",
    value: formData.name,
    chengeEvent: (e)=>setForm(prev => ({
      ...prev, name: e.target.value
    })),
    type: "text"
  },
    {
      name: "email",
      placeholder: "Enter Email:",
      value: formData.email,
      chengeEvent: (e)=>setForm(prev => ({
        ...prev, email: e.target.value
      })),
      type: "email"
    },
    {
      name: "phone",
      placeholder: "Enter Phone:",
      value: formData.phone,
      chengeEvent: (e)=>setForm(prev => ({
        ...prev, phone: e.target.value
      })),
      type: "text"
    },
    {
      name: "facebook",
      placeholder: "Facebook URL:",
      value: formData.facebook,
      chengeEvent: (e)=>setForm(prev => ({
        ...prev, facebook: e.target.value
      })),
      type: "url"
    }]

  async function AddContact(e) {
    e.preventDefault()
    const name = "contacts"
    
    // remove extra data
    const data = {}
    for (const key of Object.keys(EmptyForm)){
      data[key] = formData[key]
    }
    
    // saveing new contact
    const req = !formData._id ? await POST("/contacts",formData) : await PUT("/contacts",formData._id,data)
    const res = await req.json()
    
    // up[date ui]
    if(!formData._id){
      dispatch(add({ name, data: res }))
    }else{
      dispatch(edit({ name, data: formData }))
    }
    
    setForm(EmptyForm)
  }

  function editContact(data) {
    setForm(data)
  }

  async function deleteContact(id) {
    if(!id){
      popup("error","An error Occor id Not Found!")
      return
    }
    const req = await DELETE("/contacts",id)
    if(!req.ok){
      popup("Error","Cant Delete!")
      return
    }
    dispatch(_delete( { name: "contacts", id }))
  }

  return(
    <div className="p-5 w-full">

      <TitleBar
        title="Contacts"
        text="Store and manage your personal and professional contacts."
        icon="fa-regular fa-address-book"
        />

      <AddAndUpdateForm
        title={formData.id ? "Update Contact": "Add Contact"}
        fildConfig={fildConfig}
        fildData={formData}
        submitButtonFunc={AddContact}
        />

      {contacts.length === 0 ? (
        <div className="text-center text-gray-500 border rounded-xl p-10 mt-5">
          No contacts saved
        </div>
      ): (

        <div className="mt-5 gap-3 grid md:grid-cols-3">

          {contacts.map((item)=> {

            const username = getFacebookUsername(item.facebook)

            return(
              <div
                key={item.id}
                className="p-4 bg-white shadow rounded-xl border space-y-2"
                >

                <div className="flex justify-between items-center">

                  <h3 className="text-lg font-semibold">{item.name}</h3>

                  <div className="flex gap-2">

                    <button
                      onClick={()=>editContact(item)}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg"
                      >
                      Edit
                    </button>

                    <button
                      onClick={()=>deleteContact(item._id)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg"
                      >
                      Delete
                    </button>

                  </div>

                </div>

                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Email:</span> {item.email}
                </p>

                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Phone:</span> {item.phone}
                </p>

                {item.facebook && (

                  <div className="flex items-center gap-2">

                    <img
                    src={`https://graph.facebook.com/${username}/picture?type=small`}
                    onError={(e)=> {
                      e.target.onerror = null
                      e.target.src = "https://cdn-icons-png.flaticon.com/512/733/733547.png"
                    }}
                    className="w-4 h-4 rounded-full"
                    />

                  <Link
                    to={item.facebook}
                    target="_blank"
                    className="text-blue-600 font-medium hover:underline text-sm"
                    >
                    @{username}
                  </Link>

                </div>

              )}

            </div>
          )

          })}

      </div>

    )}

  </div>
)
}