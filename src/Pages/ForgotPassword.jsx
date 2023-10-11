import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Spinner } from '../components/common/Spinner';
import { getPasswordResetToken } from '../services/operations/authAPI';
import {FaArrowLeft} from "react-icons/fa"

export const ForgotPassword = () => {

  const [emailSent,setEmailSent]=useState(false);
  const {loading}=useSelector((state)=>state.auth)
  const [email,setEmail]=useState("");
  const dispatch= useDispatch();



  const submitHandler=(e)=>{
    e.preventDefault();
    dispatch(getPasswordResetToken(email,setEmailSent));
  }
  return (
    <div className='text-white justify-center text-center mt-48 items-center flex flex-col'>
      {
        loading?(
        <Spinner/>):
        (<div>
              <div class=" grad  flex flex-1 absolute items-center justify-center">
                   
                    <div class=" circle orange "></div>
               
                    <div class=" circle purple"></div>
                  
                    <div class="circle yellow"></div>
                </div>
          <h1 className='text-richblack-5 text-left resetpassword'>
            {
              !emailSent?"Reset Your Password":"Check Your Email"
            }
          </h1>
          <p className='text-md w-[370px] text-left text-richblack-300 text-[16px] mt-3'>
            {
              !emailSent?"Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery":`We have sent the reset email to ${email}`
            }
          </p>

          <form onSubmit={submitHandler} >
            {
              !emailSent &&(
                <label >
                <p className="mb-1 text-left mt-6 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Email Address <sup className="text-pink-200">*</sup>
            </p>
                  <input type="text"
                   name="email"
                   id="email"
                   value={email}
                   onChange={(e)=>setEmail(e.target.value)}
                   placeholder='Enter your Email Address'
                   className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    />
                </label>
              )
            }
            <div>
            <button type='submit'  className={`${emailSent?"mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[135px] font-medium text-richblack-900":"mt-6 rounded-[8px] bg-yellow-50 py-[13px] px-[135px] font-medium text-richblack-900"}`} >
              {
                !emailSent?"Reset Password":"Resend Email"
              }
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
