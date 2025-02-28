import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import Ct from './Ct'
import cookie from "js-cookie"

const Login = () => {
    let navigate=useNavigate()
    let obj=useContext(Ct)
    let [data,setdata]=useState({"_id":"","password":""})
    let [ct,setct]=useState({})
    let [msg,setMsg]=useState("")
    let fun=(e)=>{
        setdata({...data,[e.target.name]:e.target.value})
    
    }

    let login=()=>{
        axios.post("http://localhost:5000/login",data).then((res)=>{
        obj.updstate(res.data)      
        navigate("/home")
            
        })
    }
  return (
    <div className='loginmain'>
        <div className='loginform'>
            <div className='emain'><input type='text' name='_id' onChange={fun} placeholder='Enter Email'/><i class="fa-solid fa-user"></i></div>
            <div className='pass'><input type='text' name='password' onChange={fun} placeholder='Enter password' /><i class="fa-solid fa-lock"></i></div>
            <div className='check'><lable><input type='checkbox'/>Remember me</lable>  
            <a href='#' >forgot password?</a>
            </div>
            <div className='btn'><button onClick={login}>Login</button></div>
            <div className='reg'><p>Don't have an account?</p> <a href='./sinup' >Register</a> </div>
        </div>
    </div>
  )
}

export default Login