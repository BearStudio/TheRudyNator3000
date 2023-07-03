import { NextResponse } from 'next/server';
import { ofetch } from 'ofetch';

import { apiMethod } from '@/app/api/jhipster-mocks/_helpers/api';

export const GET = apiMethod({
  public: true,
  handler: async () => {
    const links = await ofetch<
      Array<{
        id: string;
        title: string;
        slashtag: string;
        destination: string;
        createdAt: string;
        updatedAt: string;
        shortUrl: string;
        favourite: string;
        domain: {
          id: string;
          ref: string;
          fullName: string;
        };
      }>
    >('/links', {
      method: 'GET',
      baseURL: 'https://api.rebrandly.com/v1',
      headers: {
        apiKey: process.env.REBRANDLY_KEY,
        'Content-Type': 'application/json',
      },
    });

    const results = await Promise.all(
      links.map(
        async (link) =>
          await ofetch<{
            clicks: string;
            sessions: string;
          }>(`/links/${link.id}`, {
            method: 'GET',
            baseURL: 'https://api.rebrandly.com/v1',
            headers: {
              apiKey: process.env.REBRANDLY_KEY,
              'Content-Type': 'application/json',
            },
          })
      )
    );

    return NextResponse.json(
      results.reduce(
        (nbTotalClicks, currentLinkDetails) =>
          nbTotalClicks + Number(currentLinkDetails.clicks),
        0
      )
    );
  },
});
