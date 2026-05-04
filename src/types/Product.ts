export interface ProductDTO {
  productId: string;
  title: string;
  price: number;
  description: string;
  image: string;
}

export interface ProductSearchParams {
  q?: string;
  page?: number;
  size?: number;
  sort?: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
