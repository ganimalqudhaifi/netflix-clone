import { NextApiRequest, NextApiResponse } from "next";
import { getMetadataByToken } from "@/lib/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(500).send({ token: null });
  }

  try {
    const metadata = await getMetadataByToken(token);
    res.status(200).send({ metadata });
  } catch (error) {
    console.error("Error occurred while fetch data");
  }
}
