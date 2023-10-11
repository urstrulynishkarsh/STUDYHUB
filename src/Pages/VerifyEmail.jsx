import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from '../components/common/Spinner'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { sendOtp, signUp } from '../services/operations/authAPI'
import {BsArrowCounterclockwise} from 'react-icons/bs'

const VerifyEmail = () => {
    const {signupData,loading}=useSelector((state)=>state.auth)
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [otp, setOtp] = useState('');

    useEffect(()=>{
        if(!signupData)
        {
            navigate("/signup")
        }
    })
    const handleOnSubmit=(e)=>{
        e.preventDefault();
        const{ accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            }=signupData
        dispatch(signUp(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate))

        
    }
  return (
    <div className='text-white justify-center text-center mt-48 items-center flex flex-col'>
    {
     loading?(<Spinner/>):( 
        <div>
        <h1 className='text-richblack-5 text-left resetpassword'>
        Verify email
      </h1>
      <p className='text-md w-[370px] text-left text-richblack-300 text-[16px] mt-3'>
      A verification code has been sent to you. Enter the code below
      </p>

      <form onSubmit={handleOnSubmit} >

        <OTPInput
         value={otp}
         onChange={setOtp}
         numInputs={6}
        //  renderSeparator={<span>-</span>}
         renderInput={(props) => <input {...props} 
         placeholder='-'
         style={{
            marginTop:'20px',
            width: '60px', // Set the width of each input field
            height: '50px', // Set the height of each input field
            fontSize: '16px', // Set the font size
            marginRight: '10px', // Add some spacing between input fields
            border: '1px solid #ccc', // Add a border to each input field
            borderRadius: '4px', // Add rounded corners
            textAlign: 'center', 
            color: 'black', // Set the text color to black// Center the text within the input field
          }}
         />}
        
        
        
        />
    
          
          
        <div>
        <button type='submit'  className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[170px] font-medium text-richblack-900">
          Verify Email
        </button>
        </div>
      </form>

      <div className='flex justify-between'>

      <div className=' text-left mt-3'>
        <Link to="/login">
          <div className='flex items-center gap-2'>
          <FaArrowLeft/>
          <p>Back to login</p>
          </div>
        </Link>
      </div>

      <div className='text-right mt-3'>

        <button onClick={()=>dispatch(sendOtp(signupData.email,navigate))} className='flex items-center gap-1 text-[#7be986]'>
            <BsArrowCounterclockwise/>
            Resend it
        </button>
        </div>
      

      </div>


        </div>)
}
</div>
  )
}

export default VerifyEmail