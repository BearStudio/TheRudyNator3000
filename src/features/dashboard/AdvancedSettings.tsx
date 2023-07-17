import {
  Box,
  Collapse,
  FormControl,
  FormLabel,
  Stack,
  Switch,
  useDisclosure,
} from '@chakra-ui/react';
import { capitalize } from 'lodash';

import { FieldSelect } from '@/components/FieldSelect';
import { voice } from '@/features/dashboard/schema';
import { useGetGptModels } from '@/features/dashboard/service';

export const AdvancedSettings = () => {
  const modelsQuery = useGetGptModels();
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box mb="4">
      <FormControl display="flex" alignItems="center" mb="2">
        <FormLabel htmlFor="showAdvancedSettings" mb="0">
          Afficher les paramètres avancés
        </FormLabel>
        <Switch id="showAdvancedSettings" onChange={onToggle} />
      </FormControl>
      <Collapse in={isOpen} animateOpacity>
        <Stack
          bg="white"
          pt="2"
          px="4"
          rounded="md"
          borderColor="blackAlpha.100"
          borderWidth="1px"
        >
          <FieldSelect
            name="settings.model"
            label="Modèle à utiliser"
            options={modelsQuery.data?.response.map(
              (model: { id: string }) => ({
                label: model.id,
                value: model.id,
              })
            )}
            selectProps={{
              isLoading: modelsQuery.isFetching,
            }}
            isDisabled={modelsQuery.isError || modelsQuery.isLoading}
          />

          <FieldSelect
            mb="4"
            label="Ton à employer pour la réponse"
            name="settings.voice"
            options={voice.map((voiceId) => ({
              label: capitalize(voiceId),
              value: voiceId,
            }))}
          />
        </Stack>
      </Collapse>
    </Box>
  );
};
