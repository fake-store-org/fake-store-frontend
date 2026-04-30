import type { AddressRequest } from "./Auth";

export interface CartItemRequest {
  productId: string;
  quantity: number;
}

export interface OrderRequest {
  itemRequests: Set<CartItemRequest>;
  address: AddressRequest;
}
