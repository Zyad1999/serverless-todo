import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)

export class StorageAccess {
    constructor(
        private readonly bucketName = process.env.TODOS_S3_BUCKET,
        private readonly urlExpiration = process.env.SIGNED_URL_EXPIRATION,
        private readonly s3 = new XAWS.S3({signatureVersion: 'v4'})){}
    
    getS3UploadUrl(todoId:string):string{
        const signedURL:string = this.s3.getSignedUrl('putObject', {
            Bucket: this.bucketName,
            Key: todoId,
            Expires: this.urlExpiration
        })
        console.log("Generate attachment url for todo "+todoId)
        return signedURL
        
  }
}