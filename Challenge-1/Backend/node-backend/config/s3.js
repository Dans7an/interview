const AWS = require('aws-sdk');
// Load AWS S3
AWS.config.update({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();
module.exports = s3;