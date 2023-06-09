import type {
  LoaderFunction,
  ActionFunction,
  ActionArgs,
  LoaderArgs,
} from "@remix-run/node";
import type { Category, Image, Product, SortBy } from "types";
import { redirect, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getProductsByCategory } from "~/models/products.server";
import { getCategories, getSortByOptions } from "~/models/categories.server";
import { getUserAvatar } from "~/models/user.server";

type LoaderData = {
  menuHeaderAvatar: Image;
  categories: Array<Category>;
  category: string | null;
  sortBy: string | null;
  sortByOptions: Array<SortBy>;
  products: Array<Product> | null;
  confusedTravolta?: Image;
};

export const loader: LoaderFunction = async () => {
  const categories = await getCategories();
  const sortByOptions = await getSortByOptions();
  const menuHeaderAvatar = await getUserAvatar();

  // return json<LoaderData>({
  //   menuHeaderAvatar: menuHeaderAvatar,
  //   categories: categories,
  //   category: category,
  //   sortBy: sortBy,
  //   sortByOptions: sortByOptions,
  //   products: sortedProducts,
  // });
  return null;
};

export default function MenuCategoryRoute() {
  // const data = useLoaderData<LoaderData>();

  return (
    <div className="flex h-full w-full flex-col items-center gap-12 pb-16"></div>
  );
}
