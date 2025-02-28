import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Reg = () => {
    let navigate=useNavigate()
    let [data,setdata]=useState({"_id":'',"name":"","password":"","gender":"","phno":""})
    let [msg,setmsg]=useState("")
    let fun=(e)=>{
        setdata({...data,[e.target.name]:e.target.value})
    }
    let login=()=>{   
      if(data._id!=""&&data.name!=""&&data.phno!=""&&data.password!=""&&data.gender!=""){
       
        axios.post("http://localhost:5000/register",data).then((res)=>{
         
          if(res.data.msg=="reg done"){
            console.log("ok");
            setmsg("msg")
            navigate("/login")
          }
          else{
            setmsg(res.data.msg)
          }
        })
      }
      else{
        setmsg("enter all fields")
      }
    }


  return (
    <div className='signmain'>
    <div className='signform'>
      {msg!=="" && <div className='text-danger'>{msg}</div>}
        <div className='emain'><input type='text' name='_id' onChange={fun} placeholder='Enter Email'/><i class="fa-solid fa-user"></i></div>
        <div className='pass'><input type='text' name='name' onChange={fun} placeholder='Enter name'/></div>
        <div className='emain'> <input type='text' name='password' onChange={fun} placeholder='Enter password' /><i class="fa-solid fa-lock"></i></div>
        <div className='pass'> <input type='text' name='phno' onChange={fun} placeholder='Enter phone number'/></div>
        <div className='regcheck'><p>Gender:</p> <input type='radio' name='gender' value="male" checked={data.gender=="male"} onChange={fun} /> Male
         <input type='radio' name='gender' onChange={fun}  value="female"/>Female
        </div>
        <div className='btn'><button onClick={login}>Register</button></div>
        <div className='reg'><p>Do you  have an account?</p> <a href='./login' >Login</a> </div>
    </div>
</div>
  )
}

export default Reg