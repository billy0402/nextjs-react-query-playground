import type { User } from '@/models/user';
import instance from '@/services/instance';

export function apiUserList() {
  return instance.get<User[]>('/users');
}
