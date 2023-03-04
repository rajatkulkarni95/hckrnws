import React from "react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="/fonts/ibm-plex-sans-var.woff2"
            as="font"
            type="font/woff2"
            rel="preload"
            crossOrigin="anonymous"
          />
          <link
            href="/fonts/IBMPlexMono-Text.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </Head>
        <body className="h-screen block mx-auto font-sans scroll-smooth bg-zinc-900 text-slate-50 font-normal">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
