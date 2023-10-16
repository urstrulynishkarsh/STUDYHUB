import React, { useEffect, useState } from 'react'
import { Link, Navigate, matchPath ,useLocation} from 'react-router-dom'
import logo from '../../assets/White & Black Modern Photography Logo/2-removebg-preview (1).png'
import {NavbarLinks} from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import { AiOutlineClose, AiOutlineMenu, AiOutlineShoppingCart } from 'react-icons/ai'

import {RiArrowDropDownLine} from 'react-icons/ri'
import { apiConnector } from '../../services/ApiConnector'
import { categories } from '../../services/api'
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { ACCOUNT_TYPE } from '../../utils/constants'
import { BsChevronDown } from 'react-icons/bs'
import { fetchCourseCategories } from '../../services/operations/courseDetailAPI'
import ConfirmationModal from './ConfirmationModal'
import MobileMenu from './MobileMenu'




export const Navbar = () => {

    const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [confirmationModal,setConfirmationModal]=useState(null)




  useEffect(() => {
    const getCategories = async () => {
        setLoading(true)
        const categories = await fetchCourseCategories()
        if (categories.length > 0) {
          // console.log("categories", categories)
          setSubLinks(categories)
        }
        setLoading(false)
      }
      getCategories();
  }, [])



  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };




  // console.log("sub links", subLinks)

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }


    // Toggle menu function
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
      setConfirmationModal({
        navbarLinks: NavbarLinks,
        subLinks:subLinks
      })
    };

  return (
    <div className='h-16 z-50   border-b-[1px] border-pink-100 fixed w-full top-0  bg-black'>
         <div className="flex  py-3 max-w-maxContent items-center xl:justify-around lg:justify-around md:justify-around justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" className='w-32  ' loading="lazy" />
        </Link>
        {/* Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks?.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks.length ? (
                          <>
                            {subLinks
                              ?.filter(
                                (subLink) => subLink?.courses?.length > 0
                              )
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink?.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
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
        {/* Login / Signup / Dashboard */}
        <div className=" items-center  gap-x-4 md:flex ">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className=" lg:block xl:block md:block hidden rounded-[8px] border border-richblack-700 bg-[#6674cc] px-[12px] py-[8px] text-[#fff]">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px]  lg:block xl:block md:block hidden  border border-richblack-700 bg-[#6674cc] px-[12px] py-[8px] text-[#fff]">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && (<div className='ml-[5rem] sm:ml-[20rem] lg:ml-0 md:ml-0 xl:ml-0'><ProfileDropDown /> </div>)}
        </div>
        <button className="mr-4 md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? (
            /* If menu is open, display close icon */
            <AiOutlineClose  className="w-10    rounded-md bg-headText py-[2px] transition-all duration-300" fontSize={50} fill="#AFB2BF" />
          ) : (
            /* If menu is closed, display menu icon */
            <AiOutlineMenu className="w-10  rounded-md bg-headText py-[2px] transition-all duration-300" fontSize={50} fill="#AFB2BF" />
          )}
        </button>

      </div>


      {
  isMenuOpen && confirmationModal && <MobileMenu modalData={confirmationModal} onLinkClick={handleLinkClick} />
}




    


  
    </div>
  )
}
