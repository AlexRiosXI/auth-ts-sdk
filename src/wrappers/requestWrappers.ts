import { useRefreshOnce } from '../hooks/useRefreshOnce';
import { useMutation, useRequest } from '@sierra-madre/core-ts-sdk';
import type { Request, MutationRequest } from '@sierra-madre/core-ts-sdk';

export const useAuthedRequest = <T>(req: Request) => {
  const refreshOnce = useRefreshOnce();
  const core = useRequest<T>(req);

  const query = async () => {
    let res = await core.query();
    if (res.status !== 401) return res;

    // Intentar refresh
    const newToken = await refreshOnce();
    if (!newToken) {
      // Si no se pudo refrescar, devolvemos el 401 original
      return res;
    }

    // Volver a ejecutar la query con el nuevo token
    res = await core.query();
    return res;
  };

  return { ...core, query };
};

export const useAuthedMutation = (mutation: MutationRequest) => {
  const refreshOnce = useRefreshOnce();

  const core = useMutation(mutation);

  const mutate = async (data: any) => {
    const res = await core.mutate(data);
    if (res.status !== 401) return res;

    await refreshOnce();
    return res;
  };

  return { ...core, mutate };
};