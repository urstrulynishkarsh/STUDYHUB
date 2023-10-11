const User=require("../models/User")
const OTP=require("../models/OTP")
const otpGenerator=require("otp-generator")
const bcrypt=require("bcrypt")
const Profile = require("../models/Profile")
const crypto = require('crypto');
const jwt=require('jsonwebtoken');
const mailSender=require("../utils/mailSender")
require("dotenv").config();



// send otp
exports.sendOtp=async(req,res)=>{
    try{
        const {email}=req.body;
        console.log(email);
        // check if user is already exist
        const existingUser =await User.findOne({email})
        if(existingUser)
        {
            return res.status(401).json({
                success:false,
                message:"user already exists so Opt will not send you"
            })
        }
        // generate otp var
        var otp=otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        });
        console.log("otp generated ",otp);

         // check unique otp or not 
        const result =await OTP.findOne({otp:otp})
        // this is bad practice so imporve this
        while(result){
            otp=otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            });
            result =await OTP.findOne({otp:otp})
        }

        const otpPayload={email,otp}
        // create a entry in db
        const otpBody=await OTP.create(otpPayload);

        console.log(otpBody);
 
        res.status(200).json({
            success:true,
            message:"OTP SENT SUCCESSFULLY",
            otp,
        }) 

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });

    }
}


// signup
exports.signup=async(req,res)=>{
    try{

        // fetch data first
        const{
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        }=req.body;

        // data validation
        if(!firstName||!lastName||!email||!password||!confirmPassword||!otp){
            return res.status(403).json({
            success:false,
            message:"All fields are required",
            })
        }


        // match 2 password (password and confirm password)
        if(password!==confirmPassword)
        {
            return res.status(403).json({
                success:false,
                message:"Your password doesn't match",
               })

        }


        // check userexist or not
        const existingUser =await User.findOne({email})
        if(existingUser)
        {
            return res.status(400).json({
                success:false,
                message:"user already exists"
            })
        }



        // find most recent otp for the user
const recentOtp=await OTP.find({email}).sort({createdAt:-1}).limit(1);
console.log(recentOtp);

        // validate otp
if(recentOtp.length==0){
    return res.status(400).json({
        success:false,
        message:"OTP not found",
    })
}

else if(otp!==recentOtp[0].otp){
    console.log(otp)
console.log(recentOtp[0].otp)
    return res.status(400).json({
        success:false,
        message:"Invalid Otp",
    })
}
     // Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

		// Create the Additional Profile For User
		const profileDetails = await Profile.create({
			gender: null,
			dateOfBirth: null,
			about: null,
			contactNumber: null,
		});
        console.log("Profile DETAILS: ",profileDetails)
		const user = await User.create({
			firstName,
			lastName,
			email,
			contactNumber,
			password: hashedPassword,
			accountType: accountType,
			approved: approved,
            additionDetails: profileDetails._id,
			image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
		});

        console.log("user_details",user)

		return res.status(200).json({
			success: true,
			user,
			message: "User registered successfully",
		});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User can't be registered please try again!",
        });

    }
}



// login

exports.login=async(req,res)=>{
    try{
        const{email,password}=req.body;
        
        if(!email||!password){
            return res.status(403).json({
                success: false,
                message:'please fill information Carefully',
            })
        }

        let user=await User.findOne({ email}).populate("additionDetails").exec() 
        console.log("user data",user)
        if(!user){
            return res.status(401).json({
                success: false,
                message:'User is not registered',
            })
        }

        // verify pass and generate jwt token

        // create payload first

        

        if(await bcrypt.compare(password,user.password)){
            const payload={
                email:user.email,
                id:user._id,
                accountType:user.accountType
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:'90h',
            })
        
        // important line
        // user=user.toObject();
        // user.token=user;
        // user.password=undefined;

        user.token=token;
        user.password=undefined;



        const options={
            expires:new Date(Date.now()+3*24*60*60*1000),
            httpOnly:true,
        }
        res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            user,
            message:"login in successfully"
        })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password Incorrect"
            })
        }



        

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login Failure Please Try Again!",
        });

    }

}


// change password

exports.changePassword = async(req,res)=>{
    // get data from req body

    // get oldpassword, newpassword , confirm password
    // validation

    // update password in db

    // send mail password update 
    // retrun response
  
        try {
            // Get data from req body
            const { oldPassword, newPassword} = req.body;
    
            // Validation
            if (!oldPassword || !newPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'All fields are required.',
                });
            }
    
            // if (newPassword !== confirmPassword) {
            //     return res.status(400).json({
            //         success: false,
            //         message: 'New password and confirm password do not match.',
            //     });
            // }
    
            // Retrieve user from the database (you need to implement this)
            const userId=req.user.id
            const user = await User.findById(userId); // Replace with your user retrieval logic
    
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found.',
                });
            }
    
            // Check if the old password matches
            const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    
            if (!passwordMatch) {
                return res.status(400).json({
                    success: false,
                    message: 'Old password is incorrect.',
                });
            }
    
            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);
    
            // Update the password in the database
            user.password = hashedPassword;
            await user.save();
    
            // Send email notification about password change (you need to implement this)
            await mailSender(user.email, 'Password Updated', 'Your password has been successfully updated.');
    
            return res.status(200).json({
                success: true,
                message: 'Password updated successfully.',
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };
