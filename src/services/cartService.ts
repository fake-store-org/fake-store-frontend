import type { CartItemRequest } from "../types/Order";
import type { ProductDTO } from "../types/Product";
import type { CartItem } from "../types/Order";

const CART_KEY = "shopping_cart";

export const addToCart = (product: ProductDTO, quantity: number): void => {
  const currentCart = getCart();

  const existingItemIndex = currentCart.findIndex(
    (item) => item.product.productId === product.productId,
  );

  if (existingItemIndex > -1) {
    currentCart[existingItemIndex].quantity = quantity;
  } else {
    currentCart.push({ product, quantity });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(currentCart));
};

export const replaceCart = (newItems: CartItem[]): void => {
  localStorage.setItem(CART_KEY, JSON.stringify(newItems));
};

export const getCart = (): CartItem[] => {
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
};

export const getCartForOrder = (): CartItemRequest[] => {
  return getCart().map((item) => ({
    productId: item.product.productId,
    quantity: item.quantity,
  }));
};
