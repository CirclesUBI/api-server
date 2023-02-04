import {Request, Response} from "express";
import {Session} from "../../session";
import {Environment} from "../../environment";
import {tryGetSessionToken} from "../../utils/tryGetSessionToken";
import {Storage} from "@google-cloud/storage";

export const uploadToGCSPostHandler = async (req: Request, res: Response) => {
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

    const objectKey = Date.now().toString() + req.body.fileName;
    const mimeType = req.body.mimeType;
    const bytes = Buffer.from(req.body.bytes.replace(/^data:image\/\w+;base64,/, ""), "base64");

    let storage = new Storage({
      credentials: Environment.googleCloudStorageCredentials
    });
    await storage.bucket(Environment.gcsAvatarBucketName).file(objectKey).save(bytes, {
      metadata: {
        contentType: mimeType,
      },
    });

    // Use the Google cloud storage sdk to get the file's public url
    const publicUrl = await storage.bucket(Environment.gcsAvatarBucketName).file(objectKey).getSignedUrl({
      action: "read",
      expires: "03-09-2491",
    });

    res.statusCode = 200;
    return res.json({
      status: "ok",
      url: publicUrl[0],
    });
  } catch (e) {
    console.error(e);
    return res.json({
      status: "error",
      message: "Image Upload Failed."
    });
  }
}
