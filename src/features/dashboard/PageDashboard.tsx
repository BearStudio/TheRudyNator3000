import React, { useState } from 'react';

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Heading,
  Text,
  Textarea,
  Wrap,
} from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { Trans, useTranslation } from 'react-i18next';

import { FieldTextarea } from '@/components/FieldTextarea';
import { Page, PageContent } from '@/components/Page';
import { useGetText } from '@/features/dashboard/service';

export default function PageDashboard() {
  const [message, setMessage] = useState<string>();
  const { t } = useTranslation(['dashboard']);

  const getTextMutation = useGetText({
    onSuccess(res) {
      setMessage(res.response);
    },
  });

  const form = useForm({
    id: 'get-text',
    onValidSubmit(values) {
      setMessage(undefined);
      getTextMutation.mutate({
        context: values.emailContext,
        subject: values.subjectContext,
      });
    },
    initialValues: {
      emailContext: `Bonjour Renan,

Comment allez-vous?

Je me permets de vous relancer car votre profil m'intéresse beaucoup.
J'aurai aimé échanger avec vous au sujet de votre parcours et sur ce qu'il nous serait possible de vous proposer.
Si cela vous intéresse, faites moi signe !

Belle journée !
Julie`,
      subjectContext: `Codeur en seine est une journée par la communauté pour la communauté;
c'est une journée de conférences gratuite qui se déroule à Rouen, pour découvrir, apprendre et partager autour du monde du développement.
'Codeurs en Seine vous propose une journée complète le jeudi 26 octobre sur des conférences aux thèmes divers et variés : Web, Devops, UX, Securité, Langages etc.
Codeurs en Seine est à la recherche de sponsors pour proposer un événement d'une qualité toujours meilleure.

Les partenaires des éditions précédentes ont confirmé la visibilité offerte par ce sponsoring, surtout dans le cadre d'une politique de recrutement.`,
    },
  });

  return (
    <Page>
      <PageContent>
        <Heading size="md" mb="4">
          {t('dashboard:title')}
        </Heading>
        <Alert mb="12" status="success" colorScheme="brand" borderRadius="md">
          <AlertIcon />
          <Box flex="1">
            <AlertTitle fontSize="lg">
              {t('dashboard:welcome.title')}
            </AlertTitle>
            <AlertDescription display="block">
              {t('dashboard:welcome.description')}
              <br />
              <Text as="a" href="https://www.bearstudio.fr">
                <Trans t={t} i18nKey="dashboard:welcome.author" />
              </Text>
            </AlertDescription>
          </Box>
        </Alert>

        <Formiz connect={form} autoForm>
          <FieldTextarea
            label="Email context"
            name="emailContext"
            required="Email context is required"
            mb="4"
          />
          <FieldTextarea
            label="Subject context"
            name="subjectContext"
            required="Subject context is required"
          />

          <Wrap mt="4" mb="12" spacing="4">
            <Button type="submit" isLoading={getTextMutation.isLoading}>
              Generate
            </Button>
          </Wrap>
        </Formiz>

        {message && <Textarea readOnly value={message} />}
      </PageContent>
    </Page>
  );
}
