/* eslint-disable no-undef */
import { MicrosoftStrategy } from "remix-auth-microsoft";
import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";

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
  async ({ accessToken, profile }) => {
    const user = {
      email: profile.emails[0].value,
      name: profile.displayName,
      accessToken: accessToken,
      roles: ["cheffs", "admin"],
      basket: [],
    };

    return { user };
  }
);

authenticator.use(microsoftStrategy);
