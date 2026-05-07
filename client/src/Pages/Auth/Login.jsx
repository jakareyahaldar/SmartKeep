import { useNavigate } from "react-router-dom"
import { useCookies } from 'react-cookie';
import { useState } from "react"
import Button from "../../Components/Button.jsx"
import Input from "../../Components/Input.jsx"
import me from "../../assets/me.JPG"
import { popup, loading } from "../../utilities/Alert.js"
import { getData } from "../../feature/my_state/my_state_slice.js"
import { useDispatch } from "react-redux"

export default function Login() {
  const Api = import.meta.env.VITE_API_URL
  const [, setCookie] = useCookies("jack_system")
  const Navigate = useNavigate()
  const dispatch = useDispatch()
  
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")

  function saveLogin(token) {
    setCookie("jack_system", token)
  }

  async function Go() {
    loading(true)
    try {
      const req = await fetch(Api+"/admin/login", {
        method: "post",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          email: username, password
        })
      })
      const res = await req.json()
      if (!req.ok) {
        popup("Error",res.message)
        loading(false)
        return
      }
      saveLogin(res.token)
      dispatch(getData())
      Navigate("/")
    }catch(err) {
      popup("Error",err.message)
    }
    loading(false)
  }

  return(
    <div className="h-dvh w-dvw flex justify-center items-center">
      <div className="flex flex-col gap-2 items-center">
        <img className="h-24 w-24 object-cover rounded-full" src={me} alt="...." />
      <div className="flex flex-col gap-3">
        <Input
          type="text"
          onChangeFunc={(e)=> setUserName(e.target.value)}
          value={username}
          placeholder="Enter Username." />
        <Input
          type="password"
          onChangeFunc={(e)=> setPassword(e.target.value)}
          value={password}
          placeholder="Enter Password." />
        <Button func={Go} text="Login" />
      </div>
    </div>
  </div>
)
}