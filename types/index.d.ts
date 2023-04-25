type Product = {
  id: number;
  name: string;
  category: string;
  price: string;
  rating: string;
  numberOfRatings: number;
  image: string;
  added: string;
};

type Category = {
  id: number;
  name: string;
  image: string;
};

export { Product, Category };
