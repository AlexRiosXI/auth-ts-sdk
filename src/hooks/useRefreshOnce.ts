import { useCallback } from 'react';
import { useMutation } from '@sierra-madre/core-ts-sdk';
import { refreshTokenMutation } from '../generics/mutations';
import { getInflightRefresh, setInflightRefresh } from '../helpers/refreshToken';

export function useRefreshOnce() {
  const { mutate } = useMutation(refreshTokenMutation);

  /**
   * Garantiza que **solo haya un refresh a la vez**.
   * Si otro ya está corriendo, regresa la MISMA promesa.
   */
  const refreshOnce = useCallback((): Promise<string | null> => {
    const existing = getInflightRefresh();
    if (existing) return existing;

    const p = mutate({
      onSuccess: (res: any) => {
        const token = res?.access_token ?? null;
        if (token) sessionStorage.setItem('sm-access-token', token);
        return token;
      },
      onError: () => {
        sessionStorage.removeItem('sm-access-token');
        return null;
      }
    })
      .then((res: any) => {
        const token = res?.data?.access_token ?? null;
        if (token) sessionStorage.setItem('sm-access-token', token);
        return token;
      })
      .catch(() => {
        sessionStorage.removeItem('sm-access-token');
        return null;
      })
      .finally(() => {
        setInflightRefresh(null);
      });

    setInflightRefresh(p);
    return p;
  }, [mutate]);

  return refreshOnce;
}
