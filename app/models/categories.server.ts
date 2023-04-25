import type { Category } from "types";

import HamburgerPath from "~/assets/hamburger.png";
import ChickenPizzaPath from "~/assets/pizza-slice.png";
import FrenchFriesPath from "~/assets/french-fries.png";

const CATEGORIES: Array<Category> = [
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

export function getCategories() {
  return CATEGORIES;
}
