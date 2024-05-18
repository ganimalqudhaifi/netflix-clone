import type { NextApiRequest, NextApiResponse } from "next";

import { verifyToken } from "@/lib/utils";
import { findVideoIdByUser, insertStats, updateStats } from "@/lib/db/hasura";

export default async function stats(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.token;
  try {
    if (!token) {
      res.status(403).send({});
    } else {
      const userId = await verifyToken(token);
      const inputParams = req.method === "POST" ? req.body : req.query;
      const { videoId } = inputParams;

      if (videoId && userId) {
        const findVideo = await findVideoIdByUser(token, userId, videoId);
        const doesStatsExist = findVideo?.length > 0;

        if (req.method === "POST") {
          const { favourited, watched = true } = req.body;
          if (doesStatsExist) {
            const response = await updateStats(token, {
              watched,
              userId,
              videoId,
              favourited,
            });
            res.send({ data: response });
          } else {
            const response = await insertStats(token, {
              watched,
              userId,
              videoId,
              favourited,
            });
            res.send({ data: response });
          }
        } else {
          if (doesStatsExist) {
            res.send(findVideo);
          } else {
            res.status(404);
            res.send({ user: null, msg: "Video not found" });
          }
        }
      } else {
        res.status(500).send({ msg: "videoId is required" });
      }
    }
  } catch (error) {
    console.error("Error occured /stats", error);
    res.status(500).send({ done: false, error });
  }
}
