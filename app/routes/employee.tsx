import type { LoaderFunction, LoaderArgs } from "@remix-run/node";
import type { User } from "~/types";
import type { V2_MetaFunction } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";

export const meta: V2_MetaFunction = () => [{ title: "Employee Panel" }];

export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderArgs) => {
  const emp = (await authenticator.isAuthenticated(request)) as User;

  if (!emp) {
    return redirect("/");
  }

  if (
    request.url.includes("/employee/local") ||
    request.url.includes("/employee/boss")
  ) {
    return null;
  }

  if (emp?.userRole === "EMPLOYEE" || emp?.userRole === "DELIVERY") {
    return redirect("/employee/local");
  }
  if (emp?.userRole === "BOSS") {
    return redirect("/employee/boss");
  }
};

export default function EmployeeIndexRoute() {
  return <Outlet />;
}
