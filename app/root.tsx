import {
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import stylesheet from "./styles/app.css?url";
import Header from "./components/Header";
import { CraftedBy } from "./components/Common/Fragments";
import { ThemeProvider } from "./lib/theme";
import { StarredProvider } from "./lib/starred";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>hckrnws</title>
        <meta name="description" content="hckrnws - A cleaner frontend for reading hackernews" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content="https://hckrnws.com/" />
        <meta property="og:site_name" content="hckrnws" />
        <meta property="og:image" content="https://hckrnws.com/img/og/default.png" />
        <meta property="og:image:alt" content="hckrnws" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@JokingRajat" />
        <meta name="twitter:creator" content="@JokingRajat" />
        <meta name="theme-color" content="#18181b" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#fafafa" media="(prefers-color-scheme: light)" />
        <link rel="stylesheet" href={stylesheet} />
        <link rel="shortcut icon" href="/img/favicon.ico" />
        <link rel="manifest" href="/img/meta/site.webmanifest" />
        <link rel="apple-touch-icon" sizes="180x180" href="/img/meta/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/img/meta/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/img/meta/favicon-16x16.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}`,
          }}
        />
      </head>
      <body className="antialiased bg-bg-primary">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <StarredProvider>
        <main className="mx-auto flex flex-col min-h-screen p-4 bg-bg-primary w-full md:w-5/6 overflow-x-hidden xl:w-[900px]">
          <h1 className="hidden">hckrnws</h1>
          <Header />
          <Outlet />
          <CraftedBy />
        </main>
      </StarredProvider>
    </ThemeProvider>
  );
}
