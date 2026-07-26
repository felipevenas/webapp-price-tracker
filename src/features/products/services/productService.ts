import api from '../../../config/api';
import type { ApiResponse } from '../../auth/types/authTypes';
import type {
  ProductResponse,
  PriceHistoryResponse,
  CreateProductPayload,
  UpdateProductPayload,
} from '../types/productTypes';

export const productService = {
  async getProducts(skip = 0, limit = 100): Promise<ApiResponse<ProductResponse[]>> {
    const response = await api.get<ApiResponse<ProductResponse[]>>('/products/', {
      params: { skip, limit },
    });
    return response.data;
  },

  async createProduct(payload: CreateProductPayload): Promise<ApiResponse<ProductResponse>> {
    const response = await api.post<ApiResponse<ProductResponse>>('/products/', payload);
    return response.data;
  },

  async getProductDetails(productId: string): Promise<ApiResponse<ProductResponse>> {
    const response = await api.get<ApiResponse<ProductResponse>>(`/products/${productId}`);
    return response.data;
  },

  async updateProduct(
    productId: string,
    payload: UpdateProductPayload
  ): Promise<ApiResponse<ProductResponse>> {
    const response = await api.put<ApiResponse<ProductResponse>>(`/products/${productId}`, payload);
    return response.data;
  },

  async deleteProduct(productId: string): Promise<ApiResponse<null>> {
    const response = await api.delete<ApiResponse<null>>(`/products/${productId}`);
    return response.data;
  },

  async getPriceHistory(productId: string): Promise<ApiResponse<PriceHistoryResponse[]>> {
    const response = await api.get<ApiResponse<PriceHistoryResponse[]>>(`/products/${productId}/history`);
    return response.data;
  },
};
