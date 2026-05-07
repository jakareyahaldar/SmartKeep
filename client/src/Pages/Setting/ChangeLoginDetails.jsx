import { useState } from "react"
import { PUT } from "../../utilities/ReqManager.js"
import Form from "../../Components/AddAndUpdateContainerForm.jsx"
import { popup } from "../../utilities/Alert.js"

const EmptyState = {
  old: { email:"", password:"" },
  New: { email:"", password:"" }
}

export default function ChangeLoginDetails(){
  
  const [formData,setForm] = useState(EmptyState)
  const formConfig= [
    {
      name: "email",
      placeholder: "Enter Old Email:",
      value: formData?.old?.email,
      chengeEvent: (e)=>setForm(prev => ({ ...prev, old: {...prev.old, email: e.target.value} })),
      type: "email"
    },
    {
      name: "password",
      placeholder: "Enter Old Password:",
      value: formData?.old?.password,
      chengeEvent: (e)=>setForm(prev => ({ ...prev, old: {...prev.old, password: e.target.value} })),
      type: "password"
    },
    ]
  const formConfig2= [
    {
      name: "email",
      placeholder: "Enter New Email:",
      value: formData?.New?.email,
      chengeEvent: (e)=>setForm(prev => ({ ...prev, New: {...prev.New, email: e.target.value} })),
      type: "email"
    },
    {
      name: "password",
      placeholder: "Enter New Password:",
      value: formData?.New?.password,
      chengeEvent: (e)=>setForm(prev => ({ ...prev, New: {...prev.New, password: e.target.value} })),
      type: "password"
    },
    ]
    
    
  async function SubmitChange(e){
    e.preventDefault()
    const data = ObjEmptyCleaner(formData)
    const req = await PUT("/admin/cngcred",null,data)
    if(req.ok){
      popup("Success","Password Chenged!")
      setForm(EmptyState)
    }else{
      const { message } = await req.json()
      popup("Error",message)
    }
  }
  
  return(
    <div className="w-full p-5">
      <p>For change email and password please login first and then change your email and password.</p>
      <Form
        title={"Old crediantials"}
        buttonText="Next"
        fildConfig={formConfig}
        fildData={formData.old}
        submitButtonFunc={null}
        hideButton={true}
        />
      <Form
        title={"Change crediantials"}
        fildConfig={formConfig2}
        fildData={formData.New}
        submitButtonFunc={SubmitChange}
        />
    </div>
    )
}


function ObjEmptyCleaner(data){
 const final = {
   old: {},
   New:{}
 } 
 if(data?.old?.email) final.old.email = data.old.email
 if(data?.old?.password) final.old.password = data.old.password
 if(data?.New?.email) final.New.email = data.New.email
 if(data?.New?.password) final.New.password = data.New.password
 return final
}