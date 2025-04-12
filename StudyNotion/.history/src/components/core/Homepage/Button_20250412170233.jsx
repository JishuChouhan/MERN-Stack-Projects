import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({children, active, linkto}) => {
  return (
    <Link to={linkto}>
    <div className={`text-center text-[13px] px-6 py-3 rounded-lg font-bold border-b-3 border-r-3 border-richblack-700
        ${active ? "bg-yellow-50 text-black" : "bg-richblack-800"} hover:scale-95 transition-all duration-200 hover:border-hidden`
        }> 
        {children}
    </div>
    </Link>
    
  )
}

export default Button;