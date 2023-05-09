import invariant from "tiny-invariant";

export function getEnv() {
  invariant(
    process.env.mapboxAccessToken,
    "MapBox access token is not defined"
  );
  return {
    mapboxAccessToken: process.env.mapboxAccessToken,
  };
}

type ENV = ReturnType<typeof getEnv>;

declare global {
  var ENV: ENV;
  interface Window {
    ENV: ENV;
  }
}
