import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./Components/Home"
import Reg from "./Components/Reg"
import Login from "./Components/Login"
import Logout from "./Components/Logout"
import Nav from "./Components/Nav"
import Ct from "./Components/Ct"
import { useState } from "react"
import "./App.css"
import Cart from "./Components/Cart"
import Addcart from "./Components/Addcart"
import Km from "./Components/Km"
import Edit from "./Components/Edit"
import Main from "./Components/Main"

const App = () => {
  let [state,setState]=useState({"token":"","_id":"","name":"","role":"","cartlength":0})
  let updstate=(obj)=>{
    setState({...state,...obj})
  }

  let obj={"state":state,"updstate":updstate}
  return (
    <BrowserRouter>
    <Ct.Provider value={obj}>
    <Nav/>
  
    <Routes>
      <Route path="/" element={<Main/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/sinup" element={<Reg/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/addprod" element={<Addcart/>}/>
      <Route path="/km" element={<Km/>}/>
      <Route path="/edit" element={<Edit/>}/>
      <Route path="/logout" element={<Logout/>}/>
    </Routes>
    </Ct.Provider>
    </BrowserRouter>
  )
}

export default App