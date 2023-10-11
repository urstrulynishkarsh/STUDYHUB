const Contact = require("../models/Contact");


exports.contactUs = async(req,res)=>{
    try{

        console.log("request body: ", req.body)

        // extract parentName,email,phoneNumber,childName,age,experience,country from request body
        const {firstName,lastName,email, countryCode,phoneNumber,message} = req.body;
        if (!firstName || !lastName || !email || !countryCode || !phoneNumber || !message ) {
            console.log("not all fields filled...",firstName,lastName,email,countryCode,message);
            return res.status(400).json({
              status: 400,
              message: "Please fill all fields",
            });
        }


        //create new object and insert into the mongoDB collection 
        const response = await Contact.create({firstName,lastName,email, countryCode,phoneNumber,message})

        return res.status(200).json(
            {
                success: true,
                data: response,
                message: 'Student  Information Filled Successfully' 
            });
    }
    catch (error) {
        console.log("error", error);
        return res.status(500).json(
        {
            success: false,
            data:"Internal Server Problem",
            status: 500,
            message: error.message,
        });
      }
}