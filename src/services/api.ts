import type {
  LoginRequest,
  LoginResponse,
  RegisterUserRequest,
  RefreshResponse,
  AddressResponse,
  AddressRequest,
} from "../types/Auth";
import type {
  AvailabilityRequest,
  AvailabilityResponse,
  CheckoutResponse,
  OrderRequest,
} from "../types/Order";

import type {
  ProductDTO,
  ProductSearchParams,
  PageResponse,
} from "../types/Product";

import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const publicAPI = axios.create({
  baseURL: BASE_URL,
});

export const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (error: unknown) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve();
  });
  failedQueue = [];
};

API.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => API(originalRequest));
      }

      isRefreshing = true;

      try {
        const res = await publicAPI.post<RefreshResponse>(
          "/auth/refresh",
          {},
          { withCredentials: true },
        );

        const newToken = res.data.accessToken;

        localStorage.setItem("accessToken", newToken);

        processQueue(null);

        return API(originalRequest);
      } catch (err: unknown) {
        processQueue(err);

        localStorage.removeItem("accessToken");
        window.dispatchEvent(new Event("auth:logout"));

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await publicAPI.post("/auth/login", data);

  localStorage.setItem("accessToken", res.data.accessToken);

  return res.data;
};

export const register = async (
  data: RegisterUserRequest,
): Promise<LoginResponse> => {
  const res = await publicAPI.post("/auth/register", data);
  localStorage.setItem("accessToken", res.data.accessToken);

  return res.data;
};

export const refresh = async (): Promise<RefreshResponse> => {
  const res = await publicAPI.post("/auth/refresh");
  return res.data;
};

export const logout = async (): Promise<void> => {
  await API.post("/auth/logout");
  localStorage.removeItem("accessToken");
};

export const updateUserAddress = async (
  data: AddressRequest,
): Promise<AddressResponse> => {
  const res = await API.put("/users/address", data);
  return res.data;
};

export const getAllProducts = async (
  data: ProductSearchParams,
): Promise<PageResponse<ProductDTO>> => {
  const res = await publicAPI.get("/products", { params: data });
  return res.data;
};

export const getProductById = async (id: string): Promise<ProductDTO> => {
  const res = await publicAPI.get(`/products/${id}`);
  return res.data;
};

export const checkStock = async (
  data: AvailabilityRequest,
): Promise<AvailabilityResponse> => {
  const res = await publicAPI.post("/inventory/check-stock", data);
  return res.data;
};

export const placeOrder = async (
  data: OrderRequest,
): Promise<CheckoutResponse> => {
  const res = await API.post("/orders/order", data);
  return res.data;
};
