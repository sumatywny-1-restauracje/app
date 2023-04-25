import Teaser from "~/components/home/Teaser";
import FoodCategories from "~/components/home/FoodCategories";
import RegularMenu from "~/components/home/RegularMenu";
import SpecialOffers from "~/components/home/SpecialOffers";
import { useRouteError } from "@remix-run/react";

export default function IndexRoute() {
  return (
    <div className="flex w-full flex-col items-center gap-16 pb-16 sm:gap-20 lg:gap-24">
      <Teaser />
      <div className="flex w-full max-w-screen-2xl flex-col items-center gap-16 sm:gap-20 lg:gap-24">
        <FoodCategories />
        <RegularMenu />
        <SpecialOffers />
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  let error = useRouteError();

  if (error instanceof Error) {
    return (
      <div className="flex flex-auto items-center justify-center">
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
