import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import RenderSteps from '../AddCourse/RenderSteps';
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailAPI';
import { setCourse, setEditCourse } from '../../../Slice/courseSlice';

const EditCourse = () => {
    const dispatch=useDispatch();
    const {courseId}=useParams();
    const {course}=useSelector((state)=>state.course)
    const {token}=useSelector((state)=>state.auth)
    const [loading,setloading]=useState(false);


    useEffect(()=>{
        const populatedDetails=async()=>{
            setloading(true)
            const result= await getFullDetailsOfCourse(courseId,token)
            if(result?.courseDetails)
            {
                dispatch(setEditCourse(true))
                dispatch(setCourse(result?.courseDetails))
            }
            setloading(false);
        }
        populatedDetails();
    },[])

  return (
    <div >
        <h1 className="mb-14 text-3xl font-medium text-richblack-5">Edit Course</h1>
        {
            course?<RenderSteps />:(<p className="mb-14 text-3xl font-medium text-richblack-5">Course Not Found</p>)
        }
    </div>
  )
}

export default EditCourse