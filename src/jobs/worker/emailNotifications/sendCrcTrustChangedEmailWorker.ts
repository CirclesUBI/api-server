import {JobWorker, JobWorkerConfiguration} from "../jobWorker";
import {SendCrcTrustChangedEmail} from "../../descriptions/emailNotifications/sendCrcTrustChangedEmail";
import {Mailer} from "../../../mailer/mailer";
import {ProfileLoader} from "../../../querySources/profileLoader";
import {Environment} from "../../../environment";
import {crcTrustChangedEmailTemplate} from "./templates/crcTrustChangedEmailTemplate";

export class SendCrcTrustChangedEmailWorker extends JobWorker<SendCrcTrustChangedEmail> {
  name(): string {
    return "SendCrcTrustChangedEmailWorker";
  }

  constructor(configuration?:JobWorkerConfiguration) {
    super(configuration);
  }

  async doWork(job: SendCrcTrustChangedEmail) {
    // TODO: Use a different template when an organization trusts you
    if (job.limit == 0) {
      return {
        info: `Doesn't send a notification for removed trust at the moment.`
      }
    }

    const profiles = await (new ProfileLoader()
      .profilesBySafeAddress(Environment.readonlyApiDb, [job.user, job.canSendTo]));

    const user = profiles[job.user];
    const canSendTo = profiles[job.canSendTo];

    if (!user?.emailAddress || !user?.emailAddressVerified) {
      return {
        info: `Couldn't send a notification email to profile ${profiles[job.user]?.id} because it has no verified email address.`
      };
    }
    if (!canSendTo?.circlesAddress) {
      return {
        warning: `Couldn't send a notification email for transaction ${job.hash} because no 'canSendTo' profile could be loaded.`
      };
    }

    await Mailer.send(crcTrustChangedEmailTemplate, {
      user: `${ProfileLoader.displayName(user)}`,
      canSendTo: `${ProfileLoader.displayName(canSendTo)}`,
      canSendToProfileUrl: `${Environment.appUrl}#/contacts/profile/${canSendTo.circlesAddress}`
    }, user.emailAddress);

    return undefined;
  }
}

const htmlTemplate = `
<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">

  <head>
    <meta charset="utf-8">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,700;1,200&family=Poppins:wght@400;700&display=swap" rel="stylesheet">
    <!--[if mso]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings
            xmlns:o="urn:schemas-microsoft-com:office:office"
          >
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
      <style>
        td,
        th,
        div,
        p,
        a,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: "Segoe UI", sans-serif;
          mso-line-height-rule: exactly;
        }
      </style>
    <![endif]-->
    <title>New incoming trust!</title>
    <style>
      @font-face {
        font-family: 'Ostrich Sans Heavy';
        font-style: normal;
        font-weight: 400;
        src: local('Ostrich Sans Heavy'), local('Ostrich Sans Heavy'), url(https://dev.circles.land/fonts/OstrichSans-Heavy.woff) format('woff');
      }

      .hover-bg-primary-dark:hover {
        background-color: #2badeb !important;
      }

      .hover-underline:hover {
        text-decoration: underline !important;
      }

      @media (max-width: 600px) {
        .sm-h-24 {
          height: 24px !important;
        }

        .sm-w-full {
          width: 100% !important;
        }

        .sm-px-24 {
          padding-left: 24px !important;
          padding-right: 24px !important;
        }
      }
    </style>
  </head>

  <body style="margin: 0; width: 100%; padding: 0; word-break: break-word; -webkit-font-smoothing: antialiased; height: 100%; background-color: #e5e7eb; font-family: 'Poppins', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif; font-size: 16px; color: #0a2262;">
    <div style="position: fixed; top: 0; left: 0; z-index: 50; width: 100%;">
      <div style="margin-left: auto; margin-right: auto; display: grid; width: 100%; grid-template-columns: repeat(3, minmax(0, 1fr)); justify-items: stretch; background-color: #081b4a; padding: 5px 5px 5px 10px; color: #ffffff;">
        <div style="justify-self: start; white-space: nowrap;">
          <img src="\thttps://dev.circles.land/logos/circles.png" alt="Circles Land" style="border: 0; max-width: 100%; vertical-align: middle; line-height: 100%; height: 32px; width: 32px;">
        </div>
        <div style="place-self: center; justify-self: center;">
          <span style="white-space: nowrap; font-size: 20px;">CIRCLES.LAND</span>
        </div>
      </div>
    </div>
    <div role="article" aria-roledescription="email" aria-label="New incoming trust!" lang="en">
      <table style="height: 100%; width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td align="center">
            <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td style="padding-top: 28px; text-align: center;">
                  <header style="margin-top: 12px; display: grid; height: 60px; place-content: center; overflow: hidden; background-image: linear-gradient(to right, var(--tw-gradient-stops)); --tw-gradient-from: #1dd6a4; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(29, 214, 164, 0)); --tw-gradient-to: #41c7f1; background-size: cover; padding-top: 52px; padding-bottom: 52px; color: #ffffff;">
                    <div style="display: block; align-self: center; text-align: center;">
                      <span style="display: inline-block; font-family: 'Ostrich Sans Heavy', 'Nunito', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif; font-size: 36px; text-transform: uppercase; letter-spacing: -0.05em;">You got cash!</span>
                    </div>
                  </header>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color: #e5e7eb; padding-top: 24px; padding-bottom: 24px; vertical-align: middle;" valign="middle">
            <table class="sm-w-full" style="width: 600px;" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td align="center" class="sm-px-24">
                  <table class="sm-w-full" style="width: 75%;" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td class="sm-px-24" style="background-color: #ffffff; padding: 48px; text-align: center;">
                        <p style="margin: 0; font-size: 18px; font-weight: 600;">Hi {USERNAME},</p>
                        <p style="font-size: 16px; color: #0a2262;">
                          {THEOTEHRGUY} just trusted you on Circles.land
                          <br>
                          <br>
                          Go to Circles.land to see the details and trust
                          {THEOTEHRGUY} back
                        </p>
                        <div class="sm-h-24" style="line-height: 24px;">&zwnj;</div>
                        <a href="{{ .ConfirmationURL }}" class="hover-bg-primary-dark" style="display: inline-block; border-radius: 8px; background-color: #41c7f1; padding: 20px 24px; font-size: 14px; font-weight: 600; text-transform: uppercase; line-height: 1; color: #ffffff; text-decoration: none;">
                          <!--[if mso
                          ]><i
                            style="
                              letter-spacing: 24px;
                              mso-font-width: -100%;
                              mso-text-raise: 26pt;
                            "
                            >&nbsp;</i><!
                        [endif]-->
                          <span style="mso-text-raise: 13pt">Go to Circles.land &rarr;</span>
                          <!--[if mso
                          ]><i
                            style="letter-spacing: 24px; mso-font-width: -100%"
                            >&nbsp;</i><!
                        [endif]-->
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style="height: 2px; background-color: #d1d5db;"></td>
                    </tr>
                    <tr>
                      <td style="padding: 32px; text-align: center; font-size: 12px; color: #4b5563;">
                        <p style="margin: 0 0 4px; text-transform: uppercase;">© 2022 CirclesLand. All rights reserved.</p>
                        <p style="margin: 0; font-style: italic;">
                          If you haven't requested this e-mail you can simply ignore it.
                        </p>
                        <p style="cursor: default;">
                          <a href="https://dev.circles.land/" class="hover-underline" style="color: #3b82f6; text-decoration: none;">Circles.Land</a>
                          &bull;
                          <a href="https://dev.circles.land/" class="hover-underline" style="color: #3b82f6; text-decoration: none;">Docs</a>
                          &bull;
                          <a href="https://dev.circles.land/" class="hover-underline" style="color: #3b82f6; text-decoration: none;">Help & Support</a>
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </body>

</html>
`;