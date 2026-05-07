import { Outlet, Navigate } from "react-router-dom"
import { useCookies } from 'react-cookie';

import SideBar from "../../Components/SideBar.jsx"
import Search from "../../Components/Search.jsx"


export default function PrivetComponent(){
  
  const [ cookies, setCookie ] = useCookies("jack_system")
  const authenticated = cookies.jack_system ? true : false
  
  if(authenticated) return (
    <>
      <SideBar />
      <Search />
      <Outlet />
    </>
    )
  if(!authenticated) return <Navigate to="/login" />
  
}