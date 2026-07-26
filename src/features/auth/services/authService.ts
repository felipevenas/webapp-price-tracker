import api from '../../../config/api';
import type { ApiResponse, LoginResponse, User } from '../types/authTypes';

export const authService = {
  async register(email: string, full_name: string, password: string): Promise<ApiResponse<User>> {
    const response = await api.post<ApiResponse<User>>('/auth/register', {
      email,
      full_name,
      password,
    });
    return response.data;
  },

  async login(email: string, password: string): Promise<LoginResponse> {
    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password);

    const response = await api.post<LoginResponse>('/auth/login', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  },

  async getMe(): Promise<ApiResponse<User>> {
    const response = await api.get<ApiResponse<User>>('/users/me');
    return response.data;
  },
};
