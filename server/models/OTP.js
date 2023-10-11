const mongoose=require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate=require('../mail/templates/emailVerificationTemplate')

const OTPSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:60*5,
    },

})
async function sendVerificationEmail(email,otp){
    try{
      
        const mailResponse = await mailSender(
			email,
			"Verification Email",
			emailTemplate(otp)
		);
        console.log("email sent successfully",mailResponse.response);

    }
    catch(error){
        console.log("error occured while sending verification email",error);
        throw error;
    }

}
// Define a post-save hook to send email after the document has been saved
OTPSchema.pre("save", async function (next) {
	console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
});

module.exports = mongoose.model("OTP", OTPSchema);

