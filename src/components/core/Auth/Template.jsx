import React from 'react'

import {FcGoogle} from 'react-icons/fc'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import frameImage from '../../../assets/Images/frame.png'

const Template=({title,desc1,desc2,image,formtype})=>{
  return (
    <div className='bg-richblack-900'>
    <div className='w-11/12   flex max-w-[1160px] gap-[15rem] py-12 mx-auto gap-y-0 gap-x-15 flex-row'>
        <div className='w-11/12 max-w-[450px]'>
            <h1 className='lg:text-4xl xl:text-4xl md:text-3xl sm:text-4xl text-3xl text-richblack-5 font-semibold  leading-[2.375rem]'>{title}</h1>
            <p className='text-[1.125rem] leading-[1.625rem] mt-4'>
            <span className='text-richblack-100'>{desc1}</span><br/>
            <span className='text-blue-100 italic'>{desc2}</span>
            </p>
            
            {formtype==="signup"?(<SignupForm />):(<LoginForm />)}
            <div className='flex flex-row w-full items-center my-4 gap-x-2'>
                <div className='w-full h-[1px] bg-richblack-700'></div>
                <p className='text-richblack-700 font-medium leading[1.375rem]'>OR</p>
                <div className='w-full h-[1px] bg-richblack-700'></div>
            </div>
            <button className='w-full flex justify-center items-center rounded-[8px] border border-richblack-700 px-[12px] py-[8px] gap-x-2 mt-6 font-medium text-richblack-700'>
                <FcGoogle/>
                <p>Signup with Google</p>
            </button>

        </div>
        <div className='flex relative xl:block lg:block md:block hidden flex-col w-11/12 max-w-[450px]'>
            <img src={frameImage}
            alt="pattern"
            width={558}
            height={504}
            loading='lazy'
            />
            <img className='absolute top-[-1rem] right-[1rem]' src={image}
            alt="pattern"
            width={558}
            height={490}
            loading='lazy'
            />
        </div>
    </div>
    </div>
  )
}

export default Template