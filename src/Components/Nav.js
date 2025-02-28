import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Ct from './Ct'



const Nav = () => {
      
  let obj=useContext(Ct)
 
  return (
    <nav className='navbar'>
        <Link to="/"  className='name'>{obj.state.name.charAt(0)}</Link>
        <Link to="/home" className='favicon'><img src='./product.png' alt='abc'/></Link>
       {obj.state.token==="" &&<Link to="/login" >Login</Link>}
        {obj.state.token==""&&<Link to="/sinup">Sigup</Link>}
        {obj.state.token!==""&& <Link to="/cart">Cart<button style={{"color":"red","width":"0px","height":"0px","backgroundColor":"black","fontSize":"20px"}}>{obj.state.cartlength}</button></Link>}
        {obj.state.token!=="" && obj.state.role=="admin" && <Link to="/addprod" >addprod</Link>}
        {obj.state.token!=="" &&<Link to="/logout">Logout</Link>}
        
    </nav>
  )
}

export default Nav