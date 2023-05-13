import type { Image } from "types";
import { Link } from "@remix-run/react";

type FoodCategoriesProps = {
  foodCategories: Array<{ name: string; image: Image }>;
};

const FoodCategories = ({ foodCategories }: FoodCategoriesProps) => {
  return (
    <div className="flex w-4/6 flex-col gap-10 px-1 font-sans text-gray-700 md:gap-12">
      <div className="flex flex-col flex-wrap items-center justify-around max-md:gap-6 sm:flex-row md:justify-between">
        <h2 className="w-7/12 bg-clip-text text-3xl font-extrabold max-sm:text-center sm:w-1/2 sm:text-4xl md:text-5xl">
          Best <span className="text-rose-400">Delivered</span> Categories
        </h2>
        <span className="w-7/12 text-xs text-gray-500 max-sm:text-center sm:w-1/4 md:text-sm">
          Here Are Some Of The Best Distributed Categories. If You Want You Can
          Order From Here.
        </span>
      </div>
      <div className="flex flex-wrap justify-around gap-8 xl:gap-16">
        <div className="flex flex-col items-center">
          <img
            src={foodCategories[0].image.src}
            alt={foodCategories[0].image.alt}
            className="w-20 sm:w-24 md:w-28 lg:w-44 xl:w-52"
          />
          <span className="mb-1 mt-3 text-base font-bold md:text-xl">
            {foodCategories[0].name.toUpperCase()}
          </span>
          <Link
            to="/menu/burger?sortBy=recentlyAdded"
            prefetch="intent"
            className="text-sm font-semibold text-rose-400 hover:text-rose-500 md:text-lg"
          >
            Order Now &gt;
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={foodCategories[1].image.src}
            alt={foodCategories[1].image.alt}
            className="w-20 sm:w-24 md:w-28 lg:w-44 xl:w-52"
          />
          <span className="mb-1 mt-3 text-base font-bold md:text-xl">
            {foodCategories[1].name.toUpperCase()}
          </span>
          <Link
            to="/menu/pizza?sortBy=recentlyAdded"
            prefetch="intent"
            className="text-sm font-semibold text-rose-400 hover:text-rose-500 md:text-lg"
          >
            Order Now &gt;
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={foodCategories[2].image.src}
            alt={foodCategories[2].image.alt}
            className="w-20 sm:w-24 md:w-28 lg:w-44 xl:w-52"
          />
          <span className="mb-1 mt-3 text-base font-bold md:text-xl">
            {foodCategories[2].name.toUpperCase()}
          </span>
          <Link
            to="/menu/dessert?sortBy=recentlyAdded"
            prefetch="intent"
            className="text-sm font-semibold text-rose-400 hover:text-rose-500 md:text-lg"
          >
            Order Now &gt;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodCategories;
