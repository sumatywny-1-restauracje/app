import type { V2_MetaFunction } from "@remix-run/node";
import Teaser from "~/components/home/Teaser";
import FoodCategories from "~/components/home/FoodCategories";
import RegularMenu from "~/components/home/RegularMenu";
import SpecialOffers from "~/components/home/SpecialOffers";

export const meta: V2_MetaFunction = () => [{ title: "App" }];

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

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  // return <h1>{error}</h1>;
}
