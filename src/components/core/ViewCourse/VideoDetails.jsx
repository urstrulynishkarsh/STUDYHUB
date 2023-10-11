import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../services/operations/courseDetailAPI';
import { updateCompletedLectures } from '../../Slice/viewCourseSlice';
import { BigPlayButton, Player } from 'video-react';
import 'video-react/dist/video-react.css'; 
import { AiFillPlayCircle } from 'react-icons/ai';
import IconBtn from '../../common/IconBtn';

const VideoDetails = () => {

  const {sectionId,courseId,subSectionId}=useParams();
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const playerRef=useRef();
  const location=useLocation();
  const {token}=useSelector((state)=>state.auth)
  const {courseSectionData,courseEntireData ,totalNoOfLectures,completedLectures}=useSelector((state)=>state.viewCourse)

  const [videoData,setVideoData]=useState([]);
  const [videoEnded,setVideoEnded]=useState(false);
  const [loading,setLoading]=useState(false)
  const [previewSource, setPreviewSource] = useState("")

  useEffect(()=>{
    const setVideoSpecificDetails=async()=>{
        if(!courseSectionData.length)
        {
          return;
        }
        if(!courseId && !sectionId && !subSectionId)
        {
            navigate("/dashboard/enrolled-courses")
        }
        else{
          // let assume all fields present in my data 
          const filteredData=courseSectionData.filter(
            (course)=>course._id===sectionId
          )
          const filteredVideoData=filteredData?.[0].subSection.filter(
            (data)=>data._id===subSectionId
            )
            setVideoData(filteredVideoData[0])
          
            setVideoEnded(false)
        }
    }
    setVideoSpecificDetails();
  },[courseSectionData,courseEntireData,location.pathname])

  // console.log("set video data",videoData)

  const isFirstVideo=()=>{
    const currentSectionIndex=courseSectionData.findIndex((data)=>data._id===sectionId)
    const currenSubSectionIndex=courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data)=>data._id===subSectionId)
    if(currenSubSectionIndex===0 && currentSectionIndex===0)
    {
      return true;
    }
    else{
      return false;
    }
  }
  const isLastVideo=()=>{
    const currentSectionIndex=courseSectionData.findIndex((data)=>data._id===sectionId)
    const noOfSubSection=courseSectionData[currentSectionIndex].subSection.length
    const currenSubSectionIndex=courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data)=>data._id===subSectionId)
    if(currentSectionIndex ===courseSectionData.length-1  &&  currenSubSectionIndex===noOfSubSection-1)
    {
      return true;
    }
    else{
      return false;
    }
  }
  const goToNextVideo=()=>{
    const currentSectionIndex=courseSectionData.findIndex((data)=>data._id===sectionId)
    const noOfSubSection=courseSectionData[currentSectionIndex]?.subSection.length
    const currenSubSectionIndex=courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data)=>data._id===subSectionId)
    if(currenSubSectionIndex!==noOfSubSection-1){
      const nextSubSectionId=courseSectionData[currentSectionIndex].subSection[currentSectionIndex+1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section${nextSubSectionId}`)
    }
    else{
      const nextSectionId=courseSectionData[currentSectionIndex+1]._id;
      const nextSubSectionId=courseSectionData[currentSectionIndex+1].subSection[0]._id;
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section${nextSubSectionId}`)
    }
  }
  const goToPrevVideo=()=>{
    const currentSectionIndex=courseSectionData.findIndex((data)=>data._id===sectionId)
    const noOfSubSection=courseSectionData[currentSectionIndex].subSection.length
    const currenSubSectionIndex=courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data)=>data._id===subSectionId)

    if(currenSubSectionIndex!==0){
      const prevSubSectionId=courseSectionData[currentSectionIndex].subSection[currentSectionIndex-1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section${prevSubSectionId}`)
    }
    else{
      const prevSectionId=courseSectionData[currentSectionIndex-1]._id;
      const prevSubsectionLength=courseSectionData[currentSectionIndex-1].subSection.length;
      const prevSubSectionId=courseSectionData[currentSectionIndex-1].subSection[prevSubsectionLength-1]._id;
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section${prevSubSectionId}`)
    }

  }
  const handleLectureCompleted=async()=>{

    // dummy code
    setLoading(true)
    const response=await markLectureAsComplete({courseId:courseId,subSectionId:subSectionId},token)
    dispatch(updateCompletedLectures(subSectionId))
    setLoading(false)
  }
  return (
    <div className="flex flex-col gap-5 text-white">
      {
        !videoData ?(<img
          src={previewSource}
          alt="Preview"
          className="h-full w-full rounded-md object-cover"
        />):(
           <Player
            aspectRatio="16:9"
             ref={playerRef}
              playsInline
               onEnded={()=>setVideoEnded(true)}
                src={videoData?.videoUrl}
           >
            <BigPlayButton position="center" className='text-white text-4xl' />
            {
              videoEnded &&(
                <div   style={{
                  backgroundImage:
                    "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                }}
                className="full absolute gap-y-2 inset-0 z-[100] grid h-full place-content-center font-inter">
                  {
                    !completedLectures.includes(subSectionId)&&(
                      <IconBtn
                      disabled={loading}
                      onclick={()=>handleLectureCompleted()}
                      text={!loading?"Mark As Completed":"...Loading"}
                      customClasses="text-xl max-w-max px-4 mx-auto"
                   
                      />
                    )
                  }
                  <IconBtn
                  disabled={loading}
                  onclick={()=>{if(playerRef?.current){
                    playerRef?.current?.seek(0);
                    setVideoEnded(false);
                  }}}
                  text="Rewatch"
                  customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                  />
                   <div >
                    {
                      !isFirstVideo() &&(
                        <button disabled={loading} className='blackButton' onClick={goToPrevVideo}>
                          Prev
                        </button>
                      )
                    }
                    {
                      !isLastVideo() &&(
                        <button disabled={loading} className='blackButton' onClick={goToNextVideo}>
                          Next
                        </button>
                      )
                    }
                  </div>
                </div>
              )
            }

           </Player>

        )
      }

<h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2 pb-6">{videoData?.description}</p>
    </div>
  )
}

export default VideoDetails