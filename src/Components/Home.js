import React, { useEffect, useState } from 'react'
import cookies from "js-cookie"
import axios from 'axios'
import Card from './Card'

const Home = () => {
  let [data,setdata]=useState([])
  
  useEffect(()=>{
    axios.get("http://localhost:5000/getproddata").then((res)=>{
      setdata(res.data)
      })
  },[])
  return (
    <div className='cardmain'>
      {
        data.map((item)=>{
          return(
            <Card obj={item}/>
          )
        })
      }
    </div>
  )
}

export default Home