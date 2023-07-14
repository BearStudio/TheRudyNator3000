'use client';

import { ReactNode } from 'react';

import { ColorModeScript } from '@chakra-ui/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Providers } from '@/app/Providers';
import { Viewport } from '@/components/Viewport';
import { DemoModalInterceptor } from '@/features/demo-mode/DemoModalInterceptor';
import { EnvDevHint } from '@/layout/EnvDevHint';
import i18n from '@/lib/i18n/config';
import { AVAILABLE_LANGUAGES } from '@/lib/i18n/constants';
import theme, { COLOR_MODE_STORAGE_KEY } from '@/theme';

export const Document = ({ children }: { children: ReactNode }) => {
  return (
    <html
      lang={i18n.language}
      dir={
        AVAILABLE_LANGUAGES.find(({ key }) => key === i18n.language)?.dir ??
        'ltr'
      }
    >
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="apple-mobile-web-app-title" content="TheRudyNator3000" />
        <meta name="application-name" content="TheRudyNator3000" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
        <title>TheRudyNator3000</title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,viewport-fit=cover"
        />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>
      </head>
      <body>
        {/* https://github.com/chakra-ui/chakra-ui/issues/7040 */}
        <ColorModeScript
          initialColorMode={theme.config.initialColorMode}
          storageKey={COLOR_MODE_STORAGE_KEY}
        />

        <Providers>
          <Viewport>{children}</Viewport>
          <EnvDevHint />
          <DemoModalInterceptor />
          <ReactQueryDevtools initialIsOpen={false} />
        </Providers>
      </body>
    </html>
  );
};
