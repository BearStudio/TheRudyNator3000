import { z } from 'zod';

export type GetText = z.infer<ReturnType<typeof zGetText>>;
export const zGetText = () =>
  z.object({
    response: z.string(),
  });

export type GetTextOptions = z.infer<ReturnType<typeof zGetTextOptions>>;
export const zGetTextOptions = () =>
  z.object({
    context: z.string().nonempty(),
    subject: z.string().nonempty(),
  });
