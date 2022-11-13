import { Container } from "styles/";
import type { AppProps } from "next/app";
import React from "react";
import { globalStyles } from "../styles/globalStyles";
import { ThemeProvider } from "next-themes";
import { lightTheme } from "../../stitches.config";
import Header from "@components/Header";
import { DefaultSeo } from "next-seo";
import { defaultSEO } from "config/seo";
// @ts-ignore
import { Analytics } from "@vercel/analytics/react";

function App({ Component, pageProps }: AppProps) {
  globalStyles();
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      value={{
        light: lightTheme.className,
        dark: "dark",
      }}
    >
      <DefaultSeo {...defaultSEO} />
      <Container>
        <Header />
        <Component {...pageProps} />
        <Analytics />
      </Container>
    </ThemeProvider>
  );
}

export default App;
