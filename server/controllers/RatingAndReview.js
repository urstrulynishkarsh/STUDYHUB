const RatingAndReview=require('../models/RatingAndReview');
const Course=require('../models/Course');
const { default: mongoose } = require('mongoose');


// create rating

exports.createRating=async(req,res)=>{
    try{
        // get user id 
        const userId=req.user.id;
        // fetch the data from req body
        const {rating,review,courseId}=req.body;
        // check if user enrolled in  the coruse or not 
        const courseDetails=await Course.findOne(
            {_id:courseId,studentsEnrolled:{$elemMatch:{$eq:userId}}
        });
        if(!courseDetails)
        {
            return res.status(404).json({
                success:false,
                message:'student in not enrolled in this course'
            })
        }
        // check if user already reviewd the course
        const alreadyreviewed=await RatingAndReview.findOne({user:userId,course:courseId});
        if(alreadyreviewed)
        {
            return res.status(403).json({
                success:false,
                message:'course is already reviewed by user'
            })
        }
        // create rating and review
        const ratingandreview=await RatingAndReview.create({rating,review,user:userId,course:courseId})

        // update the course with rating and review
        const updatedcourse=await Course.findByIdAndUpdate(courseId,
               {
                $push:{
                    ratingAndReviews:ratingandreview._id
                }
               } 
               ,{new:true}
             )
               console.log(updatedcourse);
             return res.status(200).json({
                success:true,
                message:"rating and review successfully compelted",
                ratingandreview
             })


    }
    catch(error)
    {
        console.error(error)
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }



}


exports.getAverageRating=async(req,res)=>{
    try
    {
        const courseID=req.body.courseId;
        const result=await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseID)
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"},
                }
            }
        ])

        if(result.length>0)
        {
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating
            })
        }

        return res.status(200).json({
            success:true,
            message:'Average rating is 0 no rating is given till now',
            averageRating:0
        })

    }
    catch(error)
    {
        console.error(error)
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// get all rating and reviews

exports.getAllRating=async(req,res)=>{
    try{
        const allReview=await RatingAndReview.find({})
        .sort({rating:"desc"})
        .populate({
            path:"user",
            select:"firstName lastName email image"
        }).populate({
            path:"course",
            select:"courseName"
        }).exec()

        return res.status(200).json({
            success:true,
            message:"All Review fetched Successfully",
            data:allReview
        })
    }
    catch(error)
    {
        console.error(error)
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }

}


