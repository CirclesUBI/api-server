import {Request, Response} from "express";

export const triggerPostHandler = async (req: Request, res: Response) => {
  try {
    res.statusCode = 200;
    return res.json({
      status: "ok",
      url: ``,
    });
  } catch (e) {
    return res.json({
      status: "error",
      message: "Image Upload Failed.",
    });
  }
}