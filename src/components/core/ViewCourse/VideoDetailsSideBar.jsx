import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'
import {IoIosArrowBack} from 'react-icons/io'
import { BsChevronDown } from 'react-icons/bs'

const VideoDetailsSideBar = ({setReviewModal}) => {
    const [activeStatus,setActiveStatus]=useState("")
    const [videobarActive,setVideoBarActive]=useState("")
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const location=useLocation()
    const {sectionId,subSectionId}=useParams();
    const {courseSectionData,courseEntireData ,totalNoOfLectures,completedLectures}=useSelector((state)=>state.viewCourse)
    // console.log("courseSection data",courseSectionData)
    useEffect(()=>{
      ;(()=>{
        if(!courseSectionData.length)
        {
          return;
        }
        const currentSectionIndex=courseSectionData.findIndex((data)=>data._id===sectionId)
        const currenSubSectionIndex=courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data)=>data._id===subSectionId)
        const activeSubSectionId=courseSectionData[currentSectionIndex]?.subSection?.[currenSubSectionIndex]?._id;
        // set current subsection here 
        setActiveStatus(courseSectionData?.[currentSectionIndex]?._id)
        // set current subSectionId here  
        setVideoBarActive(activeSubSectionId); 
      })()
    },[courseSectionData,courseEntireData,location.pathname])
     

  return (
    <>
    <div className="flex h-[calc(100vh-3.5rem)] w-[300px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-[#f8f9fa] py-10">
      {/* for buttons and heading */}
      <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
          <div className="flex w-full items-center justify-between ">
        {/* button */}
        <div
              onClick={() => {
                navigate(`/dashboard/enrolled-courses`)
              }}
              className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
              title="back"
            >
              <IoIosArrowBack size={30} />
            </div>
            {/* for heading and title  */}
           
            <IconBtn
              text="Add Review"
              customClasses="ml-auto"
              onclick={() => setReviewModal(true)}
            />
         
        </div>
        <div className="flex flex-col">
            <p className='text-richblack-900 '>{courseEntireData?.courseName}</p>
            <p className="text-sm font-semibold text-richblack-500">
              {completedLectures?.length ||0} / {totalNoOfLectures}
            </p>
          </div>
      </div>  

      {/* for section subsection */}
   
      <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
        {
          courseSectionData.map((section,index)=>(
            <div  className="mt-2 cursor-pointer text-sm text-richblack-5" onClick={()=>setActiveStatus(section?._id)} key={index}>
                {/* section */}
                <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                <div className="w-[70%] font-semibold">
                    {section?.sectionName}
                  </div>
                  <div className="flex items-center gap-3">
                  <span className="text-[12px] font-medium">
                    Lession {section?.subSection.length}
                  </span>
                  <span
                    className={`${
                      activeStatus === section?.sectionName
                        ? "rotate-0"
                        : "rotate-180"
                    } transition-all duration-500`}
                  >
                    <BsChevronDown />
                  </span>
                </div>
               
                </div>

                {/* subsections */}
          
                  {
                    activeStatus===section?._id && (
                      <div className="transition-[height] duration-500 ease-in-out">
                        {
                          section.subSection.map((topic,index)=>(
                            <div
                            className={`flex gap-3  px-5 py-2 ${
                              videobarActive === topic._id
                                ? "bg-yellow-200 font-semibold text-richblack-800"
                                : "hover:bg-richblack-900"
                            } `}
                            key={index}
                            onClick={() => {
                              navigate(
                                `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`
                              )
                              setVideoBarActive(topic._id)
                            }}
                          >
                              <input
                        type="checkbox"
                        checked={completedLectures.includes(topic?._id)}
                            readOnly
                      />
                              <span>{topic.title}</span>

                            </div>
                          ))
                        }
                      </div>
                    )
                  }
                </div>

         
          ))
        }

      </div>

    </div>
    </>
  )
}

export default VideoDetailsSideBar