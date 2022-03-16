import {Request, Response} from "express";
import {JobQueue} from "../../jobs/jobQueue";
import {Environment} from "../../environment";
import {log} from "../../utils/log";

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
      const redirectUrl = Environment.appUrl + "#/passport/verifyemail/failed";
      log(`     `,
        `[${req.ip}; ${req.headers["user-agent"]}] [hash: ${req.query.hash}] [triggerGetHandler]`,
        `The trigger was already executed. Redirecting the user to ${redirectUrl}.`);

      res.statusCode = 302;
      return res.redirect(redirectUrl);
    }

    res.statusCode = result?.data?.statusCode ?? 200;

    log(`     `,
      `[${req.ip}; ${req.headers["user-agent"]}] [hash: ${req.query.hash}] [triggerGetHandler]`,
      `The trigger was successfully executed.`);

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
    log(`ERR  `,
      `[${req.ip}; ${req.headers["user-agent"]}] [hash: ${req.query.hash}] [triggerGetHandler]`,
      `The trigger failed to execute:`, e);

    return res.json({
      status: "error",
      message: "Couldn't run the trigger.",
    });
  }
}