import React from 'react'
import { Link } from 'react-router-dom'
import {FaArrowRight} from "react-icons/fa"
import { HighlightText } from '../components/HomePage/HighlightText'
import { CTAButton } from '../components/HomePage/CTAButton'
import Banner from '../assets/Images/banner.mp4'
import { CodeBlocks } from '../components/HomePage/CodeBlocks'
import { TimeLine } from '../components/HomePage/TimeLine'
import { LearningSection } from '../components/HomePage/LearningSection'
import { Instructor } from '../components/HomePage/Instructor'
import { Footer } from '../components/common/Footer'
import { ExploreMore } from '../components/HomePage/ExploreMore'
import ReviewSlider from '../components/common/ReviewSlider'
import { useSelector } from 'react-redux'
import { Fade } from 'react-reveal'

export const HomePage = () => {

    const {token}=useSelector((state)=>state.auth)
    // console.log("my token",token)
  return (

    <div>
       
        {/* section 1  */}
        <div className='relative flex flex-col mx-auto justify-center items-center text-white w-11/12'>
        <Fade bottom cascade duration={1500}>
            {/* <div className='green '></div> */}
        <Link to={"/signup"}>
                <div className='group mt-16 shadow1 p-1 w-fit mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95'>
                    <div className='flex items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
                        <p>Become an Instructor </p>
                        <FaArrowRight/>
                    </div>
                </div>
        </Link>
    
        <div className='text-center lg:text-4xl xl:text-4xl md:text-4xl text-2xl font-semibold mt-7'>
            Empower Your Future With
            <HighlightText text={"Coding Skills"}/>
        </div>

        <div className='mt-4 w-[80%] text-center lg:text-lg xl:text-lg md:lg:text-lg text-sm font-bold text-richblack-300'>
        With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
        </div>

    

        <div className='flex flex-row mt-8 gap-7'>
            <CTAButton linkto={"/signup"} active={true}>Learn More </CTAButton>
            <CTAButton linkto={"/login"} active={false}>Book Demo</CTAButton>
        </div>

        </Fade>

             {/* Video */}
             <Fade right distance='20%' duration={1700}>
             <div className="mx-3 mt-16 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video
            className="shadow-[20px_20px_rgba(255,255,255)]"
            muted
            loop
            autoPlay
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>
        </Fade>


        {/* code section */}
        
        <div>
            <CodeBlocks
             position={'lg:flex-row xl:flex-row md:flex-row flex-col-reverse'}
             heading={
                <div className='lg:text-4xl xl:text-4xl text-2xl font-semibold'>
                    Unlock Your
                    <HighlightText text={"Coding Course"}/>
                    {" "} With Our Online Course
                </div>
             }
             subheading={
               " With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors."
             }

             ctabtn1={
                {
                btnText:"Try it yourself",
                linkto:"/signup",
                active:true
                }

             }
             ctabtn2={
                {
                    btnText:"Learn More",
                    linkto:"/login",
                    active:false
                }
                
             }

             codeblock={`<!DOCTYPE html>
             <html>
             head><title>Example</
             title><linkrel="stylesheet"href="styles.css">
                 /head>
                 body>
                 h1><ahref="/">Header</a>
                 /h1>
                 nav><ahref="one/">One</a><ahref="two/">Two</
                 a><ahref="three/">Three</a>
                 /nav>
                  `}
             codecolor={"text-pink-25"}
             backgroundGradient={<div className="codeblock1 absolute"></div>}
             />
        </div>
        
        {/* code section */}
         <div>
            <CodeBlocks
             position={'lg:flex-row-reverse xl:flex-row-reverse md:flex-row-reverse flex-col '}
             heading={
                <div className='text-4xl font-semibold'>
                    Start
                    <HighlightText text={"Coding"}/> <br />
                    <HighlightText text={"in seconds"}/>
                </div>
             }
             subheading={
               " With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors."
             }

             ctabtn1={
                {
                btnText:"Continue Lesson",
                linkto:"/signup",
                active:true
                }

             }
             ctabtn2={
                {
                    btnText:"Learn More",
                    linkto:"/login",
                    active:false
                }
                
             }

             codeblock={`<!DOCTYPE html>
             <html>
             head><title>Example</
             title><linkrel="stylesheet"href="styles.css">
                 /head>
                 body>
                 h1><ahref="/">Header</a>
                 /h1>
                 nav><ahref="one/">One</a><ahref="two/">Two</
                 a><ahref="three/">Three</a>
                 /nav>
                  `}
             codecolor={"text-pink-50"}
             backgroundGradient={<div className="codeblock2 absolute"></div>}
             />
        </div>


        <ExploreMore/>



        </div>






        {/* section 2 */}
        
        <div className='bg-pure-greys-5 md:mt-[-10rem] mt-[-10rem] lg:mt-[0] xl:mt-[0]  text-richblack-700'>

            <div className='bg_home h-[310px] '>

                <div className='w-11/12 max-w-maxContent flex items-center  justify-center gap-5 mx-auto'>
                    {/* <div className='h-[50px]'></div> */}
                    <div className='flex flex-row mt-48 gap-7'>
                        <CTAButton linkto={"/signup"} active={true}>
                            <div className="flex gap-2 items-center">
                            Explore Full Catalog 
                            <FaArrowRight/> 
                            </div>
                            </CTAButton>
                        <CTAButton linkto={"/login"} active={false}>Book Demo</CTAButton>
                    </div>
                </div>

            </div>


            <div className='flex items-start w-11/12 mx-auto max-w-maxContent flex-col justify-between gap-7'>


                <div className='flex xl:flex-row lg:flex-row md:flex-row sm:flex-col flex-col gap-5 mt-16'>
                    <div className='text-4xl font-semibold xl:w-[50%] lg:w-[50%] md:w-[50%] sm:w-[90%] '>
                         Get the skills you need for a 
                        <HighlightText text={"job that is in demand."}/>
                    </div>
                    <div className='flex flex-col xl:w-[50%] lg:w-[50%] md:w-[50%] sm:w-[90%]  gap-10 items-start' >
                        <p className='text-[16px]'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                        <CTAButton  linkto={"/signup"} active={true}>Learn More </CTAButton>
                    </div>

                </div>



                <TimeLine/>

                <LearningSection/>

                

            </div>

        </div>









        {/* section 3 */}
           {/* Section 3 */}
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Become a instructor section */}
        <Instructor />

        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>










        {/* Footer section  */}
        <div className=''>

        <Footer/>
        </div>
        



    </div>
  )
}
