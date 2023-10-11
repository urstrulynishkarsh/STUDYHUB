import React from 'react'
import { HighlightText } from '../components/HomePage/HighlightText'
import BannerImage1 from '../assets/Images/aboutus1.webp'
import BannerImage2 from '../assets/Images/aboutus2.webp'
import BannerImage3 from '../assets/Images/aboutus3.webp'
import { Quote } from '../components/core/AboutPage/Quote'
import FoundingStory from '../assets/Images/FoundingStory.png'
import { StatsComponent } from '../components/core/AboutPage/StatsComponent'
import { LearningGrid } from '../components/core/AboutPage/LearningGrid'
import { ContactForm } from '../components/core/AboutPage/ContactForm'
import { Footer } from '../components/common/Footer'
import ReviewSlider from '../components/common/ReviewSlider'

export const AboutPage = () => {
  return (
    <div >
    <div className='flex flex-col   max-w-maxContent text-white justify-center items-center mt-32 mx-auto w-11/12'>
        {/* section 1 */}
            <h1 className='lg:text-4xl xl:text-4xl md:text-4xl sm:text-4xl text-xl font-semibold w-[60%] text-center '>
                Driving Innovation in Online Education for a 
                <HighlightText text={"Brighter Future"}/>
                </h1>
                <p className='text-richblack-300  font-medium text-[16px] w-[65%] text-center mt-5'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
        
                <div className='green1 xl:block lg:block sm:block  md:block hidden xl:mt-0 lg:mt-0 sm:mt-0 md:mt-0 mt-32 mr-72 z-[10]'></div>
            <div className='grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 grid-cols-1 gap-y-3  gap-x-3 mx-auto mt-10 z-10'>
      
                <img src={BannerImage1} />
                <img src={BannerImage2} />
                <img src={BannerImage3} />
            </div>
     

        {/* section 2 */}

        <section className='lg:text-3xl xl:text-3xl md:text-3xl sm:text-2xl text-xl mt-16 font-semibold w-[90%] text-center '>
                <Quote/>
        </section>


        {/* section 3 */}

        
            {/* foudning story wala div */}
            <div className='grid lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 grid-cols-1 mt-32 gap-16 mb-16'>
                {/* founding story left box */}
                <div className='flex flex-col gap-5'>
                    <h1 className='story font-semibold text-3xl'>Our Founding Story</h1>

                    <p className='text-richblack-300  font-medium text-[16px]'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>

                    <p className='text-richblack-300  font-medium text-[16px]'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                </div>
                {/* foudning story right box */}
                <div>
                    <img  className='w-[550px]'  src={FoundingStory} />
                </div>
            

            {/* vision and mission wala parent div */}
        
                {/* left box */}
                <div className='flex flex-col gap-5'>
                    <h1 className='story1 font-semibold text-3xl'>Our Vision</h1>
                    <p className='text-richblack-300  font-medium text-[16px]'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                </div>

                {/* right box */}
                <div  className='flex flex-col gap-5'>
                    <h1 className='story2 font-semibold text-3xl'>
                        Our Mission
                    </h1>
                    <p className='text-richblack-300  font-medium text-[16px]'>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                </div>
            </div>
   
</div>

      {/* section 4 */}

      <div>
      <StatsComponent/>
      </div>



      {/* section 5  */}

      <div className='w-11/12 mt-16 max-w-maxContent mx-auto flex flex-col items-center justify-center '>
        <LearningGrid/>
        <ContactForm/>
      </div>




      {/* section 6 */}
      <section className='px-10'>
        <div>
        <h2  className="text-center mt-16 text-white text-4xl font-semibold  mb-16">Review From Other Learners</h2>
        </div>

   
        <ReviewSlider className="mt-10" />

      </section>

      

      <Footer/>

    </div>
  )
}
