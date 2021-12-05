import type { AppProps } from "next/app";
import React from "react";
import { globalStyles } from "../styles/globalStyles";

function App({ Component, pageProps }: AppProps) {
  globalStyles();
  return <Component {...pageProps} />;
}

export default App;
