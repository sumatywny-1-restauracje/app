type Product = {
  id: number;
  name: string;
  category: string;
  price: string;
  rating: number;
  numberOfRatings: number;
  image: string;
  added: string;
};

type Category = {
  id: number;
  name: string;
  image: Image;
};

type SortBy = {
  label: string;
  value: string;
};

type Image = {
  src: string;
  alt: string;
};

type FoodImages = {
  [key: string]: Image;
};

export { Product, Category, SortBy, Image, FoodImages };
