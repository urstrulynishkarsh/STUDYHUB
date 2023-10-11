import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {GrAddCircle} from 'react-icons/gr'
import IconBtn from '../../../../common/IconBtn';
import { useDispatch, useSelector } from 'react-redux';
import NextedView from './NextedView';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { setCourse, setEditCourse, setStep } from '../../../../Slice/courseSlice';
import { toast } from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailAPI';

const CourseBuilderForm = () => {
    const {register,handleSubmit,setValue,formState:{errors}}=useForm();
    const dispatch=useDispatch();
    const {course}=useSelector((state)=>state.course);
    const {token}=useSelector((state)=>state.auth);

    const [loading,setLoading]=useState(false)
    const [editSectionName,setEditSectionName]=useState(null);




    const onSubmit=async(data)=>{
        setLoading(true)
        let result;
        if(editSectionName){
            result=await updateSection({
                sectionName:data.sectionName,
                sectionId:editSectionName,
                courseId:course._id
            },token)
        }
        else{
            result=await createSection({
                sectionName:data.sectionName,
                courseId:course._id
            },token)
        }
        // values update 
        if(result)
        {
            dispatch(setCourse(result))
            setEditSectionName(null)
            setValue("sectionName","")
        }
        // loading false
        setLoading(false)

        
    }

 
    const cancelEdit=()=>{
        setEditSectionName(null)
        setValue("sectionName","")
    }

    const goBack=()=>{
        dispatch(setStep(1))
        dispatch(setEditCourse(true));
    }
    const goToNext=()=>{
        if(course?.courseContent?.length===0)
        {
            toast.error("Please add atleast one section")
            return
        }
        if(course?.courseContent?.some((section)=>section.subSection.length===0))
        {
            toast.error("Please add atleast one lecture in each section")
            return
        }
        dispatch(setStep(3));
    }
    const handleChangeEditSection=(sectionId,sectionName)=>{
        if(editSectionName===sectionId)
        {
            cancelEdit();
            return
        }

        setEditSectionName(sectionId)
        setValue("sectionName",sectionName)

    }
  return (
    <div     className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
    <form
    onSubmit={handleSubmit(onSubmit)}

  >
    <p className="mb-14 text-3xl font-medium text-richblack-5">Course builer Form</p>

    <div>
    <label className="text-sm text-richblack-5" htmlFor="sectionName">
              Section Name <sup className="text-pink-200">*</sup>
              </label>
        <input id='sectionName'
        placeholder='Add Section Name'
        {...register("sectionName",{required:true})}
        className='text-richblack-800 h-10 rounded-md px-4 w-full'
        />
        {
            errors.sectionName &&(
                <span className="ml-2 text-xs tracking-wide text-pink-200">Section Name is Required</span>
            )
        }
    </div>
        <div className=' mt-3 flex w-full'>
            <IconBtn
            className='flex flex-row-reverse'
            type="Submit"
            text={editSectionName?"Edit Section Name":"Create Section"}
            outline={true}
            >
                <GrAddCircle/>
            </IconBtn>
            {
                editSectionName &&(
                    <button type='button' onClick={cancelEdit} className='text-md text-richblack-300 underline ml-10'>Cancel Edit </button>
                )
            }

        </div>


    </form>


{
    course?.courseContent?.length>0 &&(
        <NextedView handleChangeEditSection={handleChangeEditSection} editSectionName={editSectionName}/>
    )
}

<div className='flex justify-end gap-x-3 mt-10'>
<button onClick={goBack} className='rounded-md cursor-pointer flex items-center bg-richblack-400 px-8'>
<MdNavigateBefore />
    Back
</button>
<IconBtn
          
              text={"Next"}
              onclick={goToNext}
            >
              <MdNavigateNext />
            </IconBtn>
</div>

    </div>
  )
}

export default CourseBuilderForm