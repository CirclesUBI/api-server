import {Request, Response} from "express";
import {log} from "../../utils/log";
import {Environment} from "../../environment";

export const healthGetHandler = async (req: Request, res: Response) => {
  try {
    await Environment.validateAndSummarize(false);
    res.statusCode = 200;

    return res.json({
      status: "ok",
      message: `ok`
    });
  } catch (e) {
    log(`ERR  `,
      `[${req.ip}; ${req.headers["user-agent"]}] [hash: ${req.query.hash}] [triggerGetHandler]`,
      `The health check failed:`, e);

    res.statusCode = 500;
    if (e && (<any>e).message) {
      return res.json({
        status: "error",
        message: (<any>e).message
      });
    } else {
      return res.json({
        status: "error",
        message: "The health check failed. See logs for details."
      });
    }
  }
}
