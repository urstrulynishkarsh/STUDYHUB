import React from 'react'
import { ContactUsForm } from '../components/common/ContactUsForm'
import { Footer } from '../components/common/Footer'
import {BsFillChatLeftDotsFill, BsGlobeAmericas} from "react-icons/bs"
import {BiSolidPhoneCall} from "react-icons/bi"
import ReviewSlider from '../components/common/ReviewSlider'

const Contact = () => {
  return (

    <div>
    <div className=' flex lg:flex-row xl:flex-row flex-col xl:mt-0 lg:mt-0 mt-96 gap-5 justify-center items-center mx-auto w-11/12 mb-24 max-w-maxContent'>
        <div className='flex flex-col bg-richblack-800 px-10 gap-y-6 py-10 mt-[-22rem] rounded-lg'>
            <div className='flex flex-row gap-4'>
                <BsFillChatLeftDotsFill className='text-4xl text-[#6edffb] bg-richblack-800'/>
                <div className='flex flex-col'>
                    <h1 className='text-2xl text-white font-semibold'>Chat on us</h1>
                    <p  className='text-richblack-300 font-medium'>Our friendly team is here to help.</p>
                    <a   className='text-richblack-300 font-medium' href="mailto:studyhub436@gmail.com">@studyhub436</a>
                </div>
            </div>
            <div className='flex flex-row gap-4'>
                <BsGlobeAmericas className='text-4xl text-[#6edffb] bg-richblack-800'/>
                <div className='flex flex-col'>
                    <h1 className='text-2xl text-white font-semibold' >Visit us</h1>
                    <p  className='text-richblack-300 font-medium'>Come and say hello at our office HQ.</p>
                    <p  className='text-richblack-300 font-medium'>HARIDWAR</p>
                </div>
            </div>
            <div className='flex flex-row gap-4'>
                <BiSolidPhoneCall className='text-4xl text-[#6edffb] bg-richblack-800'/>
                <div className='flex flex-col'>
                    <h1 className='text-2xl text-white font-semibold'>Call us</h1>
                    <p  className='text-richblack-300 font-medium'>Mon - Fri From 8am to 5pm</p>
                    <a  className='text-richblack-300 font-medium' href="tel:+123 456 7890">+123 456 7890</a>
                </div>
            </div>
            
        </div>
        <div className='flex flex-col mx-auto gap-4 bg-richblack-800 mt-16 justify-center items-center px-[-2rem] border-richblack-25 rounded-lg py-12  border'>
        <h1 className='lg:text-3xl xl:text-3xl md:text-2xl sm:text-2xl text-xl font-semibold text-white w-[70%] story2'>
        Got a Idea? We’ve got the skills. Let’s team up
        </h1>
        <p className='text-richblack-300 font-medium'>  
        Tall us more about yourself and what you’re got in mind.
        </p>
        <div>
            <ContactUsForm/>
        </div>

        

    </div>
   
    </div>
          {/* section 6 */}
          <section className='px-10'>
        <div>
        <h2  className="text-center mt-16 text-white text-4xl font-semibold  mb-16">Review From Other Learners</h2>
        </div>

        <div  className="mb-10">

        
        <ReviewSlider />
        </div>
      </section>
    <Footer/>
    </div>
  )
}

export default Contact