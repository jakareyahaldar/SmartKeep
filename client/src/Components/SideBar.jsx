import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

const my_config = [
  {
    name:"Notes",
    description: "Quickly write and save your important ideas and information.",
    icon: "fa-solid fa-note-sticky",
    path: "/"
  },
  {
    name:"Passwords",
    description: "Safely store and access your important passwords.",
    icon: "fa-solid fa-key",
    path: "/passwords"
  },
  {
    name:"Contacts",
    description: "Store and manage your personal and professional contacts.",
    icon: "fa-regular fa-address-book",
    path: "/contacts"
  },
  {
    name:"Tasks",
    description: "Create and track your daily tasks and to-do list.",
    icon: "fa-solid fa-clipboard-check",
    path: "/tasks"
  },
  {
    name:"Links",
    description: "Simple Sweet Nootes. Arranging All Important Notes.",
    icon: "fa-solid fa-link",
    path: "/links"
  },
  {
    name:"Setting",
    description: "App Setting Controls all global setting from here.",
    icon: "fa-solid fa-link",
    path: "/setting"
  },
  ]


export default function Sidebar(){

  const [ show, setShow ] = useState(false)
  const showState = show ? "left-5" : "-left-[75%]"
  
  
  function Toggle(){
    setShow(!show)
  }
  
  return(
    <>
      <aside className={"z-50 transition-[2s] w-[300px] min-h-[95dvh] bg-black text-white rounded-2xl md:relative md:left-0 fixed p-5 " + showState}>
        {show ? <i onClick={Toggle} className="md:hidden absolute top-1/2 -right-11 grid place-items-center rounded-full h-10 w-10  bg-black text-white  fa-solid fa-xmark"></i> : <i onClick={Toggle} className="md:hidden absolute top-1/2 -right-14 grid place-items-center rounded-full h-10 w-10  bg-black text-white  fas fa-bars"></i> }
        
        <div className="grid gap-3">
          {
            my_config.map( n => <NavigationalCard name={n.name} description={n.description} icon={n.icon} path={n.path} showSide={setShow} />)
          }
        </div>
        
        
      </aside>
    </>
    )
}


function NavigationalCard({name,description,icon, path, showSide}){
  const Navigate = useNavigate()
  const {pathname} = useLocation()
  
  const active = pathname === path ? "bg-white text-black shadow-xl" : "bg-blue-700 "
  
  function Go(){
    showSide(false)
    Navigate(path)
  }
  
  return(
      <div key={path} onClick={Go} className={"rounded-2xl p-3 relative " + active}>
        <i className={"absolute right-3 text-xl " + icon}></i>
        <h3 className="titleFont text-2xl font-bold ">{name}</h3>
        <p className="text-xs">{description}</p>
      </div>
    )
}