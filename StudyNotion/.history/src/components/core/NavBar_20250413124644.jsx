import React, { useEffect, useState } from "react";
import { NavBarLinks } from "../../data/NavBarLinks";
import { Link, matchPath } from "react-router-dom";
import logo from "../../assets/Logo/mylogo.png";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropdown from "./Auth/ProfileDropdown";
import { ApiConnector } from "../../services/ApiConnector";
import { categories } from "../../services/Apis";

const NavBar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);


  const fetchSublinks = async() => {
    try{
      const result = ApiConnector("GET", categories.CATEGORIES_API);
      console.log("Printing Sublinks result:", result);
      setSubLinks(result.data.data);
    }catch(e){
      console.log("Could not fetch the category list");
      
    }
  }

  useEffect(() => {
    fetchSublinks();
  }, [])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-richblack-700">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <Link to="/">
          <img src={logo} width={60} height={10} alt="" />
        </Link>

        {/* Nav Links */}
        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavBarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div>
                    <p>{link.title}</p>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* login/signUp/Dashboard */}
        <div className="flex gap-x-4 items-center">
          {
            // use const file for use Instrictor
            user && user?.accountType != "Instructor" && (
              <Link to="dashboard/cart" className="relative">
                <AiOutlineShoppingCart />
                {
                  // abb styling
                  totalItems > 0 && <span>{totalItems}</span>
                }
              </Link>
            )
          }
          {token === null && (
            <Link to="/login">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-lg">Log in</button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-lg">Sign Up</button>
            </Link>
          )}
          {
            token !== null && <ProfileDropdown /> 
          }
        </div>
      </div>
    </div>
  );
};

export default NavBar;
