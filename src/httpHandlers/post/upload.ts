import {Request, Response} from "express";
import {Session} from "../../session";
import {Environment} from "../../environment";
import {PromiseResult} from "aws-sdk/lib/request";
import AWS from "aws-sdk";
import {Main} from "../../main";
import {tryGetSessionToken} from "../../utils/tryGetSessionToken";

export const uploadPostHandler = async (req: Request, res: Response) => {
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

    const fileName = req.body.fileName;
    const mimeType = req.body.mimeType;
    const bytes = req.body.bytes;

    const saveResult = await saveImageToS3(fileName, bytes, mimeType);

    res.statusCode = 200;
    return res.json({
      status: "ok",
      url: `https://circlesland-pictures.fra1.cdn.digitaloceanspaces.com/${fileName}`,
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
    Bucket: "circlesland-pictures",
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
        const result = await Environment.filesBucket
          .putObject(params)
          .promise();
        resolve(result);
      } catch (e) {
        reject(e);
      }
    }
  );
}