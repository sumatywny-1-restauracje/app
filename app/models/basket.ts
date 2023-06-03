import type { BasketItem, User } from "types";

const BASKET: Array<BasketItem> = [
  {
    id: 1,
    name: "Pizza",
    price: 4.2,
    quantity: 1,
    image: {
      src: "https://images.pexels.com/photos/15126955/pexels-photo-15126955.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Pizza",
    },
  },
  {
    id: 2,
    name: "Chicken Burger",
    price: 3.5,
    quantity: 5,
    image: {
      src: "https://images.pexels.com/photos/12034622/pexels-photo-12034622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Chicken Burger",
    },
  },
  {
    id: 3,
    name: "Chicken Fry",
    price: 5.0,
    quantity: 5,
    image: {
      src: "https://images.pexels.com/photos/10361459/pexels-photo-10361459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Chicken Fry",
    },
  },
  {
    id: 4,
    name: "Grill Sandwich",
    price: 4.8,
    quantity: 5,
    image: {
      src: "https://images.pexels.com/photos/5634630/pexels-photo-5634630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Grill Sandwich",
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
