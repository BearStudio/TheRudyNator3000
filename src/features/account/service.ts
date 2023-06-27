import { createQueryKeys } from '@lukemorales/query-key-factory';
import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import Axios, { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

import { User, zUser } from '@/features/users/schema';
import { DEFAULT_LANGUAGE_KEY } from '@/lib/i18n/constants';

export const accountKeys = createQueryKeys('accountService', {
  account: null,
  accountForm: null,
});

type UseAccountQueryOptions = UseQueryOptions<User>;
export const useAccount = (queryOptions: UseAccountQueryOptions = {}) => {
  const { i18n } = useTranslation();
  const query = useQuery({
    queryKey: accountKeys.account.queryKey,
    queryFn: async () => {
      const response = await Axios.get('/account');
      const data = zUser().parse(response.data);
      await i18n.changeLanguage(data?.langKey);
      return data;
    },
    ...queryOptions,
  });
  const isAdmin = !!query.data?.authorities?.includes('ROLE_ADMIN');
  return { isAdmin, ...query };
};

export const useAccountFormQuery = (
  queryOptions: UseAccountQueryOptions = {}
) =>
  useAccount({
    queryKey: accountKeys.accountForm.queryKey,
    staleTime: Infinity,
    cacheTime: 0,
    ...queryOptions,
  });

export const useCreateAccount = (
  config: UseMutationOptions<
    void,
    AxiosError<
      ApiErrorResponse & {
        errorKey: 'userexists' | 'emailexists';
      }
    >,
    Pick<User, 'login' | 'email' | 'langKey'> & { password: string }
  > = {}
) => {
  return useMutation(async (payload) => {
    await Axios.post('/register', {
      ...payload,
      langKey: payload.langKey ?? DEFAULT_LANGUAGE_KEY,
    });
  }, config);
};

export const useActivateAccount = (
  config: UseMutationOptions<
    void,
    AxiosError<ApiErrorResponse>,
    {
      key: string;
    }
  > = {}
) => {
  return useMutation(async ({ key }) => {
    await Axios.get(`/activate?key=${key}`);
  }, config);
};

export const useUpdateAccount = (
  config: UseMutationOptions<void, AxiosError<ApiErrorResponse>, User> = {}
) => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(
    async (account) => {
      await Axios.post('/account', account);
    },
    {
      ...config,
      onMutate: async (data, ...args) => {
        await i18n.changeLanguage(data?.langKey);
        await config.onMutate?.(data, ...args);
      },
      onSuccess: async (...args) => {
        await queryClient.invalidateQueries(accountKeys.account);
        await config.onSuccess?.(...args);
      },
    }
  );
};

export const useResetPasswordInit = (
  config: UseMutationOptions<void, AxiosError<ApiErrorResponse>, string> = {}
) => {
  return useMutation(async (email) => {
    await Axios.post('/account/reset-password/init', email, {
      headers: { 'Content-Type': 'text/plain' },
    });
  }, config);
};

export const useResetPasswordFinish = (
  config: UseMutationOptions<
    void,
    AxiosError<ApiErrorResponse>,
    {
      key: string;
      newPassword: string;
    }
  > = {}
) => {
  return useMutation(async (payload) => {
    await Axios.post('/account/reset-password/finish', payload);
  }, config);
};

export const useUpdatePassword = (
  config: UseMutationOptions<
    void,
    AxiosError<ApiErrorResponse>,
    { currentPassword: string; newPassword: string }
  > = {}
) => {
  return useMutation(async (payload) => {
    await Axios.post('/account/change-password', payload);
  }, config);
};
