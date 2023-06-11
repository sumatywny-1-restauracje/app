import type { Product, SpecialOffer, ApiProductsData } from "~/types";
import { specialOfferImages } from "~/images";
import { api } from "~/utils/api";

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
