import { useQuery } from '@tanstack/react-query';

import { ApiModule } from '@/enums/api-module';
import { apiUserList } from '@/services/users';

const moduleName = ApiModule.POSTS;
const queryKeys = {
  list: () => [moduleName, 'list'] as const,
  retrieve: (id: number) => [moduleName, 'retrieve', id] as const,
};

export const useUserList = () => {
  return useQuery({
    queryKey: queryKeys.list(),
    queryFn: () => apiUserList(),
  });
};
