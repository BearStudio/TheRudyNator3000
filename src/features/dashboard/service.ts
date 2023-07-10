import {
  createMutationKeys,
  createQueryKeys,
} from '@lukemorales/query-key-factory';
import {
  UseMutationOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { ofetch } from 'ofetch';

import { GetText, GetTextOptions, zGetText } from '@/features/dashboard/schema';

const GET_TEXT_BASE_URL = '/get-text';
const GET_LINKS_CLICK_BASE_URL = '/clicks';

const getTextMutationKeys = createMutationKeys('getTextService', {
  getText: null,
  getLinksClicks: null,
});

const getLinksClickService = createQueryKeys('getLinksClickService', {
  getLinksClicks: null,
});

export const useGetText = (
  options: UseMutationOptions<GetText, unknown, GetTextOptions> = {}
) => {
  const getTextMutation = useMutation({
    mutationKey: getTextMutationKeys.getText.mutationKey,
    mutationFn: async (body: GetTextOptions) => {
      const response = await ofetch(`/api/jhipster-mocks${GET_TEXT_BASE_URL}`, {
        method: 'POST',
        body,
      });

      return zGetText().parse(response);
    },
    ...options,
  });

  const response = getTextMutation.data?.response;

  return {
    response,
    ...getTextMutation,
  };
};

export const useGetLinksClicks = () => {
  return useQuery({
    queryKey: getLinksClickService.getLinksClicks.queryKey,
    queryFn: async () => {
      return await ofetch(`/api/jhipster-mocks${GET_LINKS_CLICK_BASE_URL}`, {
        method: 'GET',
        params: {
          linkId: 'ea3a39a2bebe4add98f6b97a307a4844',
        },
        retry: 0,
      });
    },
  });
};
