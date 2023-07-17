import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

import { apiMethod } from '@/app/api/jhipster-mocks/_helpers/api';

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
