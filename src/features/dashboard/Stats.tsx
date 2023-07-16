import {
  Flex,
  SkeletonText,
  Spinner,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { FiAlertTriangle } from 'react-icons/fi';

import { Icon } from '@/components/Icons';
import { useGetLinksClicks } from '@/features/dashboard/service';

export const Stats = () => {
  const getLinksClickQuery = useGetLinksClicks();
  return (
    <Stack>
      {getLinksClickQuery.isLoading && (
        <SkeletonText mb="4" noOfLines={1} w="200px">
          Nombre de spammeurs ayant cliqué les liens inclus:{' '}
        </SkeletonText>
      )}

      {!getLinksClickQuery.isLoading && (
        <Flex mb="4" alignItems="center">
          <Text>
            Nombre de spammeurs ayant cliqué les liens inclus:{' '}
            {getLinksClickQuery.data || '-'}
          </Text>
          {/* Si on refetch les données en arrière plan, on affiche un spinner */}
          {getLinksClickQuery.isFetching && <Spinner ml="2" size="xs" />}
          {/* Si une erreur survient on affiche un warning */}
          {!getLinksClickQuery.isFetching && getLinksClickQuery.isError && (
            <Tooltip
              hasArrow
              label="Une erreur est survenue lors de la récupération du nombre de clicks. Le quota de l'api Rebrandly a peut-être été atteint."
            >
              <Icon icon={FiAlertTriangle} color="red.500" ml="2" />
            </Tooltip>
          )}
        </Flex>
      )}
    </Stack>
  );
};
