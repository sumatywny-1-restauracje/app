import type { Location } from "types";
import type { V2_MetaFunction } from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getUserInformation } from "~/models/user.server";

export const meta: V2_MetaFunction = () => [{ title: "Employee Panel" }];

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://api.tiles.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css",
  },
];

// type LoaderData = {
//   locations: Array<Location>;
// };
export const loader: LoaderFunction = async () => {
  const userData = await getUserInformation();
  console.log(userData);
  return json({
    userData: userData,
  });
};

export default function EmployeePanelRoute() {
  const data = useLoaderData();

  return (
    <div className="mb-12 mt-8 flex w-5/6 max-w-screen-lg flex-col gap-9 rounded-xl border-rose-300 bg-orange-100 p-4 md:w-4/6">
      <h1 className=" w-full text-center text-2xl font-bold text-rose-400 sm:text-4xl lg:col-span-2 lg:text-5xl">
        Employee Panel
      </h1>
      <div className="h-full min-h-[600px] w-full overflow-hidden break-all rounded-2xl border border-rose-400">
        {JSON.stringify(data.userData)}
      </div>
    </div>
  );
}
