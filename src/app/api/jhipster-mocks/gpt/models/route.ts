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

export const GET = apiMethod({
  public: true,
  handler: async () => {
    const result = await openai.listModels();

    return NextResponse.json({
      response: result.data.data,
    });
  },
});
