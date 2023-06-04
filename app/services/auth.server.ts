/* eslint-disable no-undef */
import { MicrosoftStrategy } from "remix-auth-microsoft";
import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { getUserInformation } from "~/models/user.server";

export let authenticator = new Authenticator(sessionStorage); //User is a custom user types you can define as you want

let microsoftStrategy = new MicrosoftStrategy(
  {
    clientId: ENV.aadClientId,
    clientSecret: ENV.aadClientSecret,
    redirectUri: ENV.authRedirect,
    tenantId: "common", // optional - necessary for organization without multitenant (see below)
    scope: "openid profile email", // optional
    prompt: "select_account", // optional
  },
  async ({ accessToken, profile, extraParams }) => {
    const idToken = extraParams.id_token;
    const email = profile.emails[0].value;
    const name = profile.displayName;

    global.TOKEN = idToken;

    const userInformation = await getUserInformation();
    const userRole = userInformation?.userRole;

    return {
      email: email,
      name: name,
      accessToken: accessToken,
      userRole: userRole,
    };
  }
);

authenticator.use(microsoftStrategy);
