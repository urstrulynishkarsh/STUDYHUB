import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import { COURSE_STATUS } from '../../../../utils/constants';
import Swal from 'sweetalert2';
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseDetailAPI';
import { setCourse } from '../../../Slice/courseSlice';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { useNavigate } from 'react-router-dom';
import { formattedDate } from '../../../../utils/dateFormatter';
import { HiClock } from 'react-icons/hi';
import { FaCheck } from 'react-icons/fa';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { formatDate } from '../../../../services/formatDate';

const CourseTable = ({courses,setCourses}) => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {token}=useSelector((state)=>state.auth);
    const [loading,setLoading]=useState(false);
    const TRUNCATE_LENGTH = 30
    // console.log("courses my",courses)

    const handleDelete = (courseId) => {
        Swal.fire({
          title: "Delete Section",
          text: "Are you sure you want to Delete Course?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, Delete",
          cancelButtonText: "Cancel",
        }).then(async (result) => {
          if (result.isConfirmed) {
              setLoading(true);
              await deleteCourse({courseId:courseId},token)
              const result =await fetchInstructorCourses(token);
              if(result)
              {
                setCourses(result)
              }
              setLoading(false)
          }
        });
      };
  return (
   
        <Table className="rounded-xl border border-richblack-800 ">
      <Thead>
        <Tr className="flex gap-x-10 bg-richblack-5 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
          <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-800">Courses</Th>
          <Th className="text-left text-sm font-medium uppercase text-richblack-800">Duration</Th>
          <Th className="text-left text-sm font-medium uppercase text-richblack-800">Price</Th>
          <Th className="text-left text-sm font-medium uppercase text-richblack-800">Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {
            courses.length===0?
            (<Tr>
                <Td className="py-10 text-center text-2xl font-medium text-richblack-100" >
                    No Courses Found
                </Td>
            </Tr>):(
                courses?.map((course)=>(
                    <Tr key={course._id} className="flex gap-x-10 border-b bg-richblue-300 border-richblack-800 px-6 py-8">
                        <Td className="flex flex-1 gap-x-4">
                        <img src={course?.thumbnail} alt={course?.courseName}  className='h-[150px] w-[220px] rounded-lg object-cover'/>
                        <div className='flex flex-col justify-between'>
                            <p className="text-lg font-semibold text-richblack-5">{course.courseName}</p>
                            <p className="text-xs text-richblack-300"> {course.courseDescription.split(" ").length >
                      TRUNCATE_LENGTH
                        ? course.courseDescription
                            .split(" ")
                            .slice(0, TRUNCATE_LENGTH)
                            .join(" ") + "..."
                        : course.courseDescription}</p>
                            <p className="text-[12px] text-white">Created: {formatDate(course?.createdAt)}</p>
                            {course.status === COURSE_STATUS.DRAFT ? (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                        <HiClock size={14} />
                        Drafted
                      </p>
                    ) : (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                       
                          <FaCheck className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700" size={8} />
                      
                        Published
                      </p>
                    )}
                        </div>

                        </Td>
                        <Td className="text-sm font-medium text-richblack-100">
                            2hr 30min
                        </Td>
                        <Td className="text-sm font-medium text-richblack-100">
                           ${course.price}
                        </Td>
                        <Td className="text-sm font-medium text-richblack-100 ">
                         <button disabled={loading} 
                         onClick={()=>navigate(`/dashboard/edit-course/${course._id}`)}
                         title="Edit"
                         className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                         >
                            <FiEdit2 size={20} />
                         </button>

                         <button disabled={loading} onClick={()=>handleDelete(course._id)}                     title="Delete"
                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]">
                         <RiDeleteBin6Line size={20}/>
                         </button>
                        </Td>
                    </Tr>
                ))
            )
        }
      </Tbody>
    </Table>
  
  )
}

export default CourseTable