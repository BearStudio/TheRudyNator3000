import { createMutationKeys } from '@lukemorales/query-key-factory';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import axios from 'axios';

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
      const response = await axios.post(GET_TEXT_BASE_URL, params);
      return zGetText().parse(response.data);
    },
    ...options,
  });

  const response = getTextMutation.data?.response;

  return {
    response,
    ...getTextMutation,
  };
};
