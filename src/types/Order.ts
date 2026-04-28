import type { AddressRequest } from "./Auth";

export interface OrderItemRequest {
  productId: string;
  quantity: number;
}

export interface OrderRequest {
  orderItemRequests: Set<OrderItemRequest>;
  address: AddressRequest;
}
