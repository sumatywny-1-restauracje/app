import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import FoodElement from "~/components/foodElement/FoodElement";
import { getProducts } from "~/models/products.server";
import Header from "./menu/Header";
import HamburgerPath from "~/assets/hamburger.png";
import ChickenPizzaPath from "~/assets/pizza-slice.png";
import FrenchFriesPath from "~/assets/french-fries.png";

// const handleProductsToDisplay = (items: any) => {
//   const filteredItems =
//     selectedCategory === "all"
//       ? items
//       : items.filter((item: any) => item.category === selectedCategory);

//   const sortedItems = filteredItems.sort((a: any, b: any) => {
//     if (sortBy === "recentlyAdded") {
//       return b.added - a.added;
//     } else if (sortBy === "mostPopular") {
//       return b.numberOfRatings - a.numberOfRatings;
//     } else if (sortBy === "topRated") {
//       return b.rating - a.rating;
//     } else if (sortBy === "priceAscending") {
//       return a.price - b.price;
//     } else if (sortBy === "priceDescending") {
//       return b.price - a.price;
//     } else {
//       return b.added - a.added;
//     }
//   });

//   const slicedItems =
//     sortedItems.length > displayNumberOfProducts
//       ? sortedItems.slice(0, displayNumberOfProducts)
//       : sortedItems;
//   return {
//     totalNumberOfCategoryProducts: filteredItems.length,
//     products: slicedItems,
//   };
// };

export const loader: LoaderFunction = async () => {
  const products = await getProducts();
  return json({
    products: products,
    totalNumberOfCategoryProducts: products.length,
  });
};

export default function MenuCategoryRoute() {
  const CATEGORIES = [
    { id: 1, name: "all", image: HamburgerPath },
    { id: 2, name: "burger", image: HamburgerPath },
    { id: 3, name: "pizza", image: ChickenPizzaPath },
    { id: 4, name: "dessert", image: FrenchFriesPath },
    { id: 5, name: "drinks", image: FrenchFriesPath },
    { id: 6, name: "chicken", image: ChickenPizzaPath },
    { id: 7, name: "sandwich", image: HamburgerPath },
    { id: 8, name: "taco", image: ChickenPizzaPath },
    { id: 9, name: "noddle", image: FrenchFriesPath },
    { id: 10, name: "ramen", image: FrenchFriesPath },
  ];

  const data = useLoaderData<typeof loader>();
  const [sortBy, setSortBy] = useState("recentlyAdded");
  const [displayNumberOfProducts, setDisplayNumberOfProducts] = useState(9);
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div className="flex w-full max-w-screen-2xl flex-col gap-8">
      <div className="mx-auto flex w-4/6 flex-wrap content-center gap-12 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {data.products.map((product) => (
          <FoodElement key={product?.id} product={product} />
        ))}
      </div>
      <div
        className={
          " flex w-full flex-col items-center gap-2 " +
          (data.products.length === data.totalNumberOfCategoryProducts &&
            "hidden")
        }
      >
        <div className="w-1/3 border border-dashed border-rose-400" />
        <button
          className="w-max bg-transparent font-bold text-rose-400 hover:text-rose-500"
          onClick={() => setDisplayNumberOfProducts(data.products.length + 9)}
        >
          <div className="flex flex-col">
            <span className="text-2xl font-bold">
              -&gt; Load More Products &lt;-
            </span>
            <span className="text-xs font-normal">
              (Displayed {data.products.length} Of Total{" "}
              {data.totalNumberOfCategoryProducts})
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
