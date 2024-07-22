import { useMutation, useQuery } from '@tanstack/react-query';

import { ApiModule } from '@/enums/api-module';
import { queryClient } from '@/helpers/query-client';
import type { Post } from '@/models/post';
import {
  apiPostCreate,
  apiPostDestroy,
  apiPostList,
  apiPostPartUpdate,
  apiPostRetrieve,
  apiPostUpdate,
} from '@/services/posts';

const moduleName = ApiModule.POSTS;
const queryKeys = {
  list: () => [moduleName, 'list'] as const,
  retrieve: (id: number) => [moduleName, 'retrieve', id] as const,
};

export const usePostList = () => {
  return useQuery({
    queryKey: queryKeys.list(),
    queryFn: () => apiPostList(),
  });
};

export const usePostRetrieve = (id: number) => {
  return useQuery({
    queryKey: queryKeys.retrieve(id),
    queryFn: () => apiPostRetrieve(Number(id)),
    enabled: !!id,
  });
};

export const usePostCreate = () => {
  return useMutation({
    mutationFn: (data: Post) => apiPostCreate(data),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.retrieve(data.id), data);
    },
  });
};

export const usePostUpdate = (id: number) => {
  return useMutation({
    mutationFn: (data: Post) => apiPostUpdate(id, data),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.retrieve(id), data);
    },
  });
};

export const usePostPartUpdate = (id: number) => {
  return useMutation({
    mutationFn: (data: Partial<Post>) => apiPostPartUpdate(id, data),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.retrieve(id), data);
    },
  });
};

export const usePostDestroy = (onSuccess: Function) => {
  return useMutation({
    mutationFn: (id: number) => apiPostDestroy(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.list() });
      onSuccess();
    },
  });
};
