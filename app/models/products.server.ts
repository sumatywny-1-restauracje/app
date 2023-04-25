import type { Product } from "~/types";

const PRODUCTS: Array<Product> = [
  {
    id: 1,
    name: "Chicken Burger",
    category: "burger",
    price: "3.50",
    rating: "5",
    numberOfRatings: 160,
    image:
      "https://images.pexels.com/photos/12034622/pexels-photo-12034622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    added: "2021-08-01",
  },
  {
    id: 2,
    name: "Chicken Pizza",
    category: "pizza",
    price: "4.20",
    rating: "5",
    numberOfRatings: 142,
    image:
      "https://images.pexels.com/photos/15126955/pexels-photo-15126955.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    added: "2021-08-02",
  },
  {
    id: 3,
    name: "Chicken Fry",
    category: "chicken",
    price: "5.00",
    rating: "5",
    numberOfRatings: 123,
    image:
      "https://images.pexels.com/photos/10361459/pexels-photo-10361459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    added: "2021-08-03",
  },
  {
    id: 4,
    name: "Grill Sandwich",
    category: "sandwich",
    price: "4.80",
    rating: "5",
    numberOfRatings: 112,
    image:
      "https://images.pexels.com/photos/5634630/pexels-photo-5634630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    added: "2021-08-04",
  },
  {
    id: 5,
    name: "Taco Traifi",
    category: "taco",
    price: "3.63",
    rating: "5",
    numberOfRatings: 152,
    image:
      "https://images.pexels.com/photos/10839496/pexels-photo-10839496.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    added: "2021-08-05",
  },
  {
    id: 6,
    name: "Noddle's Ramen",
    category: "noddle",
    price: "6.50",
    rating: "5",
    numberOfRatings: 163,
    image:
      "https://images.pexels.com/photos/13085835/pexels-photo-13085835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    added: "2021-08-06",
  },
  {
    id: 7,
    name: "Chicken Burger",
    category: "burger",
    price: "3.50",
    rating: "5",
    numberOfRatings: 160,
    image:
      "https://images.pexels.com/photos/12034622/pexels-photo-12034622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    added: "2021-08-07",
  },
  {
    id: 8,
    name: "Chicken Pizza",
    category: "pizza",
    price: "4.20",
    rating: "5",
    numberOfRatings: 142,
    image:
      "https://images.pexels.com/photos/15126955/pexels-photo-15126955.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    added: "2021-08-08",
  },
  {
    id: 9,
    name: "Chicken Fry",
    category: "chicken",
    price: "5.00",
    rating: "5",
    numberOfRatings: 123,
    image:
      "https://images.pexels.com/photos/10361459/pexels-photo-10361459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    added: "2021-08-09",
  },
  {
    id: 10,
    name: "Grill Sandwich",
    category: "sandwiche",
    price: "4.80",
    rating: "5",
    numberOfRatings: 112,
    image:
      "https://images.pexels.com/photos/5634630/pexels-photo-5634630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    added: "2021-08-10",
  },
  {
    id: 11,
    name: "Taco Traifi",
    category: "taco",
    price: "3.63",
    rating: "5",
    numberOfRatings: 152,
    image:
      "https://images.pexels.com/photos/10839496/pexels-photo-10839496.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    added: "2021-08-11",
  },
  {
    id: 12,
    name: "Noddle's Ramen",
    category: "noddle",
    price: "6.50",
    rating: "5",
    numberOfRatings: 163,
    image:
      "https://images.pexels.com/photos/13085835/pexels-photo-13085835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    added: "2021-08-12",
  },
  {
    id: 13,
    name: "Chicken Burger",
    category: "burger",
    price: "3.50",
    rating: "5",
    numberOfRatings: 160,
    image:
      "https://images.pexels.com/photos/12034622/pexels-photo-12034622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    added: "2021-08-13",
  },
  {
    id: 14,
    name: "Chicken Pizza",
    category: "pizza",
    price: "4.20",
    rating: "5",
    numberOfRatings: 142,
    image:
      "https://images.pexels.com/photos/15126955/pexels-photo-15126955.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    added: "2021-08-14",
  },
  {
    id: 15,
    name: "Chicken Fry",
    category: "chicken",
    price: "5.00",
    rating: "5",
    numberOfRatings: 123,
    image:
      "https://images.pexels.com/photos/10361459/pexels-photo-10361459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    added: "2021-08-15",
  },
  {
    id: 16,
    name: "Grill Sandwich",
    category: "sandwiche",
    price: "4.80",
    rating: "5",
    numberOfRatings: 112,
    image:
      "https://images.pexels.com/photos/5634630/pexels-photo-5634630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    added: "2021-08-16",
  },
  {
    id: 17,
    name: "Taco Traifi",
    category: "taco",
    price: "3.63",
    rating: "5",
    numberOfRatings: 152,
    image:
      "https://images.pexels.com/photos/10839496/pexels-photo-10839496.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    added: "2021-08-17",
  },
  {
    id: 18,
    name: "Noddle's Ramen",
    category: "noddle",
    price: "6.50",
    rating: "5",
    numberOfRatings: 163,
    image:
      "https://images.pexels.com/photos/13085835/pexels-photo-13085835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    added: "2021-08-18",
  },
];

export function getProducts() {
  return PRODUCTS;
}
