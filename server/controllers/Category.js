const Category=require("../models/Category")
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }
// tag creation functions

exports.createCategory=async(req,res)=>{
    try{ 
        const {name,description}=req.body;
        if(!name ||!description)
        {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }
        const categoryDetails=await Category.create({name:name,description:description});

        console.log(categoryDetails);
        return res.status(200).json({
            success: true,
            message: "Category created successfully",
        })


    }
    catch(error){
        console.error(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        })

    }
}



// show all tags

exports.showAllCategories = async (req, res) => {
	try {
        console.log("INSIDE SHOW ALL CATEGORIES");
		const allCategorys = await Category.find({});
		res.status(200).json({
			success: true,
			data: allCategorys,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};


// exports.categoryPageDetails=async(req,res)=>{
//     try{
//         // find categoryid
//         const {categoryId}=req.body;
//         // get course specifued for category
//         const selectedCategory=await Category.findById(categoryId).populate("courses").exec();
//         console.log(selectedCategory);

//         // validation
//         if(!selectedCategory)
//         {
//             return res.status(404).json({
//                 success:false,
//                 message:"Category not found",
//             })
//         }

//         if(selectedCategory.courses.length===0)
//         {
//             return res.status(404).json({
//                 success:false,
//                 message:"No coursed found for the selected category"
//             })
//         }

//         const selectedcourses=selectedCategory.courses;
//         // get courses from different category
//         const differentCategory=await Category.find(
//             {
//                 _id:{$ne:categoryId}
//             }).populate("courses").exec();
        
//             let diffentCourses=[];
//             for(const category of differentCategory)
//             {
//                 diffentCourses.push(...category.courses);
//             }

//             // get top selling courses
//             const allCategories=await Category.find().populate('courses');
//             const allCourses=allCategories.flatMap((category)=>category.courses);
//             const mostSellingCourses=allCourses.sort((a,b)=>b.sold-a.sold).slice(0,10);


//             // return res
//             return res.status(200).json({
//                 success:true,
//                 data:{
//                     selectedcourses:selectedcourses,
//                     diffentCourses:diffentCourses,
//                     mostSellingCourses:mostSellingCourses
//                 }

//             })
        

        
//     }
//     catch(error){
//         console.error(error)
//         return res.status(500).json({
//             success: false,
//             message: error.message,
//         })

//     }
// }



exports.categoryPageDetails = async (req, res) => {
    try {
      const { categoryId } = req.body
      console.log("PRINTING CATEGORY ID: ", categoryId);
      // Get courses for the specified category
      const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: "ratingAndReviews",
        })
        .exec()
  
      //console.log("SELECTED COURSE", selectedCategory)
      // Handle the case when the category is not found
      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
      // Handle the case when there are no courses
      if (selectedCategory.courses.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
  
      // Get courses for other categories
      const categoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
      })
      let differentCategory = await Category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id
      )
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: "ratingAndReviews",
        })
        .exec()
        //console.log("Different COURSE", differentCategory)
      // Get top-selling courses across all categories
      const allCategories = await Category.find()
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: {
            path: "instructor",
        },
        populate: "ratingAndReviews",
        })
        .exec()
      const allCourses = allCategories.flatMap((category) => category.courses)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
       // console.log("mostSellingCourses COURSE", mostSellingCourses)
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }