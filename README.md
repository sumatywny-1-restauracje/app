# COVID-19 VISUALIZATION REPORT

## MapLibre GL API TOKEN

1. Sign up at https://account.mapbox.com/auth/signin/?route-to=%22https%3A%2F%2Faccount.mapbox.com%2Faccess-tokens%2F%22, a token will be generated there
2. Create the '.env' file in the root directory of the project
3. Create a variable named mapboxAccessToken (as in the '.env.example' file)
4. Initialize the variable with the value of the generated token

## Azure Active Directory - App Registration

1. Create a new App Registration in AAD (Azure Active Directory).
2. Go to the Overview panel and retrieve the Client ID. Then, in the Authorization panel, create a new Web Instance with a redirect to your application's '<domain>/auth/microsoft/callback' (e.g., 'http://localhost:3000/auth/microsoft/callback' for localhost). Afterward, generate a Client Secret.
3. Take note of the Client ID, Redirect URI, and Client Secret. Create new variables in the '.env' file named aad_client_id, aad_client_secret, and auth_redirect (following the '.env.example' file).

## Development (Locally)

- Start dev server:

  ```sh
  npm install
  npm run dev
  ```

This starts your app in development mode at: http://localhost3000, rebuilding assets on file changes.

## Production

- Start production server:

  ```sh
  npm install
  npm run build
  npm start
  ```

This starts your app in production mode.
