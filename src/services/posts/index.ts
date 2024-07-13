import type { EditPost, Post } from '@/models/post';
import instance from '@/services/instance';

export function apiPostList() {
  return instance.get<Post[]>('/posts');
}

export function apiPostRetrieve(id: number) {
  return instance.get<Post>(`/posts/${id}`);
}

export function apiPostCreate(data: EditPost) {
  return instance.post<Post>('/posts', data);
}

export function apiPostUpdate(id: number, data: EditPost) {
  return instance.put<Post>(`/posts/${id}`, data);
}

export function apiPostPartUpdate(id: number, data: Partial<EditPost>) {
  return instance.patch<Partial<Post>, Post>(`/posts/${id}`, data);
}

export function apiPostDestroy(id: number) {
  return instance.delete(`/posts/${id}`);
}
