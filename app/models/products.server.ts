import type { Product, SpecialOffer, ApiProductsData } from "~/types";
import { specialOfferImages } from "~/images";
import { api } from "~/utils/api";

const PRODUCTS: Array<Product> = [
  {
    id: 1,
    name: "Chicken Burger",
    category: "burgers",
    price: "3.50",
    rating: 5,
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
    rating: 5,
    numberOfRatings: 142,
    image:
      "https://images.pexels.com/photos/15126955/pexels-photo-15126955.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    added: "2021-08-02",
  },
  {
    id: 3,
    name: "Chicken Fry",
    category: "additions",
    price: "5.00",
    rating: 5,
    numberOfRatings: 123,
    image:
      "https://images.pexels.com/photos/10361459/pexels-photo-10361459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    added: "2021-08-03",
  },
  {
    id: 4,
    name: "Grill Sandwich",
    category: "additions",
    price: "4.80",
    rating: 5,
    numberOfRatings: 112,
    image:
      "https://images.pexels.com/photos/5634630/pexels-photo-5634630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    added: "2021-08-04",
  },
  {
    id: 5,
    name: "Taco Traifi",
    category: "buritto",
    price: "3.63",
    rating: 5,
    numberOfRatings: 152,
    image:
      "https://images.pexels.com/photos/10839496/pexels-photo-10839496.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    added: "2021-08-05",
  },
  {
    id: 6,
    name: "Noddle's Ramen",
    category: "pasta",
    price: "6.50",
    rating: 5,
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
    rating: 5,
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
    rating: 5,
    numberOfRatings: 142,
    image:
      "https://images.pexels.com/photos/15126955/pexels-photo-15126955.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    added: "2021-08-08",
  },
  {
    id: 9,
    name: "Chicken Fry",
    category: "additions",
    price: "5.00",
    rating: 5,
    numberOfRatings: 123,
    image:
      "https://images.pexels.com/photos/10361459/pexels-photo-10361459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    added: "2021-08-09",
  },
  {
    id: 10,
    name: "Grill Sandwich",
    category: "additions",
    price: "4.80",
    rating: 5,
    numberOfRatings: 112,
    image:
      "https://images.pexels.com/photos/5634630/pexels-photo-5634630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    added: "2021-08-10",
  },
  {
    id: 11,
    name: "Taco Traifi",
    category: "buritto",
    price: "3.63",
    rating: 5,
    numberOfRatings: 152,
    image:
      "https://images.pexels.com/photos/10839496/pexels-photo-10839496.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    added: "2021-08-11",
  },
  {
    id: 12,
    name: "Noddle's Ramen",
    category: "pasta",
    price: "6.50",
    rating: 5,
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
    rating: 5,
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
    rating: 5,
    numberOfRatings: 142,
    image:
      "https://images.pexels.com/photos/15126955/pexels-photo-15126955.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    added: "2021-08-14",
  },
  {
    id: 15,
    name: "Chicken Fry",
    category: "additions",
    price: "5.00",
    rating: 5,
    numberOfRatings: 123,
    image:
      "https://images.pexels.com/photos/10361459/pexels-photo-10361459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    added: "2021-08-15",
  },
  {
    id: 16,
    name: "Grill Sandwich",
    category: "additions",
    price: "4.80",
    rating: 5,
    numberOfRatings: 112,
    image:
      "https://images.pexels.com/photos/5634630/pexels-photo-5634630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    added: "2021-08-16",
  },
  {
    id: 17,
    name: "Taco Traifi",
    category: "buritto",
    price: "3.63",
    rating: 5,
    numberOfRatings: 152,
    image:
      "https://images.pexels.com/photos/10839496/pexels-photo-10839496.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    added: "2021-08-17",
  },
  {
    id: 18,
    name: "Noddle's Ramen",
    category: "pasta",
    price: "6.50",
    rating: 5,
    numberOfRatings: 163,
    image:
      "https://images.pexels.com/photos/13085835/pexels-photo-13085835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    added: "2021-08-18",
  },
];

const SPECIAL_OFFERS: Array<SpecialOffer> = [
  {
    id: 1,
    image: specialOfferImages.first,
    value: "50%",
    discountCode: "BURGERS50",
  },
  {
    id: 2,
    image: specialOfferImages.second,
    value: "25%",
    discountCode: "DESSERTS25",
  },
  {
    id: 3,
    image: specialOfferImages.third,
    value: "25%",
    discountCode: "SALADS25",
  },
];

// export function getProducts() {
//   return PRODUCTS;
// }

export async function getProducts() {
  const res = await api.get(`/menu`);

  if (res.status !== 200) {
    throw new Error("Error while fetching menu");
  }

  const productsData = res.data as ApiProductsData;
  const products = productsData.menuItems.map((product) => {
    return {
      id: product.itemId,
      name: product.name,
      description: product.description,
      category: product.category.categoryName,
      ingredients: product.ingredients,
      price: product.price,
      rating: product.rating,
      numberOfRatings: product.numberOfRatings,
      image: product.photoUrl,
      added: product.createdAt,
    };
  });

  return products as Array<Product>;
}

export async function getProductsByCategory(category: string) {
  const products = await getProducts();
  return products.filter((product) => product.category === category);
}

export async function getProductsByCategory2(categoryId: string) {
  const res = await api.get(`/menu/category/${categoryId}`);

  if (res.status !== 200) {
    throw new Error("Error while fetching menu by category");
  }

  const products = res.data;
  return products;
}

export async function updateProduct(product) {
  const res = await api.patch(`/menu/${product.id}`, product);

  if (res.status !== 200) {
    throw new Error("Error while updating product");
  }

  const updatedProduct = res.data;
  return updatedProduct;
}

export async function deleteProduct(id) {
  const res = await api.delete(`/menu/${id}`);

  if (res.status !== 200) {
    throw new Error("Error while deleting product");
  }

  const deletedProduct = res.data;
  return deletedProduct;
}

export async function addProduct(product) {
  const res = await api.post(`/menu`, product);

  if (res.status !== 200) {
    throw new Error("Error while adding product");
  }

  const addedProduct = res.data;
  return addedProduct;
}

export function getProductById(id: number) {
  return PRODUCTS.find((product) => product.id === id);
}

export function getSpecialOffers() {
  return SPECIAL_OFFERS;
}
