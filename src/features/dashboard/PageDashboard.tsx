import React, { useState } from 'react';

import {
  Button,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  SkeletonText,
  Spinner,
  Stack,
  Text,
  Textarea,
  Tooltip,
  useClipboard,
} from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { motion } from 'framer-motion';
import { capitalize } from 'lodash';
import { FiAlertTriangle } from 'react-icons/fi';
import useSound from 'use-sound';

import { FieldSelect } from '@/components/FieldSelect';
import { FieldTextarea } from '@/components/FieldTextarea';
import { Icon } from '@/components/Icons';
import { Page, PageContainer, PageContent } from '@/components/Page';
import { Subject, subjects } from '@/features/dashboard/data';
import { voice } from '@/features/dashboard/schema';
import { useGetLinksClicks, useGetText } from '@/features/dashboard/service';

export default function PageDashboard() {
  const [message, setResponse] = useState<string>();
  const clipboard = useClipboard('');
  const [playWaitingMusic, { stop: stopWaitingMusic }] = useSound('/wait.mp3');
  const [playDingSFX] = useSound('/ding.mp3');

  const getTextMutation = useGetText({
    onSuccess(res) {
      // TODO: ajout toast texte copié avec succès
      clipboard.setValue(res.response);
      setResponse(res.response);
    },
  });

  const getLinksClickQuery = useGetLinksClicks();

  const form = useForm({
    id: 'get-text',
    onValidSubmit(values) {
      playWaitingMusic();

      setResponse('');

      getTextMutation
        .mutateAsync({
          context: values.emailContext,
          subject: subjects?.find(
            (subject) => subject.label === values.subjectContext
          ) as Subject,
          voice: values.voice,
        })
        .then(() => {
          stopWaitingMusic();
          playDingSFX();
        });
    },
    initialValues: {
      emailContext: ``,
      subjectContext: subjects[0]?.label,
      subjectDescription: subjects[0]?.description,
      voice: voice[0],
    },
  });

  return (
    <Page>
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
      <PageContent>
        {getLinksClickQuery.isLoading && (
          <SkeletonText mb="4" noOfLines={1}>
            Nombre de spammeurs ayant cliqué les liens inclus:{' '}
          </SkeletonText>
        )}

        {!getLinksClickQuery.isLoading && (
          <Text mb="4">
            Nombre de spammeurs ayant cliqué les liens inclus:{' '}
            {getLinksClickQuery.data || '-'}
            {/* Si on refetch les données en arrière plan, on affiche un spinner */}
            {getLinksClickQuery.isFetching && <Spinner ml="2" size="xs" />}
            {/* Si une erreur survient on affiche un warning */}
            {!getLinksClickQuery.isFetching && getLinksClickQuery.isError && (
              <Tooltip
                hasArrow
                label="Une erreur est survenue lors de la récupération du nombre de clicks. Le quota a peut-être été atteint."
              >
                <Icon icon={FiAlertTriangle} color="red.500" ml="2" />
              </Tooltip>
            )}
          </Text>
        )}

        <SimpleGrid columns={1}>
          <motion.div>
            <Formiz connect={form} autoForm>
              <FieldTextarea
                textareaProps={{ minH: '52' }}
                label="Contenu du spammeur"
                name="emailContext"
                required="Le contenu du spammeur est requis"
                mb="4"
              />

              <FieldSelect
                mb="4"
                label="Sujet à promouvoir"
                name="subjectContext"
                required="Le sujet à promouvoir est requis"
                onValueChange={(newValue) => {
                  form.setValues({
                    subjectDescription: subjects.find(
                      (subject) => subject.label === newValue
                    )?.description,
                  });
                }}
                options={subjects.map((subject) => ({
                  label: subject.label,
                  value: subject.label,
                }))}
              />

              <FieldTextarea
                textareaProps={{ minH: '52' }}
                label="Règles"
                name="subjectDescription"
                required="LEs règlers sont requises"
                mb="4"
              />

              <FieldSelect
                mb="4"
                label="Ton à employer pour la réponse"
                name="voice"
                options={voice.map((voiceId) => ({
                  label: capitalize(voiceId),
                  value: voiceId,
                }))}
              />

              <Button
                w="full"
                type="submit"
                isLoading={getTextMutation.isLoading}
              >
                Générer une réponse
              </Button>
            </Formiz>
          </motion.div>

          <Textarea
            mt={8}
            readOnly
            value={message}
            minHeight="72"
            placeholder="Le message généré apparaîtra ici"
          />
        </SimpleGrid>
      </PageContent>
    </Page>
  );
}
