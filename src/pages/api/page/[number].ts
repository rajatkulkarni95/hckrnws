import { NextApiRequest, NextApiResponse } from "next";

const fetchStoriesByPage = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { number } = req.query;
  const NEWS_BASE_URL = "https://api.hnpwa.com/v0/news";

  try {
    const result = await fetch(`${NEWS_BASE_URL}/${number}.json`);
    const response = await result.json();

    res.status(200).send({
      response,
    });
  } catch (err) {
    res.status(400).send({
      err,
    });
  }
};

export default fetchStoriesByPage;
