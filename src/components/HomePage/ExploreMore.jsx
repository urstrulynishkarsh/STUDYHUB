import React, { useState } from 'react'
import { HighlightText } from './HighlightText'
import {HomePageExplore} from '../../data/homepage-explore'
import { CourseCard } from './CourseCard'



// take tabname for selection
const tabsName=[
    "Free",
    'New to coding',
    'Most popular',
    'Skills paths',
    'Career paths',
]

export const ExploreMore = () => {
    const [currentTab,setCurrentTab]=useState(tabsName[0]);
    const [courses,setCourses]=useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading);

    const setMyCard=(value)=>{
        setCurrentTab(value)
        const result= HomePageExplore.filter(((course)=>course.tag===value))
        setCourses(result[0].courses)
        setCurrentCard(result[0].courses[0].heading)
    }
  return (
    <div className=' flex flex-col items-center justify-center  mb-5 mx-auto'>
        <h1 className='lg:text-4xl xl:text-4xl md:text-4xl sm:text-4xl text-2xl font-semibold lg:ml-0 xl:ml-0 md:ml:0 sm:ml-0 ml-[-50px] '>
        Unlock the <HighlightText text={"Power of Code"} />
        </h1>
        <p className='text-md text-richblack-300 text-[16px] mt-3 text-center lg:ml-0 xl:ml-0 md:xl:0 sm:ml-0 ml-[-50px]   '>Learn to Build Anything You Can Imagine</p>


        <div className='flex rounded-full bg-richblack-800 mt-5 border-richblack-100  px-2 py-2 lg:ml-0 xl:ml-0 md:ml:0 sm:ml-0 ml-[-30px] '>
            {
                tabsName.map((element,index)=>{
                    return(
                        <div className={`lg:text-[16px] xl:text-[16px] md:text-[16px] sm:text-[16px] text-[10px]
                         ${currentTab===element?"bg-blue-300 text-richblack-5 font-medium":"text-pink-200"} 
                         rounded-full transition-all duration-200 cursor-pointer
                          hover:text-richblack-5 hover:bg-blue-300 md:px-7 lg:px-7 xl:px-7 sm:px-7 md:py-2 lg:py-2 xl:py-2 sm:py-2   px-2 py-2`} key={index} onClick={()=>setMyCard(element)}>
                        {element}
                        </div>
                    )
                })
            }
        </div>


        <div className="hidden lg:block xl:block  lg:h-[200px]"></div>

      {/* Cards Group */}
      <div className="lg:absolute gap-10 lg:ml-0 xl:ml-0 md:ml:0 sm:ml-0 ml-[-20px] justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] lg:mt-0 xl:mt-0 mt-10 text-black lg:mb-0 mb-7 lg:px-0 px-3">
        {courses.map((ele, index) => {
          return (
            <CourseCard
              key={index}
              cardData={ele}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          );
        })}
      </div>

    </div>
  )
}
