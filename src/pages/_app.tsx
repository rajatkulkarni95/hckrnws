import { Container } from "styles/";
import type { AppProps } from "next/app";
import React from "react";
import { globalStyles } from "../styles/globalStyles";
import { ThemeProvider } from "next-themes";
import { lightTheme } from "../../stitches.config";
import Header from "@components/Header";

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
      <Container>
        <Header />
        <Component {...pageProps} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
