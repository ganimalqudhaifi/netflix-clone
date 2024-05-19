import type { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "@/lib/utils";
import { findVideoIdByUser, insertStats, updateStats } from "@/lib/db/hasura";

export default async function stats(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({ message: "Authorization token is missing" });
  }

  try {
    const userId = await verifyToken(token);
    const inputParams = req.method === "POST" ? req.body : req.query;
    const { videoId } = inputParams;

    if (!videoId || !userId) {
      return res.status(500).json({ msg: "videoId and userId are required" });
    }

    if (req.method === "POST") {
      await handlePostRequest(req, res, token, userId, videoId);
    } else if (req.method === "GET") {
      await handleGetRequest(res, token, userId, videoId);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      res
        .status(405)
        .json({ success: false, message: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error("Error occured /api/stats", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

async function handlePostRequest(
  req: NextApiRequest,
  res: NextApiResponse,
  token: string,
  userId: string,
  videoId: string
) {
  try {
    const { favourited, watched = true } = req.body;
    const existingStats = await findVideoIdByUser(token, userId, videoId);

    let response;
    if (existingStats.length > 0) {
      response = await updateStats(token, {
        watched,
        userId,
        videoId,
        favourited,
      });
    } else {
      response = await insertStats(token, {
        watched,
        userId,
        videoId,
        favourited,
      });
    }

    res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.error("Error in handlePostRequest", error);
    res.status(500).json({ success: false, message: "Failed to update stats" });
  }
}

async function handleGetRequest(
  res: NextApiResponse,
  token: string,
  userId: string,
  videoId: string
) {
  try {
    const videoStats = await findVideoIdByUser(token, userId, videoId);

    if (videoStats.length > 0) {
      res.status(200).json({ success: true, data: videoStats });
    } else {
      res.status(404).json({ success: false, message: "Video not found" });
    }
  } catch (error) {
    console.error("Error in handleGetRequest", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch video stats" });
  }
}
