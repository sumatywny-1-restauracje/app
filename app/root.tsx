import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getEnv } from "./env.server";

import { createContext, useState } from "react";
import axios from "axios";

import stylesheet from "./styles/tailwind.css";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import { authenticator } from "./services/auth.server";
import type { BasketItem, User } from "./types";
import { getBasket } from "./models/basket";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

type LoaderData = {
  ENV: ReturnType<typeof getEnv>;
  user: User;
  userPhoto: string;
  basket: Array<BasketItem>;
};

export const loader = async ({ request }: LoaderArgs) => {
  const user = (await authenticator.isAuthenticated(request)) as User;
  const graphEndpoint = "https://graph.microsoft.com/v1.0/me/photo/$value";

  if (!user) {
    return json<LoaderData>({
      ENV: getEnv(),
      user: null,
      userPhoto: "",
      basket: [],
    });
  }

  const basket = (await getBasket(user)) as Array<BasketItem>;

  const accessToken = user?.accessToken;

  const response = await axios
    .get(graphEndpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      responseType: "arraybuffer",
    })
    .catch(function (error) {
      console.log(error.toJSON());
    });

  if (response?.status !== 200) {
    return json<LoaderData>({
      ENV: getEnv(),
      user: user,
      userPhoto: "",
      basket: basket,
    });
  }

  const avatar = Buffer.from(response.data, "binary").toString("base64");
  const photo = "data:image/jpeg;base64, " + avatar;

  return json<LoaderData>({
    ENV: getEnv(),
    user: user,
    userPhoto: photo,
    basket: basket,
  });
};

export const UserContext = createContext(null);
export const BasketContext = createContext(null);

export default function App() {
  const data = useLoaderData<LoaderData>();
  const [basket, setBasket] = useState(data.basket);

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <div className="flex min-h-screen flex-col bg-orange-100">
          <UserContext.Provider value={data.user}>
            <BasketContext.Provider value={{ basket, setBasket }}>
              <Navbar userPhoto={data.userPhoto} />
              <div className="flex h-full flex-1 justify-center bg-zinc-100">
                <Outlet />
              </div>
              <Footer />
            </BasketContext.Provider>
          </UserContext.Provider>
        </div>
        <ScrollRestoration />
        <Scripts />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        <LiveReload />
      </body>
    </html>
  );
}
