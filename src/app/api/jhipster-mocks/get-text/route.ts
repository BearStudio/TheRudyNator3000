import { NextResponse } from 'next/server';
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';

import {
  apiMethod,
  badRequestResponse,
} from '@/app/api/jhipster-mocks/_helpers/api';
import { rules } from '@/app/api/jhipster-mocks/get-text/rules';
import { zGetTextOptions } from '@/features/dashboard/schema';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const POST = apiMethod({
  public: true,
  handler: async ({ req }) => {
    const bodyParsed = zGetTextOptions().safeParse(await req.json());

    if (!bodyParsed.success) {
      return badRequestResponse({ details: bodyParsed.error });
    }

    const { data } = bodyParsed;

    const messages: Array<ChatCompletionRequestMessage> = [
      {
        role: 'user',
        content: `En te basant sur ce contexte que j'ai reçu par mail d'un inconnu, fait moi une réponse en français qui fait la promotion de ${data.subject.label}. Voici le contexte du mail de l'inconnu: ${data.context}. Voici quelques infos sur ${data.subject.label} : ${data.subjectRules}`,
      },
      {
        role: 'system',
        content: `La réponse doit respecter les règles suivantes: ${rules(
          data.subject,
          data.settings.voice
        )}`,
      },
    ];

    console.log(messages);

    try {
      const result = await openai.createChatCompletion({
        model: data.settings.model,
        messages,
      });
      return NextResponse.json({
        response: result.data.choices[0]?.message?.content,
      });
    } catch (error) {
      return NextResponse.json(
        {
          response: {
            error: {
              message: 'Something goes wrong with openai api',
              error,
            },
          },
        },
        {
          status: 500,
        }
      );
    }
  },
});
