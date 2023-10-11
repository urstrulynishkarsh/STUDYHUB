import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchInstructorCourses } from '../../../services/operations/courseDetailAPI'
import IconBtn from '../../common/IconBtn'
import { BiPlusCircle } from 'react-icons/bi'
import CourseTable from './InstructorCourses/CourseTable'

const MyCourses = () => {

    const {token}=useSelector((state)=>state.auth)
    const navigate=useNavigate()
    const [courses,setCourses]=useState([]);

    useEffect(()=>{
        const fetchCourses=async()=>{
            const result=await fetchInstructorCourses(token)
            // console.log("result in my courses",result)
            if(result)
            {
                setCourses(result);
            }
        }
        fetchCourses();
    },[])
  return (
    <div className='h-[100%]'>
             <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
            <IconBtn
            text={"Add Courses"}
           
            onclick={()=>navigate("/dashboard/add-course")}
        
            >    <BiPlusCircle/></IconBtn>
        </div>

        {
            courses && <CourseTable courses={courses} setCourses={setCourses}/>
        }
    </div>
  )
}

export default MyCourses