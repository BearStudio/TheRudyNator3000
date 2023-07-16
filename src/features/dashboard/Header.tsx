import { Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';

import { PageContainer } from '@/components/Page';

export const Header = () => {
  return (
    <Flex bg="white" shadow="md">
      <PageContainer>
        <Flex my="4" alignItems="center">
          <Image
            src="/thumbnail.png"
            maxH="12"
            objectFit="contain"
            alt="TheRudyNator3000, image d'illustration. C'est un homme en colère qui tient une lettre."
          />
          <Stack ml="4" spacing="1">
            <Heading size="md">TheRudyNator3000</Heading>
            <Text fontSize="sm" color="blackAlpha.700">
              Une IA pour les gouverner toutes
            </Text>
          </Stack>
        </Flex>
      </PageContainer>
    </Flex>
  );
};
