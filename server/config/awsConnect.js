const AWS = require('aws-sdk');
require('dotenv').config();

exports.s3Connect = () => {
  try {
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    console.log('Connected to Amazon S3');
    return s3; // Return the S3 instance for later use
  } catch (error) {
    console.error('Error connecting to Amazon S3:', error);
    return null;
  }
};
