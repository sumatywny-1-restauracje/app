import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const loader: LoaderFunction = async ({ params }) => {
  let { category } = params;

  if (category === undefined) {
    return redirect("/menu/all?sortBy=recentlyAdded");
  }
  return null;
};

export default function MenuIndexRoute() {
  return <Outlet />;
}
