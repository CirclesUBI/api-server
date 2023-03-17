import { Request, Response } from "express";
import { Environment } from "../../environment";

export const invitationValidationGetHandler = async (req: Request, res: Response) => {
  if (!req?.headers?.cookie) {
    res.statusCode = 204;
    return res.json({
      status: "empty",
      message: `No invitation cookie set`,
    });
  }
  const cookies = req.headers.cookie
    .split(";")
    .map((o) => o.trim().split("="))
    .reduce((p: { [key: string]: any }, c) => {
      p[c[0]] = c[1];
      return p;
    }, {});

  if (cookies["invitationCode"]) {
    const invitationCode = decodeURIComponent(cookies["invitationCode"]);
    const invitation = await Environment.readWriteApiDb.invitation.findFirst({
      where: {
        code: invitationCode,
        claimedByProfileId: null,
      },
    });

    if (invitation) {
      res.statusCode = 200;
      return res.json({
        status: "ok",
        message: `Invitation valid`,
      });
    } else {
      res.statusCode = 204;
      return res.json({
        status: "empty",
        message: `No valid invitation found`,
      });
    }
  } else {
    res.statusCode = 204;
    return res.json({
      status: "empty",
      message: `No invitation cookie set`,
    });
  }
};
