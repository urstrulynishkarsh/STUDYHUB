import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from '../components/common/Spinner'
import { Link, useLocation } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { resetPassword } from '../services/operations/authAPI'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const UpdatePassword = () => {

    const dispatch= useDispatch();
    const location=useLocation();

    const [formData,setFormData]=useState(
        {
            password:"",
            confirmPassword:""
        }
    )

    const [showPassword,setShowPassword]=useState(false)
    const [showConfirmPassword,setShowConfirmPassword]=useState(false)
    const {loading}=useSelector((state)=>state.auth)
   

    const {password,confirmPassword}=formData;

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
      }

    const handleOnSubmit=(e)=>{
        e.preventDefault();
        const token=location.pathname.split('/').at(-1);
        dispatch(resetPassword(password,confirmPassword,token))
         // Reset
    setFormData({
        password: "",
        confirmPassword: "",
      })
    }

  return (
    <div className='text-white justify-center text-center mt-48 items-center flex flex-col'>
        {
         loading?(<Spinner/>):( 
            <div>
            <h1 className='text-richblack-5 text-left resetpassword'>
            Choose  new password
          </h1>
          <p className='text-md w-[370px] text-left text-richblack-300 text-[16px] mt-3'>
          Almost done. Enter your new password and youre all set.
          </p>

          <form onSubmit={handleOnSubmit} >
        
                <label >
                <p className="mb-1 text-left mt-6 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              New Password <sup className="text-pink-200">*</sup>
            </p>
                  <input 
                  type={showPassword?"text":'password'}
                   name="password"
                   value={password}
                   onChange={handleOnChange}
                   placeholder='Enter your Password'
                   className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    />

             <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute ml-[-41px] mt-3 z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
                </label>


                <label >
                <p className="mb-1 text-left mt-6 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm New Password <sup className="text-pink-200">*</sup>
            </p>
                  <input 
                type={showConfirmPassword?"text":'password'}
                   name="confirmPassword"
                   value={confirmPassword}
                   onChange={handleOnChange}
                   placeholder='Enter your confirm Password'
                   className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    />

<span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute ml-[-41px] mt-3 z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
                </label>
              
            <div>
            <button type='submit'  className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[135px] font-medium text-richblack-900">
              Reset Password
            </button>
            </div>
          </form>

          <div className=' text-left mt-3'>
            <Link to="/login">
              <div className='flex items-center gap-2'>
              <FaArrowLeft/>
              <p>Back to login</p>
              </div>
            </Link>
          </div>


            </div>)
}
    </div>
  )
}

export default UpdatePassword