const { s3Connect } = require('./s3Connect'); // Import your S3 connection function

exports.imageUploadToAmazonS3 = async (file, folder, height, quality) => {
  const s3 = s3Connect(); // Get the S3 instance

  if (s3) {
    const params = {
      Bucket: 'your-s3-bucket-name',
      Key: `${folder}/${file.originalname}`, // Adjust the key as needed
      Body: file.buffer, // Use the file buffer as the object content
    };

    try {
      const data = await s3.upload(params).promise();
      console.log('File uploaded to Amazon S3:', data.Location);

      // Manipulate the image if height and/or quality options are provided
      if (height || quality) {
        // Implement image manipulation here using a library like Sharp or ImageMagick
        // Example using Sharp:
        const sharp = require('sharp');

        const imageBuffer = await sharp(file.buffer)
          .resize(height, null) // Resize based on height
          .jpeg({ quality })
          .toBuffer();

        // Update the uploaded file with the manipulated image
        await s3.putObject({
          Bucket: 'your-s3-bucket-name',
          Key: `${folder}/manipulated-${file.originalname}`, // Adjust the key as needed
          Body: imageBuffer,
        }).promise();

        console.log('Image manipulated and re-uploaded to Amazon S3');
      }

      return data.Location; // Return the S3 object's URL
    } catch (error) {
      console.error('Error uploading to Amazon S3:', error);
      return null;
    }
  } else {
    return null; // Return null if there's an issue with the S3 connection
  }
};
