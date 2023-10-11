const Section=require('../models/Section')
const Course=require('../models/Course');
const SubSection = require('../models/SubSection');

exports.createSection=async(req,res)=>{
    try{

        // data fetch
        const {sectionName,courseId}=req.body;

        // data validation
        if(!sectionName || !courseId)
        {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        // createSection
        const newSection= await Section.create({sectionName});


        // update course with section objectId

        const updatedCourseDeatils=await Course.findByIdAndUpdate(
                                                        courseId,
                                                        {
                                                            $push:{
                                                                courseContent:newSection._id,
                                                            }
                                                        },
                                                        {new: true},

                                                        ).populate({
                                                            path: "courseContent",
                                                            populate: {
                                                                path: "subSection",
                                                            },
                                                        })
                                                        .exec();


        // hw use populate to replace section/ subsection both in the updated course details   hope it completed



        // return response

        return res.status(200).json({
            success:true,
            message:"New Section created Successfully",
            updatedCourseDeatils,
        })

    }
    catch(error)
    {
        console.error(error);
        return res.status(500).json({
            success: false,
            message:'something went wrong in creating Section',
            error:error.message,
        })

    }

}

exports.updateSection=async(req,res)=>{
    try{
        // fetching data
        const {sectionName,sectionId,courseId}=req.body;

        // data validation
        if(!sectionName ||!sectionId)
        {
            return res.status(400).json({
                success: false,
                message: "Missing Properties",
            })
        }

        // update data
        const updateSection= await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true})

        const course=await Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec()

        return res.status(200).json({
            success:true,
            message:"Section Updated Successfully",
            data:course
        })

    }
    catch(error)
    {
        console.error(error);
        return res.status(500).json({
            success: false,
            message:'something went wrong in updating Section',
            error:error.message,
        })

    }
}

// DELETE a section
exports.deleteSection = async (req, res) => {
	try {

		const { sectionId, courseId }  = req.body;
        console.log('hiii',sectionId,courseId)
		await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})
		const section = await Section.findById(sectionId);
		console.log(sectionId, courseId);
		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

		//delete sub section
		await SubSection.deleteMany({_id: {$in: section.subSection}});

		await Section.findByIdAndDelete(sectionId);

		//find the updated course and return 
		const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();

		res.status(200).json({
			success:true,
			message:"Section deleted",
			data:course
		});

	} catch (error) {
		console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};