import type {
  LoaderFunction,
  ActionFunction,
  ActionArgs,
  LoaderArgs,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import type { Category, Image, Product, SortBy } from "types";
import invariant from "tiny-invariant";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useRouteError } from "@remix-run/react";
import { getProductsByCategory } from "~/models/products.server";
import { getCategories, getSortByOptions } from "~/models/categories.server";
import Header from "~/components/menu/Header";
import FoodElement from "~/components/foodElement/FoodElement";
import { getUserAvatar } from "~/models/user.server";

const handleSortProducts = async (products: Array<Product>, sortBy: string) => {
  const sortedProducts = products.sort((a: any, b: any) => {
    if (sortBy === "recentlyAdded") {
      return b.added - a.added;
    } else if (sortBy === "mostPopular") {
      return b.numberOfRatings - a.numberOfRatings;
    } else if (sortBy === "topRated") {
      return b.rating - a.rating;
    } else if (sortBy === "priceAscending") {
      return a.price - b.price;
    } else if (sortBy === "priceDescending") {
      return b.price - a.price;
    } else {
      return b.added - a.added;
    }
  });

  return sortedProducts;
};

type LoaderData = {
  menuHeaderAvatar: Image;
  categories: Array<Category>;
  category: string | null;
  sortBy: string | null;
  sortByOptions: Array<SortBy>;
  products: Array<Product> | null;
  errorMessage?: string;
};

export const loader: LoaderFunction = async ({
  params,
  request,
}: LoaderArgs) => {
  let { category } = params;
  const url = new URL(request.url);
  const sortBy = url.searchParams.get("sortBy") || "recentlyAdded";

  invariant(typeof category === "string", "category param must be string");
  invariant(typeof sortBy === "string", "sort by param must be string");

  const categories = await getCategories();
  const sortByOptions = await getSortByOptions();
  const menuHeaderAvatar = await getUserAvatar();

  if (!categories.find((c) => c.name === category)) {
    return json<LoaderData>({
      menuHeaderAvatar: menuHeaderAvatar,
      categories: categories,
      category: null,
      sortBy: sortBy,
      sortByOptions: sortByOptions,
      products: null,
      errorMessage: `Oh no. Category with name: "${category}" was not found`,
    });
  }

  if (!sortByOptions.find((s) => s.value === sortBy)) {
    return json<LoaderData>({
      menuHeaderAvatar: menuHeaderAvatar,
      categories: categories,
      category: null,
      sortBy: null,
      sortByOptions: sortByOptions,
      products: null,
      errorMessage: `Oh no. Sort by: "${sortBy}" is not allowed`,
    });
  }

  const products = await getProductsByCategory(category);
  const sortedProducts = await handleSortProducts(products, sortBy);

  return json<LoaderData>({
    menuHeaderAvatar: menuHeaderAvatar,
    categories: categories,
    category: category,
    sortBy: sortBy,
    sortByOptions: sortByOptions,
    products: sortedProducts,
  });
};

export const action: ActionFunction = async ({
  request,
  params,
}: ActionArgs) => {
  let { category } = params;
  invariant(typeof category === "string", "category param must be string");

  const formData = await request.formData();
  const sortBy = formData.get("sortBy");

  return redirect(`/menu/${category}?sortBy=${sortBy}`);
};

export default function MenuCategoryRoute() {
  const data = useLoaderData<LoaderData>();

  return (
    <div className="flex h-full w-full flex-col items-center gap-12 pb-16">
      <Header
        menuHeaderAvatar={data.menuHeaderAvatar}
        categories={data.categories}
        sortBy={data.sortBy}
        sortByOptions={data.sortByOptions}
        selectedCategory={data.category}
      />
      <div className="flex w-full max-w-screen-2xl flex-col gap-8">
        {data.products === null ? (
          <div className="flex h-full flex-col items-center justify-center gap-8">
            <p className="text-4xl text-orange-300">{data.errorMessage}</p>
            <Link
              to="/menu/"
              className="text-4xl text-red-500 underline hover:text-red-700"
            >
              Go Back to Menu Page!
            </Link>
          </div>
        ) : (
          <div className="mx-auto flex w-4/6 flex-wrap content-center gap-12 sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {data.products.map((product) => (
              <FoodElement key={product.id} product={product} />
            ))}
          </div>
        )}
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
