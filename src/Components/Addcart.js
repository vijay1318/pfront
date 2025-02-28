import React, { useContext, useEffect, useState } from 'react'
import cookies from "js-cookie"
import{useNavigate} from "react-router-dom"
import axios from "axios"
import Ct from './Ct'

const Addcart = () => {
  let [data,setdata]=useState({"prodname":"","prodcat":"","prodprice":1000,"proddesc":"","prodimage":""})
  //let obj=({"token":"","_id":"","name":'',"role":"","cartlength":0})
  let navigate=useNavigate()
  let obj=useContext(Ct)
  useEffect(()=>{
    if(obj.state.token==""){
      navigate("/login")
    }
  },[])

  let fun=(e)=>{
    setdata({...data,[e.target.name]:e.target.value})
  }
  let funi=(e)=>{
    setdata({...data,"prodimage":e.target.files[0]})
  }
  let addprod=()=>{
    let fd=new FormData()
    for(let p in data){
      fd.append(p,data[p])
    }
    axios.post("http://localhost:5000/addprod",fd,{"headers":{"authorization":obj.state.token,"uid":obj.state._id}}).then((res)=>{
      navigate("/home")
    })
  }

  return (
    <div>
      <div>
        <label>Title: <input type='text' name='prodname' onChange={fun} placeholder='Enter title'/></label>
        <label>Category: <input type='text' name='prodcat' onChange={fun} placeholder='Enter category'/></label>
        <label>Price: <input type='text' name='prodprice' onChange={fun} placeholder='Enter price'/></label>
        <label>description: <input type='text' name='proddesc' onChange={fun} placeholder='Enter desc'/></label>
        <label>Image: <input type='file' onChange={funi}/></label>
        <button onClick={addprod}>Add</button>
      </div>
    </div>
  )
}

export default Addcart