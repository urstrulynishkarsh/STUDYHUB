import React from 'react'
import { HighlightText } from './HighlightText'
import know_your_progress from '../../assets/Images/Know_your_progress.png'
import compare_with_others from '../../assets/Images/Compare_with_others.png'
import plan_your_lessons from '../../assets/Images/Plan_your_lessons.png'
import { CTAButton } from './CTAButton'

export const LearningSection = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-5 mb-16  mt-16 mx-auto'> 
        <div className='lg:text-4xl xl:text-4xl md:text-4xl sm:text-4xl text-2xl text-center md:text-center sm:text-center sm:mt-5 font-semibold'>
        Your swiss knife for
        <HighlightText text={"learning any language"} />
        </div>
        <div className='text-richblack-600 text-base font-medium w-[70%] text-center'>
        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>
        <div className='flex flex-row items-center justify-center mt-10'>
          <img src={know_your_progress} alt="know_your_progress" className=' -mr-32 lg:w-[30rem]  md:w-96 sm:w-72 w-48' />
          <img src={compare_with_others} alt="compare_with_others" className='  lg:w-[30rem]  md:w-96 sm:w-72 w-56' />
          <img src={plan_your_lessons} alt="plan_your_lessons" className=' -ml-36 lg:w-[30rem]  md:w-96 sm:w-72 w-48' />
        </div>

        <div>
          <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
        </div>

    </div>
  )
}
