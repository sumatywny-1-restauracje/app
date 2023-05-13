import type { BasketItem, User } from "types";

const BASKET: Array<BasketItem> = [
  {
    id: 1,
    price: 10.0,
    quantity: 1,
    image: {
      src: "https://images.pexels.com/photos/15126955/pexels-photo-15126955.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Pizza",
    },
  },
  {
    id: 2,
    price: 5.0,
    quantity: 5,
    image: {
      src: "https://images.pexels.com/photos/12034622/pexels-photo-12034622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Hamburger",
    },
  },
  {
    id: 3,
    price: 5.0,
    quantity: 5,
    image: {
      src: "https://images.pexels.com/photos/12034622/pexels-photo-12034622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Hamburger",
    },
  },
  {
    id: 4,
    price: 5.0,
    quantity: 5,
    image: {
      src: "https://images.pexels.com/photos/12034622/pexels-photo-12034622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Hamburger",
    },
  },
  {
    id: 5,
    price: 5.0,
    quantity: 5,
    image: {
      src: "https://images.pexels.com/photos/12034622/pexels-photo-12034622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Hamburger",
    },
  },
  {
    id: 6,
    price: 5.0,
    quantity: 5,
    image: {
      src: "https://images.pexels.com/photos/12034622/pexels-photo-12034622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Hamburger",
    },
  },
];

export function getBasket(user: User) {
  return BASKET;
}

export function updateUserBasket(
  accessToken: string,
  newBasket: Array<BasketItem>
) {
  console.log("updateBasket");
}
