const mongoose=require("mongoose")

const Section=require('../models/Section');
const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");





exports.updateCourseProgress=async(req,res)=>{
    const {courseId,subSectionId}=req.body

    const userId=req.user.id;

    try{

        const subsection=await SubSection.findById(subSectionId)
        if(!subsection)
        {
            return res.status(404).json({
                success:false,
                message:"Invalid subSection",
                error:error.message
            })
        }

        // check for old entry 
        let courseProgress=await CourseProgress.findOne({courseID:courseId,userId:userId})
        if(!courseProgress)
        {
            return res.status(404).json({
                success:false,
                message:"Course progress does not exist",
                error:error.message
            })
        }
        else
        {
            if(courseProgress.completedVideos.includes(subSectionId))
            {
                return res.status(400).json({
                    success:false,
                    message:"Subsection Already completed",
                    error:error.message
                })
            }
            // push into completed videos 
            courseProgress.completedVideos.push(subSectionId)

            await courseProgress.save();

            return res.status(200).json({ message: "Course progress updated" })
        }
    }
    catch(error)
    {
        console.error(error)
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message
        })

    }
}
