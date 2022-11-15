import {Request, Response} from "express";
import {Environment} from "../../environment";
import {log} from "../../utils/log";
import {allBusinesses} from "../../resolvers/queries/allBusinesses";
import {Context} from "../../context";
import {ProfileLoader} from "../../querySources/profileLoader";
import {getDisplayName} from "../../utils/getDisplayName";

function onError(req: Request, res: Response, e:Error) {
  log(`ERR  `,
    `[${req.ip}; ${req.headers["user-agent"]}] [hash: ${req.query.hash}] [linkGetHandler]`,
    `The link preview couldn't be generated:`, e);

  return res.json({
    status: "error",
    message: "Couldn't generate the link preview.",
  });
}

export const linkGetHandler = async (req: Request, res: Response) => {
  try {
    if (!req.query.id) {
      res.statusCode = 400;
      return res.json({
        status: "error",
        message: "no 'id' argument",
      });
    }

    res.statusCode = 200;

    let id = req.query.id?.toString();
    if (!id)
      return onError(req, res, new Error(`The 'id' query parameter is not set`));

    const linkObj = await Environment.readonlyApiDb.link.findUnique({
      where: {
        id: id
      }
    });
    if (!linkObj)
      return onError(req, res, new Error(`Couldn't find a link with the specified id`));

    let document = "";

    switch (linkObj.linkTargetType) {
      case "Business":
        const businesses = await allBusinesses(null, {circlesAddress: linkObj.linkTargetKey, id: undefined, categoryId: undefined}, new Context(id, false));
        if (businesses.length != 1)
          return onError(req, res, new Error(`Couldn't find a 'Business' with the specified 'circlesAddress' in the 'key' field`));

        const business = businesses[0];
        document +=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${business.name}</title>
</head>
<body>
    <meta name="title" property="og:title" content="${business.name}" />
    <meta name="type" property="og:type" content="website" />
    <meta name="image" property="og:image" content="${business.picture}" />
    <meta name="url" property="og:url" content="${Environment.appUrl}#/market/detail/${business.circlesAddress}" />
    <meta name="description" property="og:description" content="${business.description}" />
</body>
</html>`;
        break;
      case "Person":
        const persons = await new ProfileLoader().profilesBySafeAddress(Environment.readonlyApiDb, [linkObj.linkTargetKey]);
        if (Object.keys(persons).length != 1)
          return onError(req, res, new Error(`Couldn't find a 'Profile' with the 'circlesAddress' in the 'key' field`));

        const person = Object.values(persons)[0];
        if (!person)
          return onError(req, res, new Error(`Couldn't find a 'Profile' with the 'circlesAddress' in the 'key' field`));

        const displayName = getDisplayName(person);
        document +=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${displayName}</title>
</head>
<body>
    <meta name="title" property="og:title" content="${displayName}" />
    <meta name="type" property="og:type" content="website" />
    <meta name="image" property="og:image" content="${person.avatarUrl}" />
    <meta name="url" property="og:url" content="${Environment.appUrl}#/contacts/profile/${person.circlesAddress}" />
    <meta name="description" property="og:description" content="${person.dream ?? person.circlesAddress}" />
</body>
</html>`;
        break;
      default:
        return onError(req, res, new Error(`Wrong content type. This endpoint only supports 'text/html'`));
    }

    log(`     `,
      `[${req.ip}; ${req.headers["user-agent"]}] [id: ${req.query.id}] [linkGetHandler]`,
      `The link preview was successfully generated.`);

    res.format({
      'text/html': function () {
        res.send(document);
      },

      default: function () {
        // log the request and respond with 406
        res.status(406).send('Not Acceptable')
      }
    });
  } catch (e) {
    return onError(req, res, <Error>e);
  }
}