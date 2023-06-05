import "../styles/globals.css";
import { api } from "../utils/api";
import { ClerkProvider } from "@clerk/nextjs";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { type AppType } from "next/app";
import Head from "next/head";
import type { ReactElement, ReactNode } from "react";

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
      <ClerkProvider {...pageProps}>{getLayout(<Component {...pageProps} />)}</ClerkProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
