import axios from 'axios';
import { Profile, User } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const userAPI = {
    getAll: (profileId?: string) =>
        api.get<User[]>('/users', { params: profileId ? { profileId } : {} }),
    getById: (id: string) => api.get<User>(`/users/${id}`),
    create: (data: Omit<User, 'id' | 'isActive'>) =>
        api.post<User>('/users', data),
    update: (data: User) =>
        api.put<User>(`/users`, data),
    toggleActive: (id: string) =>
        api.put<User>(`/users/${id}/toggle-active`),
    delete: (id: string) => api.delete(`/users/${id}`),
};

export const profileAPI = {
    getAll: () => api.get<Profile[]>('/profiles'),
    getById: (id: string) => api.get<Profile>(`/profiles/${id}`),
};
