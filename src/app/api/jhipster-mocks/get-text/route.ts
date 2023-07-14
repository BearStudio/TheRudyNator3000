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
      // {
      //   role: 'user',
      //   content: `En te basant sur ce contexte que j'ai reçu par mail d'un inconnu, fait moi une réponse en français qui fait la promotion de codeurs en seine en incitant cette entreprise à sponsoriser l'évènement codeurs en seine. Voici le contexte du mail de l'inconnu: ''. Voici quelques infos sur codeurs en seine`,
      // },
      {
        role: 'user',
        content: `Je vais t'envoyer, dans cet ordre: un message promotionel, de recrutement, marketing que j'ai reçu, et un sujet pour lequel j'ai un intérêt particulier que je veux vendre.`,
      },
      {
        role: 'user',
        content: data.context,
      },
      {
        role: 'user',
        content: data.subject.description,
      },
      {
        role: 'user',
        content: `Rédige un mail de réponse (en reprenant l'email reçu), en vantant les mérites du sujet. La réponse doit respecter les règles suivantes: ${rules(
          data.subject,
          data.voice
        )}`,
      },
    ];

    console.log(messages);

    const result = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages,
    });

    return NextResponse.json({
      response: result.data.choices[0]?.message?.content,
    });
  },
});
