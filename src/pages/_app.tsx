import { Container } from "styles/";
import type { AppProps } from "next/app";
import React from "react";
import { globalStyles } from "../styles/globalStyles";
import Header from "@components/Common/Header";

function App({ Component, pageProps }: AppProps) {
  globalStyles();
  return (
    <Container>
      <Header />
      <Component {...pageProps} />
    </Container>
  );
}

export default App;
