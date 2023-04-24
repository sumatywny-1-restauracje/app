import type { V2_MetaFunction } from "@remix-run/node";
import Teaser from "~/components/homePageElements/Teaser";
import FoodCategories from "~/components/homePageElements/FoodCategories";
import RegularMenu from "~/components/homePageElements/RegularMenu";
import SpecialOffers from "~/components/homePageElements/SpecialOffers";

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
