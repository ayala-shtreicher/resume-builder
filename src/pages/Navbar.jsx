import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate=useNavigate()
    const handleClick=(ref)=>{
        navigate(`${ref}`)
    }
    return (
        <ul className="nav">
        <li className="nav-item">
          <a className="nav-link active"  onClick={()=>handleClick('/signup') } style={{cursor:"pointer"}}>Sign up</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={()=>handleClick('/')}  style={{cursor:"pointer"}}>Log in</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={()=>handleClick('/logout')}  style={{cursor:"pointer"}}>Log out</a>
        </li>
        
      </ul>
      
    )
}
