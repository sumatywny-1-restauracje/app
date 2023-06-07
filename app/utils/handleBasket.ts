import type { BasketItem, User } from "types";

export const updateBasket = (
  user: User,
  basket: BasketItem[],
  setBasket: (basket: BasketItem[]) => void,
  item: BasketItem,
  quantity: number
) => {
  if (!user) {
    return;
  }

  if (basket.length === 0) {
    setBasket([{ ...item, quantity }]);
    window.localStorage.setItem(
      `userBasket:${user?.email}`,
      JSON.stringify({ ...item, quantity })
    );
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
  window.localStorage.setItem(
    `userBasket:${user?.email}`,
    JSON.stringify(newBasket)
  );
};

export const deleteItemFromBasket = (
  user: User,
  basket: BasketItem[],
  setBasket: (basket: BasketItem[]) => void,
  item_id: number
) => {
  if (!user) {
    return;
  }

  const itemIndex = basket.findIndex((basketItem) => basketItem.id === item_id);
  const newBasket = [...basket];
  newBasket.splice(itemIndex, 1);
  setBasket(newBasket);
  window.localStorage.setItem(
    `userBasket:${user?.email}`,
    JSON.stringify(newBasket)
  );
};
