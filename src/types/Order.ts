import type { AddressRequest } from "./Auth";
import type { ProductDTO } from "./Product";

export interface CartItem {
  product: ProductDTO;
  quantity: number;
}

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
