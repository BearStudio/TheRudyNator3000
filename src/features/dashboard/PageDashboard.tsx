import React, { useEffect, useState } from 'react';

import {
  Box,
  Button,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  useClipboard,
} from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { motion } from 'framer-motion';
import { FiInfo } from 'react-icons/fi';
import useSound from 'use-sound';

import { FieldSelect } from '@/components/FieldSelect';
import { FieldTextarea } from '@/components/FieldTextarea';
import { Icon } from '@/components/Icons';
import { Page, PageContent } from '@/components/Page';
import { AdvancedSettings } from '@/features/dashboard/AdvancedSettings';
import { Header } from '@/features/dashboard/Header';
import { Stats } from '@/features/dashboard/Stats';
import { Subject, subjects } from '@/features/dashboard/data';
import { voice } from '@/features/dashboard/schema';
import { useAskAI } from '@/features/dashboard/service';

export default function PageDashboard() {
  const clipboard = useClipboard('');
  const [playWaitingMusic, { stop: stopWaitingMusic }] = useSound('/wait.mp3');
  const [playDingSFX] = useSound('/ding.mp3');

  const getTextMutation = useAskAI({
    onSuccess(res) {
      // TODO: ajout toast texte copié avec succès
      clipboard.setValue(res.response);
    },
  });

  const form = useForm({
    id: 'get-text',
    onValidSubmit(values: TODO) {
      playWaitingMusic();

      clipboard.setValue('');

      getTextMutation
        .mutateAsync({
          ...values,
          context: values.emailContext,
          subject: subjects?.find(
            (subject) => subject.label === values.subjectContext
          ) as Subject,
        })
        .finally(() => {
          stopWaitingMusic();
          playDingSFX();
        });
    },
    initialValues: {
      emailContext: `Bonjour Monsieur Baer,
Le CIR 2022 est terminé mais nous nous mobilisons dès aujourd'hui avec nos clients pour le CIR 2023.
Bearstudio est peut-être confrontée en ce moment même à un contrôle du CIR. Si le sujet n'a pas été piloté de manière continue avec un référent interne ou un partenaire leader sur le sujet, vos équipes et vous-mêmes doivent se mobiliser dans l'urgence pour limiter le risque.
Notre expérience depuis 2006 nous confirme que la sécurisation et l'optimisation du CIR est le fruit d'une démarche continue et non pas l'affaire de quelques jours dans l'année.
Je souhaitais vous partager en quelques slides notre approche qui fait notre succès auprès des entreprises de croissance (Mirakl, Qonto, Opinel, Nanobiotix,...) :
Les types de sollicitations fiscales
Les indispensables du dossier CIR à préparer
Les étapes clés d'une mission CIR performante et anticipée
Voir le document : préparer son CIR 2023
Bonne lecture,
Bonne journée,`,
      subjectContext: subjects[0]?.label,
      subjectRules: subjects[0]?.description,
      settings: {
        model: 'gpt-3.5-turbo',
        voice: voice[0],
      },
    },
  });

  return (
    <Page containerSize="xl">
      <Header />
      <PageContent>
        <Stats />

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 0, md: 8 }}>
          <motion.div>
            <Formiz connect={form} autoForm>
              <AdvancedSettings />

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
                    subjectRules: subjects.find(
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
                name="subjectRules"
                required="Vous devez fournir des règles au modèle"
                mb="4"
              />

              <Button
                w="full"
                type="submit"
                colorScheme="brand"
                size="lg"
                isLoading={getTextMutation.isLoading}
              >
                Générer une réponse
              </Button>
            </Formiz>
          </motion.div>

          <Box position="relative" mt={12}>
            <Textarea
              position="absolute"
              readOnly
              value={clipboard.value}
              minHeight="72"
              placeholder="Le message généré apparaîtra ici"
            />
            <Button
              position="absolute"
              top="2"
              right="2"
              size="sm"
              variant="ghost"
              onClick={clipboard.onCopy}
              isDisabled={clipboard.hasCopied}
            >
              {clipboard.hasCopied ? 'Copié !' : 'Copier'}
            </Button>
          </Box>
        </SimpleGrid>
      </PageContent>
    </Page>
  );
}
