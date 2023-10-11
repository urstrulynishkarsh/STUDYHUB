const Section=require("../models/Section");
const SubSection=require('../models/SubSection')
const {imageUploadToCloudinary}=require('../utils/ImageUpload')
require("dotenv").config();

exports.createSubSection=async(req,res)=>{
    try{
        //  fetch data from req body
         // Extract necessary information from the request body
      const { sectionId, title, description } = req.body
      const video = req.files.video
  
      // Check if all necessary fields are provided
      if (!sectionId || !title || !description || !video) {
            return res.status(400).json({
                success:false,
                message:"All Fields are required"
            })
        }

        // upload video in cloudinary
        const uploadDetails= await imageUploadToCloudinary(video,process.env.FOLDER_NAME)

        // create a subsection
        const subSectionDetails= await SubSection.create({
            title:title,
            timeDuration: `${uploadDetails.duration}`,
            description:description,
            videoUrl:uploadDetails.secure_url
        })


        // update section with subsection object id
            const updatedSectionDetails=await Section.findByIdAndUpdate(
                {_id:sectionId},
                {
                    $push:{
                        subSection:subSectionDetails._id
                    }
                },
                {new:true}
            ).populate("subSection");

        // return response

        return res.status(200).json({
            success:true,
            message:"SubSection Created Successfully",
            updatedSectionDetails,
            
        })

    }catch(error)
    {
        console.error(error);
        return res.status(500).json({
            success: false,
            message:'something went wrong in creating SubSection',
            error:error.message,
        })

    }
    
}

// hw updatedsubsection

  
exports.updateSubSection = async (req, res) => {
    try {
      const { sectionId, subSectionId, title, description } = req.body
      const subSection = await SubSection.findById(subSectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save()


      const updatedData=await Section.findById(sectionId).populate("subSection")
  
      return res.json({
        success: true,
        message: "Section updated successfully",
        data:updatedData
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
  }


// hw deletedsubsection


  
exports.deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body
      console.log(subSectionId,sectionId)
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }
      const updatedData=await Section.findById(sectionId).populate("subSection")
      
  
      return res.json({
        success: true,
        message: "SubSection deleted successfully",
        data:updatedData
      })


      
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
  }