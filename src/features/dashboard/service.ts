import { createMutationKeys } from '@lukemorales/query-key-factory';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { GetText, GetTextOptions, zGetText } from '@/features/dashboard/schema';

const GET_TEXT_BASE_URL = '/get-text';

const getTextMutationKeys = createMutationKeys('getTextService', {
  getText: null,
});

export const useGetText = (
  options: UseMutationOptions<GetText, unknown, GetTextOptions> = {}
) => {
  const getTextMutation = useMutation({
    mutationKey: getTextMutationKeys.getText.mutationKey,
    mutationFn: async (params: GetTextOptions) => {
      const response = await fetch(`/api/jhipster-mocks${GET_TEXT_BASE_URL}`, {
        method: 'POST',
        body: JSON.stringify(params),
      }).then((response) => response.json());
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
