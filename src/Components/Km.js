import React, { useContext, useEffect, useState } from 'react'
import Ct from './Ct'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';




const Km = () => {
  let obj=useContext(Ct)
    let [prodobj,setProd]=useState("")
    let [rv,setRv]=useState({"text":"","rt":5})
    const [hover, setHover] = React.useState(-1);
    let navigate=useNavigate()
   
    useEffect(()=>{
      if(obj.state.proddata!=undefined){
        setProd(obj.state.proddata)
        console.log(prodobj);
        
      }
      else{
        let msg="error in some"
      }
    },[])

    let com=()=>{
      let data={...rv,"name":obj.state.name,"_id":prodobj._id}
      console.log(data);
      
        axios.put("http://localhost:5000/addcom",data,{"headers":{"authorization":obj.state.token}}).then((res)=>{
          setProd(res.data)
          console.log(res.data);
          
          setRv({text:"",rt:5})
        })
    }
    let addcart=()=>{
      console.log(prodobj);
      let data={"userid":obj.state._id,"prodid":prodobj._id,"cartname":prodobj.prodname,"cartimage":prodobj.prodimage,"cartprice":prodobj.prodprice,"cartcat":prodobj.prodcat,"cartqty":1}
      
      axios.post("http://localhost:5000/addcart",data,{"headers":{"authorization":obj.state.token}}).then((res)=>{
        obj.updstate({"cartlength":res.data.cartlength})
        window.confirm(res.data.msg)
    })
  }

    
  return (
    <div className='kmmain'>
       {prodobj!=""&&<div className='kmcart'>
             <div className='kmimg'>
               <img src={`http://localhost:5000/image/${prodobj.prodimage}`} alt='abc'/> 
            </div> 
            <div className='kmtitle'>
                <h3>{prodobj.prodname}</h3>
                <p><b>category:</b>{prodobj.prodcat}</p>
                <p><b>Price:</b>{prodobj.prodprice}</p>
                <p><b>description:</b>{prodobj.proddesc}</p>
                <h1>Comments :</h1>
                {prodobj.prodcom!=undefined && prodobj.prodcom.map((com)=>{
                    return(
                      <div className='kmcom'>
                      <h3>{com.name}</h3>
                      <p>{com.text}</p>
                      <Rating name="half-rating-read" defaultValue={com.rt} precision={0.5} readOnly />
                      </div>

                    )
                  })
                }{
                  obj.state.token!=""&&<div className='kmrating'>
                      
                      <textarea value={rv.text} onChange={(e) => setRv({...rv,[e.target.name]:e.target.value})} placeholder="Type here..."  name="text" rows="5" cols="50" />

                      <Rating name="hover-feedback" value={rv.rt} precision={0.5} onChange={(event, newValue) => {
                              setRv({...rv,"rt":newValue});
                          }} onChangeActive={(event, newHover) => {
                                setHover(newHover);
                                }}
                              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}    
                              />
                            <button onClick={com} className='btn btn-primary'>Addcom</button>
                  </div>
                }
            </div>
            <div className='cardbut'>
            <button className='btn btn-primary' onClick={()=>addcart()} ><i class="fa-solid fa-cart-shopping"></i></button>
            </div>
        </div>
}
    </div>
  )
}

export default Km