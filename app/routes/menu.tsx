import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import {
  Outlet,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { getCategories } from "~/models/categories.server";
import Header from "./menu/Header";
import { useState } from "react";
import HamburgerPath from "~/assets/hamburger.png";
import ChickenPizzaPath from "~/assets/pizza-slice.png";
import FrenchFriesPath from "~/assets/french-fries.png";

export const loader: LoaderFunction = async ({ params }) => {
  let { categoryName } = params;
  const categories = await getCategories();

  if (categoryName === undefined) {
    return redirect("/menu/all");
  } else if (!categories.find((c) => c.name === categoryName)) {
    throw new Response(
      `Oh no. Category with name: "${categoryName}" was not found`,
      { status: 404 }
    );
  }
  return null;
};

export default function MenuIndexRoute() {
  const data = useLoaderData();
  const [sortBy, setSortBy] = useState("recentlyAdded");
  const [displayNumberOfProducts, setDisplayNumberOfProducts] = useState(9);
  const [selectedCategory, setSelectedCategory] = useState("all");

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

  return (
    <div className="flex w-full flex-col items-center gap-12 pb-16">
      <Header
        categories={CATEGORIES}
        sortBy={sortBy}
        setSortBy={setSortBy}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Outlet />;
    </div>
  );
}

export function ErrorBoundary() {
  let error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>{error.statusText}</h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
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
