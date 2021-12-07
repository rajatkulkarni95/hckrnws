// A simple fetch that'll be used in swr for data fetching

export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input);
  return res.json();
}
