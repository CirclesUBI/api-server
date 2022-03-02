import {Request, Response} from "express";
import {JobQueue} from "../../jobs/jobQueue";
import {JobType} from "../../jobs/descriptions/jobDescription";

export const triggerGetHandler = async (req: Request, res: Response) => {
  try {
    if (!req.query.code) {
      res.statusCode = 400;
      return res.json({
        status: "error",
        message: "no 'code' argument",
      });
    }
    if (!req.query.topic) {
      res.statusCode = 400;
      return res.json({
        status: "error",
        message: "no 'topic' argument",
      });
    }

    const result = await JobQueue.trigger(<JobType>req.query.topic, <string>req.query.code);

    if (result == "end") {
      res.statusCode = 404;
      return res.json({
        status: "notFound",
        message: `Couldn't find the trigger with the supplied code.`
      });
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
      message: "Image Upload Failed.",
    });
  }
}