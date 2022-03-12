import {Request, Response} from "express";
import {JobQueue} from "../../jobs/jobQueue";
import {Environment} from "../../environment";

export const triggerGetHandler = async (req: Request, res: Response) => {
  try {
    if (!req.query.hash) {
      res.statusCode = 400;
      return res.json({
        status: "error",
        message: "no 'hash' argument",
      });
    }

    const result = await JobQueue.trigger(<string>req.query.hash);

    if (result == "end") {
      /*
      res.statusCode = 404;
      return res.json({
        status: "notFound",
        message: `Couldn't find the trigger with the supplied code.`
      });
      */
      const redirectUrl = Environment.appUrl + "#/passport/verifyemail/failed";
      return {
        data: {
          statusCode: 302,
          message: `Go to: ${redirectUrl}`,
          headers: {
            location: redirectUrl
          }
        }
      };
    }

    res.statusCode = result?.data?.statusCode ?? 200;
    if (result?.data?.headers) {
      Object.entries(result.data.headers).forEach((header) => {
        res.setHeader(header[0], <string>header[1]);
      });
    }

    return res.json({
      status: "ok",
      message: `${result?.data?.message ?? ""}`
    });
  } catch (e) {
    return res.json({
      status: "error",
      message: "Couldn't run the trigger.",
    });
  }
}