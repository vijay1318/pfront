import React, { useContext, useEffect, useState } from 'react'
import Ct from './Ct'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  let [data,setdata]=useState({"token":"","_id":"","name":"","role":"","cartlength":0})
  let obj=useContext(Ct)
  let navigate=useNavigate()
 useEffect(()=>{
  obj.updstate(data)
  navigate("/")
 },[])
  
  return (
    <div>Logout</div>
  )
}

export default Logout