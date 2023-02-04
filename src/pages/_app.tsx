import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { type AppType } from "next/app";
import type { ReactElement, ReactNode } from "react";
import { MantineProvider } from "@mantine/core";

import { api } from "../utils/api";

import "../styles/globals.css";
import Head from "next/head";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp: AppType = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>Whiz Kids Baseball</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MantineProvider withGlobalStyles withNormalizeCSS>
        {getLayout(<Component {...pageProps} />)}
      </MantineProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
