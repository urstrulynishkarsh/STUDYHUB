import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../../common/IconBtn';
import { resetCourseState, setStep } from '../../../../Slice/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { editCourseDetails } from '../../../../../services/operations/courseDetailAPI';

const PublishCourse = () => {
    const {register,setValue,getValues,handleSubmit,formState:{errors}}=useForm();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {course}=useSelector((state)=>state.course)
    const {token}=useSelector((state)=>state.auth)
    const [loading,setLoading]=useState(false)

    useEffect(()=>{
        if(course?.status===COURSE_STATUS.PUBLISHED)
        {
            setValue('public',true)
        }
    },[])


    const gotoCourses=()=>{
        dispatch(resetCourseState())
        navigate('/dashboard/my-courses');
    }
    const handleCoursePublish=async()=>{
        if(course?.status=== COURSE_STATUS.PUBLISHED && getValues('public')===true || course?.status=== COURSE_STATUS.DRAFT && getValues('public')===false)
        {
            // no updation 
            // so we don't do any api call
            gotoCourses();
            return;
        }
        // if form data updated 
        const formData=new FormData();

        formData.append("courseId",course._id)
        const courseStatus=getValues('public')?COURSE_STATUS.PUBLISHED:COURSE_STATUS.DRAFT;
        formData.append('status',courseStatus)
        setLoading(true);
        const result =await editCourseDetails(formData,token);

        if(result)
        {
            gotoCourses();
        }
        setLoading(false);
    }


    const onSubmit=async(data)=>{
        handleCoursePublish();
    }


    const goBack=()=>{
        dispatch(setStep(2))
    }

   
  return (
    <div className='h-[100vh]'>
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
         <p className=" text-3xl font-medium text-richblack-5">Publish Settings</p>
    <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label htmlFor='public'>
            <input 
                id='public'
                type='checkbox'
                {...register("public",{required:true})}
                className=' rounded-md w-4 h-4'
            />
          
            <span className='text-[#52e8ca] text-lg'> Make this Course Public</span>
           </label>
         
           
        </div>
        {
            errors.public &&(
                <span className="ml-6 text-xs tracking-wide text-pink-200 ">Course Public is Required</span>
            )
        }

        <div className='flex justify-end  gap-x-3 mt-4'>
        <button onClick={goBack} disabled={loading} type='button' className='rounded-md cursor-pointer flex items-center bg-richblack-400 px-8'>
<MdNavigateBefore/>
    Back
</button>

<IconBtn
          disabled={loading}
              text={"Save Changes"}
            >
              
            </IconBtn>
        </div>


   



</form>
    </div>
    </div>
  )
}

export default PublishCourse