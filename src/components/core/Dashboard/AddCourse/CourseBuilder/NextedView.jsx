import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {RxDropdownMenu} from 'react-icons/rx'
import { MdDelete, MdEdit } from 'react-icons/md'
import Swal from 'sweetalert2'
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailAPI'
import {BiSolidDownArrow} from 'react-icons/bi'
import {AiOutlinePlus} from 'react-icons/ai'
import SubSectionModal from './SubSectionModal'
import { setCourse } from '../../../../Slice/courseSlice'
import ConfirmationModal from '../../../../common/ConfirmationModal'


const NextedView = ({handleChangeEditSection,editSectionName}) => {
  const {course}=useSelector((state)=>state.course)
  const {token}=useSelector((state)=>state.auth)
  const dispatch=useDispatch();

  console.log("course in nexted view",course)

  const [addSubSection,setAddSubSection]=useState(null)
  const [viewSubSection,setViewSubSection]=useState(null)
  const [editSubSection,setEditSubSection]=useState(null)
  const [confirmationModal,setConfirmationModal]=useState(null)

  const handleDelete = (sectionId) => {
    Swal.fire({
      title: "Delete Section",
      text: "Are you sure you want to Delete Section?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
          const result1=await deleteSection({
            sectionId,courseId:course._id},
            token
            )
            console.log("Printing after delete section ",result1);
            if(result1)
            {
              dispatch(setCourse(result1));
            }

      }
    });
  };


  const deleteSubSectionOk=(subSectionId,sectionId) => {
    Swal.fire({
      title: "Delete Section",
      text: "Are you sure you want to Delete Sub Section?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result1= await deleteSubSection({subSectionId,sectionId,token})
          console.log("Printing after delete sub section ",result1);
          if(result1)
          {
            const updatedCourseContent=course.courseContent.map((section)=>section._id===sectionId?result1:section)
            console.log("updated course",updatedCourseContent)
            const updatedCourse={...course,courseContent:updatedCourseContent}
            console.log("updated course",updatedCourse)
            dispatch(setCourse(updatedCourse));
          }
    

      }
    });
  };



  return (
    <div>

      <div  className='text-white rounded-lg bg-richblack-700 p-6 px-8 '>
        {
          course?.courseContent?.map((section)=>(
            <details key={section?._id} open>
 <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
                  <div className='flex items-center gap-x-3'>
                    <RxDropdownMenu className="text-2xl text-richblack-50"/>
                    <p className="font-semibold text-richblack-50">{section?.sectionName}</p>
                  </div>
                  <div className='flex items-center gap-x-3'>
                    <button  onClick={()=>handleChangeEditSection(section._id,section.sectionName)} >
                      <MdEdit className="text-xl text-richblack-300"/> 
                    </button>
                    <button onClick={() => handleDelete(section._id)} >
                      <MdDelete className="text-xl text-richblack-300"/>
                    </button>
                    <span className="font-medium text-richblack-300">|</span>

                    <BiSolidDownArrow className={`text-xl text-richblack-300`}/>
                  </div>
              </summary>


              <div className="px-6 pb-4">
                {
                  section?.subSection?.map((data)=>(
                    <div key={data._id} onClick={()=>setViewSubSection(data)}                   className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2">
                      <div className='flex items-center gap-x-3 py-2'>
                        <RxDropdownMenu className="text-2xl text-richblack-50"/>
                        <p className="font-semibold text-richblack-50" >{data.title}</p>
                      </div>

                      <div onClick={(e)=>e.stopPropagation()} className='flex items-center gap-x-3'>
                        <button onClick={()=>setEditSubSection({...data,sectionId:section._id})}> 
                          <MdEdit className="text-xl text-richblack-300"/>
                        </button>
                        <button onClick={() => deleteSubSectionOk(data._id,section._id)}>
                        <MdDelete className="text-xl text-richblack-300"/>
                        </button>
                      
                      </div>
                    </div>

                  ))
                }
             <button
                    onClick={() => setAddSubSection(section._id)}
                    className='mt-4 flex items-center gap-x-2 text-yellow-50'
                    >
                        <AiOutlinePlus />
                        <p>Add Lecture</p>
                    </button>
              </div>

            </details>
          ))
        }
      </div>
      {addSubSection ? 
      (<SubSectionModal 
        modalData={addSubSection}
        setModalData={setAddSubSection}
        add={true}
      />) 
      :viewSubSection ? 
      (<SubSectionModal 
        modalData={viewSubSection}
        setModalData={setViewSubSection}
        view={true}
      />) 
      : editSubSection ? 
      (<SubSectionModal 
        modalData={editSubSection}
        setModalData={setEditSubSection}
        edit={true}
      />)
      : (<div></div>)
      }



{confirmationModal ? 
      (
        <ConfirmationModal modalData={confirmationModal} />
      )
      : (<div></div>)
        }

    </div>
  )
}

export default NextedView