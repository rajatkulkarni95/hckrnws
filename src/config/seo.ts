export const baseUrl =
  process.env.NODE_ENV === "production" ? "https://hckrnws.com/" : "";

export const defaultSEO = {
  title: "hckrnws",
  description: "hckrnws - A cleaner frontend for reading hackernews",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    site_name: "hckrnws",
    images: [
      {
        url: `${baseUrl}/img/og/default.png`,
        alt: "hckrnws",
      },
    ],
  },
  twitter: {
    handle: "@JokingRajat",
    site: "@JokingRajat",
    cardType: "summary_large_image",
  },
};

// interface SEOProps {
//   title?: string;
//   description?: string;
//   image?: string;
//   url?: string;
// }

// export function extendSEO(options: SEOProps) {
//   const images = options.image
//     ? [{ url: `${baseUrl}/static/${options.image}` }]
//     : defaultSEO.openGraph.images;

//   return {
//     ...defaultSEO,
//     ...options,
//     url: `${baseUrl}/${options.url}`,
//     openGraph: {
//       ...defaultSEO.openGraph,
//       images,
//       url: `${baseUrl}/${options.url}`,
//     },
//   };
// }
