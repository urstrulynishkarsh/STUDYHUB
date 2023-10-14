import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../components/Slice/viewCourseSlice';
import VideoDetailsSideBar from '../components/core/ViewCourse/VideoDetailsSideBar';
import CourseReviewModal from '../components/common/CourseReviewModal';
import { AiOutlineMenu } from 'react-icons/ai';

const ViewCourse = () => {
    const [reviewModal,setReviewModal]=useState(false);
    const {courseId}=useParams();
    const {token}=useSelector((state)=>state.auth)
    const  dispatch=useDispatch()
    const [showSideBar, setShowSideBar] = useState(true);

    const toggleSideBar = () => {
      setShowSideBar(!showSideBar);
    };
 


    useEffect(()=>{
        const setCourseSpecificDetails=async()=>{
            const courseData=await getFullDetailsOfCourse(courseId,token);
            // console.log("my course data",courseData)
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
            dispatch(setEntireCourseData(courseData.courseDetails))
            dispatch(setCompletedLectures(courseData.completedVideos))
            let lectures=0;
            courseData?.courseDetails?.courseContent?.forEach((sec)=>{
              lectures+=sec.subSection.length 
            })
            dispatch(setTotalNoOfLectures(lectures))
        }
        setCourseSpecificDetails();
    },[])

  return (
   <>
        <div className="relative mt-16 flex min-h-[calc(100vh-3.5rem)]">
        {showSideBar && <VideoDetailsSideBar setReviewModal={setReviewModal} />}
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-6 ">
       

          <button className="mr-4 mt-4 text-[#fff45c]   " onClick={toggleSideBar}>
          <AiOutlineMenu fontSize={50} fill="#fff45c" />
        </button>
            <Outlet />
          </div>
        </div>
      </div>


        {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
   </>
  )
}

export default ViewCourse