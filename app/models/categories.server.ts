import type { Category, SortBy } from "types";

import { foodImages } from "~/images";

const CATEGORIES: Array<Category> = [
  { id: 1, name: "all", image: foodImages.hamburger },
  { id: 2, name: "burger", image: foodImages.hamburger },
  { id: 3, name: "pizza", image: foodImages.chickenPizza },
  { id: 4, name: "dessert", image: foodImages.frenchFries },
  { id: 5, name: "drinks", image: foodImages.frenchFries },
  { id: 6, name: "chicken", image: foodImages.chickenPizza },
  { id: 7, name: "sandwich", image: foodImages.hamburger },
  { id: 8, name: "taco", image: foodImages.chickenPizza },
  { id: 9, name: "noddle", image: foodImages.frenchFries },
  { id: 10, name: "ramen", image: foodImages.frenchFries },
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
