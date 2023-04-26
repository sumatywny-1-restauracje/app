import type { LoaderFunction } from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/react";
import type { Image } from "types";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { confusedTravolta } from "~/images";
import ErrorPage from "~/components/ErrorPage";

export const meta: V2_MetaFunction = () => [{ title: "Not Found" }];

type LoaderData = {
  confusedTravolta: Image;
};

export const loader: LoaderFunction = async () => {
  return json<LoaderData>({
    confusedTravolta: confusedTravolta,
  });
};

export default function NotFoundPage() {
  const data = useLoaderData<LoaderData>();
  return (
    <div className="flex w-full justify-center pb-4 pt-8">
      <ErrorPage
        image={data.confusedTravolta}
        action={{ to: "/", text: "Bact to Home" }}
      />
    </div>
  );
}
