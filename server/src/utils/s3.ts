import S3 from 'aws-sdk/clients/s3';
import { NextFunction } from 'express';
import fs from 'fs';

const bucketName = process.env.AWS_BUCKET_NAME_TWEETHOUSE!;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCES_KEY_TWEETHOUSE;
const secretAccessKey = process.env.AWS_SECRET_KEY_TWEETHOUSE;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// uploads a file to s3
export const uploadFile = (file: Express.Multer.File) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams: S3.PutObjectRequest = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };

  return s3
    .upload(uploadParams, (err, data) => {
      if (err) {
        console.log(err);
      }
    })
    .promise();
};

// downloads a file from s3
export const getFileStream = (fileKey: string, next: NextFunction) => {
  const downloadParams: S3.GetObjectRequest = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3
    .getObject(downloadParams)
    .createReadStream()
    .on('error', (error) => {
      next(error);
    });
};
