import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { ThemeProvider } from "next-themes";
import Header from "~/components/Header";
import { DefaultSeo } from "next-seo";
import { defaultSEO } from "~/config/seo";
// @ts-ignore
import { Analytics } from "@vercel/analytics/react";
import { CraftedBy } from "~/components/Common/Fragments";

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <DefaultSeo {...defaultSEO} />
      <main className="mx-auto p-4 w-full md:w-5/6 overflow-x-hidden xl:w-[900px] ">
        <Header />
        <Component {...pageProps} />
        <CraftedBy />
        <Analytics />
      </main>
    </ThemeProvider>
  );
}

export default App;
