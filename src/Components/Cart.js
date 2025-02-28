import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import cookie from "js-cookie"
import Ct from './Ct'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  let [data,setdata]=useState([])
  let [msg,setmsg]=useState("")
  let [f,setf]=useState(true)
  let obj=useContext(Ct)
  let navigate=useNavigate()

  
  useEffect(()=>{
    axios.get(`http://localhost:5000/getcart/${obj.state._id}`,{"headers":{"authorization":obj.state.token}}).then((res)=>{
      if(res.data.msg=="Your Cart was Empty"){
        setmsg(res.data.msg)
        setdata([])
      }
      else{
        setdata(res.data)
        setmsg("")
      }
    })
  },[f])



  let dec=(cid,qty)=>{
    if(qty>1){
      axios.get(`http://localhost:5000/dec/${cid}`,{"headers":{"authorization":obj.state.token}}).then((res)=>{
        setf(!f)
      })
    }
    else{
      axios.delete(`http://localhost:5000/del/${cid}`,{"headers":{"authorization":obj.state.token}}).then((res)=>{
        obj.updstate({"cartlength":res.data.cartlength}) 
        setf(!f)
      })
    }
    
  }
  let inc=(cid)=>{
      axios.get(`http://localhost:5000/inc/${cid}`,{"headers":{"authorization":obj.state.token}}).then((res)=>{
         setf(!f)
       })
    
  }
  let del=(cid)=>{
    axios.delete(`http://localhost:5000/del/${cid}`,{"headers":{"authorization":obj.state.token}}).then((res)=>{
      obj.updstate({"cartlength":res.data.cartlength})
      setf(!f)
    })
  }
  let km=(oo)=>{
    obj.updstate({"proddata":oo})
    console.log(obj);
    
    navigate("/km")

}
  return (
    <div className='cartmain'>
      
      {data.length==0 && msg=="Your Cart was Empty" &&<div className='cartmsg'>Your Cart is Empty</div>}
      
      {data.length>0 &&  data.map((item)=>{          
          return(
            <div className='cart'>
              <div className='cartimg'>
                  <img src={`http://localhost:5000/image/${item.cartimage}`} alt='abc'/>
              </div>
              <div className='cardtitle'>
                  <h3>{item.cartname}</h3>
                  <p><b>category:</b>{item.cartcat}</p>
                  <p><b>Price:</b>{item.cartprice}</p>
                  <p><b>Quantity: </b><button onClick={()=>dec(item._id,item.cartqty)} style={{"backgroundColor":"transparent","border":"1px","color":"darkblue"}}><i class="fa-solid fa-minus"></i></button>{item.cartqty}<button onClick={()=>inc(item._id)} style={{"backgroundColor":"transparent","border":"1px","color":"darkblue"}}><i class="fa-solid fa-plus"></i></button></p>
                  <p><b>Total :</b>{item.cartprice*item.cartqty}</p>
              </div>
              <div className='cardbut'>
                  <button className='btn btn-info'><i class="fa-solid fa-pen-to-square"></i></button>
                  <button className='btn btn-danger' onClick={()=>del(item._id)}><i class="fa-solid fa-trash"></i></button>
              </div>
              
            </div>
          )
        })
      
}

    </div>
  )
}

export default Cart