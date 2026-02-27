const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const config = require('./config');

const s3Client = new S3Client({
  endpoint: config.s3.endpoint,
  region: config.s3.region,
  credentials: {
    accessKeyId: config.s3.accessKeyId,
    secretAccessKey: config.s3.secretAccessKey,
  },
  forcePathStyle: true,
});

async function uploadToS3(buffer, fileName, contentType = 'image/jpeg') {
  const command = new PutObjectCommand({
    Bucket: config.s3.bucket,
    Key: fileName,
    Body: buffer,
    ContentType: contentType,
  });

  try {
    await s3Client.send(command);
    return {
      success: true,
      url: `${config.s3.endpoint}/${config.s3.bucket}/${fileName}`
    };
  } catch (error) {
    console.error('S3 upload error:', error.message);
    return { success: false, error: error.message };
  }
}

module.exports = { uploadToS3 };