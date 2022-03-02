import nodemailer from "nodemailer";
import mustache from "mustache";
import {MailTemplate} from "./mailTemplate";
import {Environment} from "../environment";

export class Mailer
{
    static async send(template:MailTemplate, data:object, to:string)
    {
        const transport = nodemailer.createTransport({
            auth: {
                  user: Environment.smtpConfig.user,
                  pass: Environment.smtpConfig.password
            },
            host: Environment.smtpConfig.server,
            port: Environment.smtpConfig.port,
            secure: Environment.smtpConfig.secure,
            localAddress: Environment.smtpConfig.localAddress,
            debug: Environment.smtpConfig.debug
        });

        await transport.sendMail({
            from: Environment.smtpConfig.from,
            to: to,
            subject: mustache.render(template.subject, data),
            html: mustache.render(template.bodyHtml, data),
            // text: mustache.render(template.bodyPlain, data),
        })
    }
}
