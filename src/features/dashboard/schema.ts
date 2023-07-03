import { z } from 'zod';

import { zSubject } from '@/features/dashboard/data';

export type GetText = z.infer<ReturnType<typeof zGetText>>;
export const zGetText = () =>
  z.object({
    response: z.string(),
  });

export const voice = ['naturel', 'déprimé', 'enjoué', 'sec'] as const;
export type Voice = z.infer<ReturnType<typeof zVoice>>;
export const zVoice = () => z.enum(voice);

export type GetTextOptions = z.infer<ReturnType<typeof zGetTextOptions>>;
export const zGetTextOptions = () =>
  z.object({
    context: z.string().nonempty(),
    subject: zSubject(),
    voice: zVoice().optional(),
  });
