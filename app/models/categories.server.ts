import type { Category, SortBy } from "types";

import { categoriesImages } from "~/images";

const CATEGORIES: Array<Category> = [
  { id: 1, name: "burger", image: categoriesImages.burgers },
  { id: 2, name: "pizza", image: categoriesImages.pizzas },
  { id: 3, name: "pasta", image: categoriesImages.pastas },
  { id: 4, name: "dessert", image: categoriesImages.desserts },
  { id: 5, name: "drinks", image: categoriesImages.drinks },
  { id: 6, name: "buritto", image: categoriesImages.burittos },
  { id: 7, name: "sets", image: categoriesImages.food_sets },
  { id: 8, name: "salads", image: categoriesImages.salads },
  { id: 9, name: "additions", image: categoriesImages.additions },
];

const SORT_BY: Array<SortBy> = [
  { label: "Recently Added", value: "recentlyAdded" },
  { label: "Most Popular", value: "mostPopular" },
  { label: "Top Rated", value: "topRated" },
  { label: "Price - Ascending", value: "priceAscending" },
  { label: "Price - Descending", value: "priceDescending" },
];

export function getCategories() {
  return CATEGORIES;
}

export function getSortByOptions() {
  return SORT_BY;
}
