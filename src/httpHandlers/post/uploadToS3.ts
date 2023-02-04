import {Request, Response} from "express";
import {tryGetSessionToken} from "../../utils/tryGetSessionToken";
import {Session} from "../../session";
import {Environment} from "../../environment";
import {PromiseResult} from "aws-sdk/lib/request";
import AWS from "aws-sdk";

export const uploadToS3PostHandler = async (req: Request, res: Response) => {
  try {
    const cookieValue = req.headers["cookie"];
    let sessionToken = tryGetSessionToken(cookieValue);
    let validSession = null;

    if (sessionToken) {
      validSession = await Session.findSessionBysessionToken(
          Environment.readWriteApiDb,
          sessionToken
      );
    }
    if (!validSession) {
      return res.json({
        status: "error",
        message:
            "Authentication Failed. No session could be found for the supplied sessionToken.",
      });
    }

    const fileName = Date.now().toString() + req.body.fileName;
    const mimeType = req.body.mimeType;
    const bytes = req.body.bytes;

    await saveImageToS3(fileName, bytes, mimeType);

    res.statusCode = 200;
    return res.json({
      status: "ok",
      url: Environment.s3AvatarBucketPublicUrlPrefix + fileName
    });
  } catch (e) {
    return res.json({
      status: "error",
      message: "Image Upload Failed.",
    });
  }
};

async function saveImageToS3(
    key: string,
    imageBytes: any,
    mimeType: string
) {
  const params: {
    Bucket: string;
    Body?: any;
    ContentEncoding?: string;
    ContentType?: string;
    Key: string;
    ACL: string;
  } = {
    Bucket:Environment.s3AvatarBucketName,
    Key: key,
    ACL: "public-read",
  };

  return new Promise<PromiseResult<AWS.S3.PutObjectOutput, AWS.AWSError>>(
      async (resolve, reject) => {
        try {
          params.ContentEncoding = "base64";
          params.ContentType = mimeType;
          params.Body = Buffer.from(
              imageBytes.replace(/^data:image\/\w+;base64,/, ""),
              "base64"
          );

          const spacesEndpoint = new AWS.Endpoint(Environment.s3AvatarBucketEndpoint);
          const avatarBucket = new AWS.S3({
            endpoint: spacesEndpoint,
            accessKeyId: Environment.s3AvatarBucketKeyId,
            secretAccessKey: Environment.s3AvatarBucketKeySecret,
            signatureVersion: "v4"
          });

          const result = await avatarBucket
              .putObject(params)
              .promise();

          resolve(result);
        } catch (e) {
          reject(e);
        }
      }
  );
}