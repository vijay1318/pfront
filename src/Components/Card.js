import React, { useContext, useState } from 'react'
import axios from "axios"
import Ct from './Ct'
import Km from './Km'
import { useNavigate } from 'react-router-dom'

const Card = (props) => {
    let data=useContext(Ct)
     let obj=props.obj
     let navigate=useNavigate()


    let addcart=(item)=>{
        axios.post("http://localhost:5000/addcart",{"userid":data.state._id,"prodid":item._id,"cartimage":item.prodimage,"cartprice":item.prodprice,"cartname":item.prodname,"cartqty":1,"cartcat":item.prodcat},{"headers":{"authorization":data.state.token}}).then((res)=>{
        data.updstate({"cartlength":res.data.cartlength})
        window.confirm(res.data.msg)

        })
    }
    let km=(obj)=>{
        if (data.state.token!=""){
        data.updstate({"proddata":obj})
        navigate("/km")
        }
        else{
            navigate("/login")
        }

    }
    let delprod=(obj)=>{
        if (data.state.token!=""){
            console.log(obj);
            
        axios.delete(`http://localhost:5000/dele/${obj._id}`,{"headers":{"authorization":data.state.token,"uid":data.state._id}}).then((res)=>{
            navigate("/")
            console.log(res.data);
            
        })
    }
        else{
            navigate("/login")
        }
    }
    let edit=(obj)=>{
        data.updstate({proddata:obj})
        navigate("/edit")
    }
    

    return (
    <div className="card" >
        <div className='cardimg'>
            <img src={`http://localhost:5000/image/${obj.prodimage}`} alt='abc'/>
        </div>
        <div className='cardtitle'>
            <h3>{obj.prodname}</h3>
            <p><b>category:</b>{obj.prodcat}</p>
            <p><b>Price:</b>{obj.prodprice}</p>
        </div>
        <div className='cardbut'>
            <button className='btn btn-secondary' onClick={()=>km(obj)}>Knowmore..</button>
          {data.state.token!="" && <button className='btn btn-primary' onClick={()=>addcart(obj)} ><i class="fa-solid fa-cart-shopping"></i></button>}
          {data.state.role=="admin" && <button className='btn btn-info' onClick={()=>edit(obj)} ><i class="fa-solid fa-pen-to-square"></i></button>}
          {data.state.role=="admin" && <button className='btn btn-danger' onClick={()=>{delprod(obj)}}><i class="fa-solid fa-trash"></i></button>}
        </div>
    </div>
  )
}

export default Card