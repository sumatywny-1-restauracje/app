import invariant from "tiny-invariant";

export function getEnv() {
  invariant(
    process.env.mapboxAccessToken,
    "MapBox access token is not defined"
  );
  invariant(process.env.aad_client_id, "AAD client id is not defined");
  invariant(process.env.aad_client_secret, "AAD client secret is not defined");
  invariant(process.env.auth_redirect, "Auth redirect is not defined");
  return {
    mapboxAccessToken: process.env.mapboxAccessToken,
    aadClientId: process.env.aad_client_id,
    aadClientSecret: process.env.aad_client_secret,
    authRedirect: process.env.auth_redirect,
  };
}

type ENV = ReturnType<typeof getEnv>;

declare global {
  var ENV: ENV;
  var TOKEN: string;
  interface Window {
    ENV: ENV;
  }
}
