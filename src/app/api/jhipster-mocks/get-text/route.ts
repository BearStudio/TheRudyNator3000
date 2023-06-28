import { param } from 'cypress/types/jquery';
import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';
import { z } from 'zod';

import {
  apiMethod,
  notSignedInResponse,
} from '@/app/api/jhipster-mocks/_helpers/api';
import { zGetTextOptions } from '@/features/dashboard/schema';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const POST = apiMethod({
  handler: async ({ req, user }) => {
    if (!user?.id) {
      return notSignedInResponse();
    }

    const params = zGetTextOptions().parse(await req.json());
    console.log({ params });

    const result = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Je vais t'envoyer, dans cet ordre: un email que j'ai reçu, et un sujet que je veux vanter`,
        },
        {
          role: 'user',
          content: params.context,
        },
        {
          role: 'user',
          content: params.subject,
        },
        {
          role: 'user',
          content: `Rédige un mail de réponse (en reprenant l'email reçu), en vantant les mérites du sujet`,
        },
      ],
    });

    // const bodyParsed = z
    //   .object({
    //     email: z.string().email(),
    //     firstName: z.string().nullable(),
    //     lastName: z.string().nullable(),
    //     langKey: z.string(),
    //   })
    //   .safeParse(await req.json());

    // if (!bodyParsed.success) {
    //   return badRequestResponse({ details: bodyParsed.error });
    // }

    return NextResponse.json({
      response: result.data.choices[0]?.message?.content,
    });
    // return NextResponse.json({ ok: 'ok' });
  },
});
