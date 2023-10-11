const jwt=require('jsonwebtoken');
require("dotenv").config();
const User= require('../models/User')
const cookieParser=require('cookie-parser');
// auth
// exports.auth = async(req,res,next)=>{
//     try{
//         // extract jwt token
//         const token=req.body.token
//                     ||req.cookies.token
//                     ||req.header("Authorization").replace("Bearer ","");
//         if(!token || token===undefined){
//             return res.status(401).json({
//                 success: false,
//                 message:'token is missing required',
//             })
//         }
//         // verify the token
//         try{
//             const decode=jwt.verify(token,process.env.JWT_SECRET)
//             console.log(decode)
//             req.user=decode

//         }
//         catch(error){
//             return res.status(401).json({
//                 success: false,
//                 message:'token is invalid',
//             })
//         }
//         next();

//     }
//     catch(error){
//         console.error(error)
//         return res.status(401).json({
//             success: false,
//             message:'something went wrong in token generation',
//         })
//     }


// }

exports.auth = async (req, res, next) => {
    try{

        console.log("BEFORE ToKEN EXTRACTION");
        //extract token
        const token = req.cookies.token 
                        || req.body.token 
                        || req.header("Authorization").replace("Bearer ", "");
        console.log("AFTER ToKEN EXTRACTION");
  
        //if token missing, then return response
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }

        //verify the token
        try{
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(err) {
            //verification - issue
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    }
    catch(error) {  
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }
}


// isInstructor

exports.isInstructor=async(req, res, next)=>{
    try{
      
        if(req.user.accountType!=='Instructor')
        {

            return res.status(401).json({message:false,
                message:'this is a protected route for instructor'
            })

        }
        next();

    }
    catch(error){
        console.error(error)
        return res.status(500).json({
            success: false,
            message:'User role cannot be verified! please try again',
        })
    }

    
}


// isstudent
exports.isStudent=async(req, res, next)=>{
    try{
        if(req.user.accountType!=='Student')
        {
            return res.status(401).json({message:false,
                message:'this is a protected route for Student'
            })

        }
        next();

    }
    catch(error){
        console.error(error)
        return res.status(500).json({
            success: false,
            message:'User role cannot be verified! please try again',
        })
    }

    
}





// isadmin
exports.isAdmin=async(req, res, next)=>{
    try{
        if(req.user.accountType!=='Admin')
        {
            return res.status(401).json({message:false,
                message:'this is a protected route for instructor'
            })

        }
        next();

    }
    catch(error){
        console.error(error)
        return res.status(500).json({
            success: false,
            message:'User role cannot be verified! please try again',
        })
    }

    
}

