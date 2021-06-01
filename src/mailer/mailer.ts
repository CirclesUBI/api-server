import nodemailer from "nodemailer";
import mustache from "mustache";
import {MailTemplate} from "./mailTemplate";

export class Mailer
{
    static async send(template:MailTemplate, data:object, to:string)
    {
        if (!process.env.SMTP_USER
        || !process.env.SMTP_PORT
        || !process.env.SMTP_SECURE
        || !process.env.SMTP_PASS)
            throw new Error("One of the SMTP settings is missing in the environment variables");

        const transport = nodemailer.createTransport({
            host: process.env.SMTP_SERVER,
            port: parseInt(process.env.SMTP_PORT),
            secure: process.env.SMTP_SECURE.toLowerCase() == "true",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        await transport.sendMail({
            from: process.env.MAIL_FROM,
            to: process.env.MAIL_TO,
            subject: mustache.render(template.subject, data),
            html: mustache.render(template.bodyHtml, data),
            text: mustache.render(template.bodyPlain, data),
        })
    }
}
