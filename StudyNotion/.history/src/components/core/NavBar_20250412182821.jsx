import React from 'react'
import { NavBarLinks } from '../../data/NavBarLinks';
import { Link } from 'react-router-dom';
import logo from "../../assets/Logo/mylogo.png"
const NavBar = () => {
  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-richblack-700'>
        <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <Link to="/">
        <img src={logo} width={60} height={10} alt="" />
        </Link>

        {/* Nav Links */}
        <nav>
          <ul className='flex gap-x-6 text-richblack-25'>
            {
              NavBarLinks.map((link, index) => {
                <li key={index}>
                  {
                    link.title === "Catalog" ? (div) : (
                      <Link to={link?.path}>
                        <p className='text-yellow-25'>
                          {link.title}
                        </p>
                      </Link>
                    )
                  }
                </li>
              })
            }
          </ul>
        </nav>
        </div>
    </div>
  )
}

export default NavBar