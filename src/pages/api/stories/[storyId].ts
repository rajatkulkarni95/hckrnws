import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { storyId } = req.query;
  const ITEM_BASE_URL = "https://api.hnpwa.com/v0/item";

  try {
    const result = await fetch(`${ITEM_BASE_URL}/${storyId}.json`);
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
