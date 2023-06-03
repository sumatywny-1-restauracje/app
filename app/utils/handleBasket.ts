import type { BasketItem } from "types";
import { updateUserBasket } from "~/models/basket";

export const updateBasket = (
  accessToken: string,
  basket: BasketItem[],
  setBasket: (basket: BasketItem[]) => void,
  item: BasketItem,
  quantity: number
) => {
  if (basket.length === 0) {
    setBasket([{ ...item, quantity }]);
    updateUserBasket(accessToken, [{ ...item, quantity }]);
    return;
  }
  const itemIndex = basket.findIndex((basketItem) => basketItem.id === item.id);
  const newBasket = [...basket];
  if (itemIndex === -1) {
    newBasket.push({ ...item, quantity });
  } else {
    if (quantity === 0) {
      newBasket.splice(itemIndex, 1);
    } else {
      newBasket[itemIndex].quantity = quantity;
    }
  }
  setBasket(newBasket);
  updateUserBasket(accessToken, newBasket);
};

export const deleteItemFromBasket = (
  basket: BasketItem[],
  setBasket: (basket: BasketItem[]) => void,
  item_id: number
) => {
  const itemIndex = basket.findIndex((basketItem) => basketItem.id === item_id);
  const newBasket = [...basket];
  newBasket.splice(itemIndex, 1);
  setBasket(newBasket);
};
