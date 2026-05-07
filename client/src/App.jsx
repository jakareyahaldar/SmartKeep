import { BrowserRouter, Routes, Route } from "react-router-dom"
import Footer from "./Components/Footer.jsx"
import NoteManager from "./Pages/NoteManager/NoteManager.jsx"
import PasswordManager from "./Pages/PasswordManager/PasswordManager.jsx"
import ContactManager from "./Pages/ContactManager/ContactManager.jsx"
import LinkManager from "./Pages/LinkManager/LinkManager.jsx"
import TaskManager from "./Pages/TaskManager/TaskManager.jsx"
import Setting from "./Pages/Setting/Setting.jsx"
import ChangeLoginDetails from "./Pages/Setting/ChangeLoginDetails.jsx"
//import Dashbord from "./Components/Dashbord.jsx"
import { useSelector, useDispatch } from "react-redux"
import Navbar from "./Components/Navbar.jsx"
import Sidebar from "./Components/SideBar.jsx"
import Search from "./Components/Search.jsx"
import Login from "./Pages/Auth/Login.jsx"
import PrivetComponent from "./Pages/Auth/PrivetComponent.jsx"
import { useEffect } from "react"
import { getData } from "./feature/my_state/my_state_slice.js"

export default function App(){
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(getData())
  },[])
  
  //const my_state = useSelector( state => state.my_state )
  
  return(
    <>
      <div className="p-5 flex">
        <BrowserRouter>
          <Routes>
            <Route element={<PrivetComponent />} >
              <Route path="/" element={<NoteManager />} />
              <Route path="/passwords" element={<PasswordManager />} />
              <Route path="/contacts" element={<ContactManager />} />
              <Route path="/links" element={<LinkManager />} />
              <Route path="/tasks" element={<TaskManager />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/chenge-cred" element={<ChangeLoginDetails />} />
            </Route>
            <Route path="/login" element={<Login />} />
            
            {/*<Route path="/" element={<Dashbord />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </>)
}