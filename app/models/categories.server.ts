import { api } from "~/utils/api";
import type { Category, SortBy, ApiCategoriesData } from "types";
import { categoriesImages } from "~/images";

const SORT_BY: Array<SortBy> = [
  { label: "Recently Added", value: "recentlyAdded" },
  { label: "Most Popular", value: "mostPopular" },
  { label: "Top Rated", value: "topRated" },
  { label: "Price - Ascending", value: "priceAscending" },
  { label: "Price - Descending", value: "priceDescending" },
];

export async function getCategories() {
  const res = await api.get(`/category`);

  if (res.status !== 200) {
    throw new Error("Error while fetching categories");
  }

  const categoriesData = res.data as ApiCategoriesData;
  const job_offers = categoriesData.categories.map((category) => {
    return {
      id: category.categoryId,
      name: category.categoryName,
      image: {
        src: category.photoUrl,
        alt: category.categoryName,
      },
    };
  });
  console.log(job_offers);
  return job_offers as Array<Category>;
}

export function getSortByOptions() {
  return SORT_BY;
}

export async function createCategory(category) {
  const res = await api.post(`/category`, category);

  if (res.status !== 200) {
    throw new Error("Error while creating category");
  }

  const categoryData = res.data;
  return categoryData;
}

export async function updateCategory(category) {
  const res = await api.patch(`/category/${category.id}`, category);

  if (res.status !== 200) {
    throw new Error("Error while updating category");
  }

  const categoryData = res.data;
  return categoryData;
}

export async function deleteCategory(categoryId: string) {
  const res = await api.delete(`/category/${categoryId}`);

  if (res.status !== 200) {
    throw new Error("Error while deleting category");
  }

  const categoryData = res.data;
  return categoryData;
}
