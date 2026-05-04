// cartService.ts
import type { CartItemRequest } from "../types/Order";

const CART_KEY = "shopping_cart";

export const addToCart = (productId: string, quantity: number): void => {
  const currentCart = getCart();
  let found = false;

  currentCart.forEach((item) => {
    // Vi extraherar ID:t ifall item.productId råkar vara ett objekt
    const existingId =
      typeof item.productId === "object"
        ? (item.productId as any).productId
        : item.productId;

    if (existingId === productId) {
      item.quantity = quantity;
      item.productId = productId;
      found = true;
    }
  });

  if (!found) {
    // Här sparar vi BARA id och quantity, inga titta/pris/beskrivning
    currentCart.add({ productId, quantity });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(Array.from(currentCart)));
};

export const replaceCart = (newItems: Set<CartItemRequest>): void => {
  localStorage.setItem(CART_KEY, JSON.stringify(Array.from(newItems)));
};

export const getCart = (): Set<CartItemRequest> => {
  const data = localStorage.getItem(CART_KEY);
  return data ? new Set(JSON.parse(data)) : new Set();
};
