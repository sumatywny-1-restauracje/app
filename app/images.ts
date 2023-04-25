import type { Image, FoodImages } from "types";

const foodImages: FoodImages = {
  hamburger: {
    src: require("~/assets/hamburger.png"),
    alt: "hamburger",
  },
  chickenPizza: {
    src: require("~/assets/pizza-slice.png"),
    alt: "chicken pizza",
  },
  frenchFries: {
    src: require("~/assets/french-fries.png"),
    alt: "french fries",
  },
  pizzaSlice: {
    src: require("~/assets/pizza-slice.png"),
    alt: "pizza slice",
  },
  hotDog: {
    src: require("~/assets/hot-dog.png"),
    alt: "hot dog",
  },
  fastFood: {
    src: require("~/assets/fast-food.png"),
    alt: "fast food",
  },
};

const avatarImage: Image = {
  src: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
  alt: "User avatar",
};

export { foodImages, avatarImage };
