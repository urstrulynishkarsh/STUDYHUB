import React from 'react'
import { HighlightText } from './HighlightText'
import instructor from '../../assets/Images/Instructor.png'
import { CTAButton } from './CTAButton'
import { FaArrowRight } from 'react-icons/fa'

export const Instructor = () => {
  return (
    <div className='flex xl:flex-row lg:flex-row sm:flex-row md:flex-row flex-col mt-16  mx-auto gap-20'>
        <div className='xl:w-[50%] lg:w-[50%] md:w-[50%] sm:w-[50%] w-[100%] '>
            <img src={instructor} alt='instructor' className='instructor-shadow'/>

        </div>
        <div className='flex flex-col justify-center xl:w-[50%] lg:w-[50%] md:w-[50%] sm:w-[50%] w-[100%]  gap-5'>
            <h1 className='lg:text-4xl textportion   xl:text-4xl md:text-4xl sm:text-4xl text-2xl font-semibold xl:w-[50%] lg:w-[50%] md:w-[50%] sm:w-[50%] w-[100%]'>
                Become an 
                <HighlightText text={"instructor"}/>
            </h1>
            <p className='text-richblack-300 textportion  font-medium text-[16px]  xl:w-[80%] lg:w-[80%] md:w-[80%] sm:w-[80%] w-[100%] '> 
            Instructors from around the world teach millions of students on StudyHub. We provide the tools and skills to teach what you love.
            </p>


            <div className='w-fit textportion'>
                            <CTAButton linkto={"/signup"} active={true}>
                            <div className="flex gap-2 items-center">
                            Explore Full Catalog 
                            <FaArrowRight/> 
                            </div>
                            </CTAButton>
            </div>

        </div>
        
    </div>
  )
}
