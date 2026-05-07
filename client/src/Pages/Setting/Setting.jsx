import { useNavigate } from "react-router-dom"
import { useCookies } from 'react-cookie';
import { confirmBox } from "../../utilities/Alert.js"


export default function Setting(){
  const navigate = useNavigate()
  
  const [,, removeCookie ] = useCookies("jack_system")
  
  const setting_config = [
  {
    icon: "fa-solid fa-fingerprint",
    text: "Change Email & Password",
    click: ()=>{navigate("/chenge-cred")}
  },
  {
    icon: "fas fa-sign-out",
    text: "Logout",
    click: async ()=>{
      if(! await confirmBox("Logout","Are you sure to logout?"))return
      removeCookie("jack_system")
      navigate("/login")
    }
  }
  ]
  
  return(
    <div className="w-full p-5">
      
      <div className="flex gap-10 items-center my-4">
        <i className="fa-solid fa-left-long"></i>
        <p className="font-bold">Setting</p>
      </div>
      <input className=" rounded-md shadow-md w-full block m-auto px-2 py-1" type="search" placeholder="Search setting"/>
      <ul className="my-4 grid gap-4">
        {
        setting_config?.map(sett => <LI key={sett.icon} icon={sett.icon} text={sett.text} click={sett.click} />)
        }
      </ul>
    </div>
    )
}

function LI({icon,text,click}){
  return <li onClick={click} className="flex gap-2 items-center hover:shadow-md">
          <i className={icon}></i>
          {text}
        </li>
}