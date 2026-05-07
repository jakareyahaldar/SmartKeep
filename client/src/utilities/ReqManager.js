const Api = import.meta.env.VITE_API_URL
import { loading, popup, confirmBox } from "./Alert.js"

const def_payload = {
        credentials: "include",
        headers: {"content-type": "application/json"}
      }

export async function POST(route,data){
    loading(true)
    try{
      const payload = {...def_payload,
        method: "POST",
        body: JSON.stringify(data)
      }
      const req = await fetch(Api+route,payload)
      loading(false)
      return req
      
    }catch(err){
      loading(false)
      popup("Error","Faild to add Note!")
    }
  }
  
  
export async function DELETE(route,params){
    if(! await confirmBox("Delete","Are you sure!"))return
    loading(true)
    try{
      const payload = {...def_payload,
        method: "DELETE",
      }
      const req = await fetch(`${Api}${route}/${params}`,payload)
      loading(false)
      return req
    }catch(err){
      loading(false)
      popup("Error","Can't delete!")
    }
  }
  
export async function PUT(route,finder,data){
  if(! await confirmBox("Edit","Are you sure!"))return
    loading(true)
    try{
      const payload = {...def_payload,
        method: "PUT",
        body: JSON.stringify(data)
      }
      const finderr = finder ? `/${finder}` : ""
      const req = await fetch(`${Api}${route}${finderr}`,payload)
      loading(false)
      return req
    }catch(err){
      loading(false)
      popup("Error","Can't Edit!")
    }
  }