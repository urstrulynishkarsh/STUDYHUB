const User=require("../models/User")
const mailSender=require("../utils/mailSender");
const bcrypt=require('bcrypt');
const crypto=require("crypto")

const {passwordUpdated}=require("../mail/templates/passwordUpdate")

// reset password tokens

exports.resetPasswordToken=async(req,res)=>{
    try{
        const email=req.body.email;
        const user=await User.findOne({ email: email});
        if(!user){
            return res.status(404).json({
                 success: false,
                  message:"your email is not registered with us"})
        }
        const token=crypto.randomUUID();
        const updatedDetails=await User.findOneAndUpdate(
            {email: email},
            {
                token: token,
                resetPasswordExpires:Date.now()+5*60*1000,
            },
            {new:true}
            );
        
            const url=`http://localhost:3000/update-password/${token}`;

            await mailSender(email,
                "Password Reset Link",
                `Password reset Link:${url}`
            );

                return res.json({
                    success:true, 
                    message:'Email sent Successfully, please check your email and change password'
                    
                });


    }
    catch(error)
    {
        console.error(error);
        return res.status(500).json({
            success: false,
            message:'something went wrong in reset password token',
        })

    }
}




// reset password

exports.resetPassword=async(req,res)=>{
    try{
        const {password,confirmPassword,token} = req.body;
        if(password!==confirmPassword)
        {
            return res.status(400).json({
                success:false,
                message: 'Passwords do not match',
            })
        }
        const userDetails=await User.findOne({token:token})

        console.log("userDetails: ",userDetails)

        if(!userDetails)
        {
            return res.status(401).json({
                success:false,
                message: 'Token is invalid',
            })
        }
        if(userDetails.resetPasswordExpires <Date.now())
        {
            return res.status(401).json({
                success:false,
                message: 'Token is expired! please regnerate your token',
            })
        }
        const hashedPassword= await bcrypt.hash(password,10);
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new: true},
          );


            const mailResponse = await mailSender(
                userDetails.email,
                "Password Update",
                passwordUpdated(userDetails.email,userDetails.firstName)
            );
            console.log("email sent successfully",mailResponse.response);
    
        
       
               
        return res.status(200).json({
            success: true,
            message: 'password reset successfully'

            
        })




    }
    catch(error)
    {
        console.error(error);
        return res.status(500).json({
            success: false,
            message:'something went wrong in reset password',
            
        })

    }

}