import type { LoaderFunction } from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/react";
import type { Image, Product, SpecialOffer } from "types";
import { json } from "@remix-run/node";
import { useLoaderData, useRouteError } from "@remix-run/react";
import { getUserAvatar } from "~/models/user.server";
import { getProducts, getSpecialOffers } from "~/models/products.server";
import { getCategories } from "~/models/categories.server";
import { homeHeaderImage } from "~/images";
import Teaser from "~/components/home/Teaser";
import FoodCategories from "~/components/home/FoodCategories";
import RegularMenu from "~/components/home/RegularMenu";
import SpecialOffers from "~/components/home/SpecialOffers";

export const meta: V2_MetaFunction = () => [{ title: "Foodsi" }];

type LoaderData = {
  homeHeaderAvatar: Image;
  homeHeaderImg: Image;
  specialOffers: Array<SpecialOffer>;
  foodCategories: Array<{ name: string; image: Image }>;
  homeProducts: Array<Product>;
};

export const loader: LoaderFunction = async () => {
  const menuHeaderAvatar = await getUserAvatar();
  const homeHeaderImg = homeHeaderImage;
  const specialOffers = await getSpecialOffers();
  const foodCategories = await getCategories();
  const products = await getProducts();

  const homeProducts = products.sort((a, b) => (a.rating > b.rating ? 1 : -1));

  return json<LoaderData>({
    homeHeaderAvatar: menuHeaderAvatar,
    specialOffers: specialOffers,
    homeHeaderImg: homeHeaderImg,
    foodCategories: foodCategories.slice(0, 3),
    homeProducts: homeProducts.slice(0, 6),
  });
};

export default function IndexRoute() {
  const data = useLoaderData<LoaderData>();
  return (
    <div className="flex w-full flex-col items-center gap-16 pb-16 sm:gap-20 lg:gap-24">
      <Teaser
        homeHeaderAvatar={data.homeHeaderAvatar}
        homeHeaderImg={data.homeHeaderImg}
      />
      <div className="flex w-full max-w-screen-2xl flex-col items-center gap-16 sm:gap-20 lg:gap-24">
        <FoodCategories foodCategories={data.foodCategories} />
        <RegularMenu homeProducts={data.homeProducts} />
        <SpecialOffers specialOffers={data.specialOffers} />
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
