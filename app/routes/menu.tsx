import type { LoaderFunction } from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const meta: V2_MetaFunction = () => [{ title: "Menu" }];

export const loader: LoaderFunction = async ({ params }) => {
  let { category } = params;

  if (category === undefined) {
    return redirect("/menu/burgers?sortBy=recentlyAdded");
  }
  return null;
};

export default function MenuIndexRoute() {
  return <Outlet />;
}
