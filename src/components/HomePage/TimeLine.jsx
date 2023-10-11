import React from 'react'
import logo1 from '../../assets/TimeLineLogo/Logo1.svg'
import logo2 from '../../assets/TimeLineLogo/Logo2.svg'
import logo3 from '../../assets/TimeLineLogo/Logo3.svg'
import logo4 from '../../assets/TimeLineLogo/Logo4.svg'
import timelineimage from '../../assets/Images/TimelineImage.png'


const timelime=[
  {
    logo:logo1,
    heading:"Leadership",
    description:"Fully committed to the success company"

  },
  {
    logo:logo2,
    heading:"Responsibility",
    description:"Students will always be our top priority"
  },
  {
    logo:logo3,
    heading:"Flexibility",
    description:"The ability to switch is an important skills"

  },
  {
    logo:logo4,
    heading:"Solve the problem",
    description:"Code your way to a solution"
  }
]
      


export const TimeLine = () => {
  return (
    <div className='flex xl:flex-row lg:flex-row flex-col  gap-20 items-center '>


<div className='flex flex-col gap-1 xl:w-[45%] lg:w-[45%] md:w-[70%] '>
  {timelime.map((element, index) => {
    return (
      <div className='flex flex-row gap-6' key={index}>
        <div className='flex flex-col '>
        <div className='w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center'>
          <img src={element.logo} className='no-resize ok' alt={`Logo ${index}`} />
        </div>
        {index !== timelime.length - 1 && (
        <div
          className={`w-[2px] h-[calc(70px)] ml-6 border-dashed border-l-2 ${
            index> element.id ? "border-yellow-50" : "border-richblack-500"
          }`}
        ></div>)}
        </div>
        <div className='flex flex-col gap-2'>
          <div className='font-semibold text-[18px]'>{element.heading}</div>
          <div className='text-base'>{element.description}</div>
        </div>
       
      </div>
    );
  })}
</div>


      <div className='flex flex-col  relative shadow-blue-200'> 
          <img src={timelineimage} alt='timelineimage' className='shadow-white object-cover h-fit'/>
          <div className='shadow-blue'></div>

          <div className='absolute yearportion bg-caribbeangreen-700 flex flex-row :flex-col-reverse text-white uppercase xl:py-7 lg:py-7 md:py-7 sm:py-7 py-5 translate-x-[-50%] tanslate-y-[10%] lg:top-[25rem] xl:top-[25rem] md:top-[30rem] sm:top-[30rem] top-[23rem] left-[50%]'>
              <div className=' flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-10'>
              <p className='xl:text-3xl lg:text-3xl md:text-3xl sm:text-3xl text-xl font-bold'>10</p>
              <p className='xl:text-sm lg:text-sm md:text-sm sm:text-sm text-[10px] text-caribbeangreen-300'>YEARS EXPERIENCES</p>
              </div>

             <div className=' flex gap-5 items-center px-10'>
              <p  className='xl:text-3xl lg:text-3xl md:text-3xl sm:text-3xl text-xl font-bold'>250</p>
              <p className='xl:text-sm lg:text-sm md:text-sm sm:text-sm text-[10px] text-caribbeangreen-300'>TYPES OF COURSES</p>
            </div>


          </div>
        </div>

    </div>
  )
}
