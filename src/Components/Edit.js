import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import Ct from "./Ct"

const Edit = () => {
    let [prod,setprod]=useState({"_id":"","prodname":"","prodprice":"","proddesc":"","prodcat":""})
    let [msg,setmsg]=useState("")
    let [msgimg,setimg]=useState("")
    let fs=new FormData()
    let obj=useContext(Ct)


    useEffect(()=>{
        setprod(obj.state.proddata)
    },[])
    let fun=(e)=>{
        setprod({...prod,[e.target.name]:e.target.value})
    }

    let edit=()=>{
        axios.put("http://localhost:5000/edit",prod,{"headers":{"authorization":obj.state.token,"uid":obj.state._id}}).then((res)=>{
            setmsg(res.data.msg)
        })
    }
    let fun1=(e)=>{
        fs.append("prodimage",e.target.files[0])
    }
    let editimage=()=>{
        fs.append("_id",prod._id)
        fs.append("oldimage",prod.prodimage)
        axios.put("http://localhost:5000/editimage",fs,{"headers":{"authorization":obj.state.token,"uid":obj.state._id}}).then((res)=>{
            setimg(res.data.msg)
        })
        
    }
  return (
    <div>{prod!=undefined &&
            <div>
                <div>
                        {
                            msg!=""&&<div style={{"color":"green"}}>{msg}</div>
                        }
                        <label>Title: <input type='text' name='prodname' onChange={fun} placeholder='Enter name' value={prod.prodname}/></label>
                        <label>Name : <input type='text' name='prodprice' onChange={fun} placeholder='Enter price' value={prod.prodprice}/></label>
                        <label>Description :<input type='text' name='proddesc' onChange={fun} placeholder='Enter desc' value={prod.proddesc}/></label>
                        <label>Category :<input type='text' name='prodcat' onChange={fun} placeholder='Enter cat' value={prod.prodcat}/></label>
                        <button onClick={edit}>Edit</button>
                </div>
                        {
                        msgimg!=""&&<div style={{"color":"green"}}>{msgimg}</div>
                        }
                <div>
                        <label>Select file:<input type='file' onChange={fun1}/></label>
                        <button onClick={editimage}>Addimage</button>
                </div>
            </div>
}
        </div>
       

      
  )
}

export default Edit