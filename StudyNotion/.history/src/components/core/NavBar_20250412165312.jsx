import React from 'react'
import { NavBarLinks } from '../../data/NavBarLinks';
import { Link } from 'react-router-dom';
const NavBar = () => {
  return (
    <div className='flex h-10 items-center justify-center border-b-[1px] border-richblack-700'>
        <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <Link to="/">
        
        </Link>
        </div>
    </div>
  )
}

export default NavBar