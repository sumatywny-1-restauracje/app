/* eslint-disable no-undef */
import { MicrosoftStrategy } from "remix-auth-microsoft";
import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { signNewUser } from "~/models/user.server";
import { getClientOrders } from "~/models/order.server";

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

    const user = await signNewUser(email);
    const userRole = user?.userRole;

    const clientOrders = await getClientOrders();

    return {
      email: email,
      name: name,
      accessToken: accessToken,
      userRole: userRole,
      info: user,
    };
  }
);

authenticator.use(microsoftStrategy);
