import type { AddressRequest } from "./Auth";

export interface CartItemRequest {
  productId: string;
  quantity: number;
}

export interface OrderRequest {
  itemRequests: CartItemRequest[];
  addressRequest: AddressRequest;
}

export interface AvailabilityRequest {
  cartItemRequests: CartItemRequest[];
}

export interface AvailabilityResponse {
  updatedCart: CartItemRequest[];
  allAvailable: boolean;
}

export interface CheckoutResponse {
  stripeUrl: string;
  sessionId: string;
}
