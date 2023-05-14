import type { Image, ImagesObject } from "types";

const foodImages: ImagesObject = {
  hamburger: {
    src: require("~/assets/hamburger.png"),
    alt: "hamburger",
  },
  chickenPizza: {
    src: require("~/assets/pizza.png"),
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

const categoriesImages: ImagesObject = {
  pizzas: {
    src: require("~/assets/categories_icons/pizzas.svg"),
    alt: "pizzas",
  },
  burgers: {
    src: require("~/assets/categories_icons/burgers.svg"),
    alt: "burgers",
  },
  salads: {
    src: require("~/assets/categories_icons/salads.svg"),
    alt: "salads",
  },
  desserts: {
    src: require("~/assets/categories_icons/desserts.svg"),
    alt: "desserts",
  },
  drinks: {
    src: require("~/assets/categories_icons/drinks.svg"),
    alt: "drinks",
  },
  burittos: {
    src: require("~/assets/categories_icons/burittos.svg"),
    alt: "burittos",
  },
  additions: {
    src: require("~/assets/categories_icons/additions.svg"),
    alt: "additions",
  },
  food_sets: {
    src: require("~/assets/categories_icons/food_sets.svg"),
    alt: "food sets",
  },
  pastas: {
    src: require("~/assets/categories_icons/pastas.svg"),
    alt: "pastas",
  },
};

const avatarImage: Image = {
  src: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
  alt: "User avatar",
};

const specialOfferImages: ImagesObject = {
  first: {
    src: "https://images.pexels.com/photos/580612/pexels-photo-580612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Hamburger Offer",
  },
  second: {
    src: "https://images.pexels.com/photos/2586924/pexels-photo-2586924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Ice Cream Offer",
  },
  third: {
    src: "https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Salad Offer",
  },
};

const homeHeaderImage: Image = {
  src: require("~/assets/pizza.png"),
  alt: "Menu Header",
};

const confusedTravolta: Image = {
  src: require("~/assets/confused-travolta.gif"),
  alt: "Confused Travolta",
};

const jobApplicationImage: Image = {
  src: require("~/assets/pizza-chef.png"),
  alt: "Pizza Chef",
};

export {
  foodImages,
  categoriesImages,
  avatarImage,
  specialOfferImages,
  homeHeaderImage,
  confusedTravolta,
  jobApplicationImage,
};
