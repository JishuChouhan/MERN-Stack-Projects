import React from 'react'
import { NavBarLinks } from '../../data/NavBarLinks';
import { Link, matchPath } from 'react-router-dom';
import logo from "../../assets/Logo/mylogo.png"
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
const NavBar = () => {

  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);
  const {totalItems} = useSelector((state) => state.cart);

  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({path:route}, location.pathname);
  }

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
              NavBarLinks.map((link, index) => (
                <li key={index}>
                  {
                    link.title === "Catalog" ? (<></>) : (
                      <Link to={link?.path}>
                        <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25" }`}>
                          {link.title}
                        </p>
                      </Link>
                    )
                  }
                </li>
              ))
            }
          </ul>
        </nav>

        <div className="flex gap-x-4 items-center">
          
        </div>
        </div>
    </div>
  )
}

export default NavBar