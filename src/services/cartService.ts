// cartService.ts
import type { CartItemRequest } from "../types/Order";

const CART_KEY = "shopping_cart";

export const saveToCart = (item: CartItemRequest): void => {
  const currentCart = getCart();
  
  const existingItem = [...currentCart].find(i => i.productId === item.productId);
  
  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    currentCart.add(item);
  }

  localStorage.setItem(CART_KEY, JSON.stringify(Array.from(currentCart)));
};

export const getCart = (): Set<CartItemRequest> => {
  const data = localStorage.getItem(CART_KEY);
  return data ? new Set(JSON.parse(data)) : new Set();
};