import React, { useState } from 'react';

import {
  Button,
  Heading,
  SimpleGrid,
  Textarea,
  useClipboard,
} from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { capitalize } from 'lodash';
import { useTranslation } from 'react-i18next';

import { FieldSelect } from '@/components/FieldSelect';
import { FieldTextarea } from '@/components/FieldTextarea';
import { Page, PageContent } from '@/components/Page';
import { subjects } from '@/features/dashboard/data';
import { voice } from '@/features/dashboard/schema';
import { useGetText } from '@/features/dashboard/service';

export default function PageDashboard() {
  const [message, setMessage] = useState<string>();
  const { t } = useTranslation(['dashboard']);
  const clipboard = useClipboard('');

  const getTextMutation = useGetText({
    onSuccess(res) {
      // TODO: ajout toast texte copié avec succès
      clipboard.setValue(res.response);
      setMessage(res.response);
    },
  });

  const form = useForm({
    id: 'get-text',
    onValidSubmit(values) {
      setMessage('');
      getTextMutation.mutate({
        context: values.emailContext,
        subject:
          subjects.find((subject) => subject.label === values.subjectContext) ??
          subjects[0],
        voice: values.voice,
      });
    },
    initialValues: {
      emailContext: `Bonjour Renan,

Comment allez-vous?

Je me permets de vous relancer car votre profil m'intéresse beaucoup.
J'aurai aimé échanger avec vous au sujet de votre parcours et sur ce qu'il nous serait possible de vous proposer.
Si cela vous intéresse, faites moi signe !

Belle journée !
Astrid`,
      subjectContext: subjects[0]?.label,
      voice: voice[0],
    },
  });

  return (
    <Page>
      <PageContent>
        <Heading size="md" mb="4">
          {t('dashboard:title')}
        </Heading>

        <SimpleGrid columns={2} gap={4}>
          <Formiz connect={form} autoForm>
            <FieldTextarea
              textareaProps={{ minH: '52' }}
              label="Email context"
              name="emailContext"
              required="Email context is required"
              mb="4"
            />

            <FieldSelect
              mb="4"
              label="Subject context"
              name="subjectContext"
              required="Subject context is required"
              options={subjects.map((subject) => ({
                label: subject.label,
                value: subject.label,
              }))}
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
