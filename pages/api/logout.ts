import type { NextApiRequest, NextApiResponse } from "next";

import { magicAdmin } from "@/lib/magic";
import { verifyToken } from "@/lib/utils";
import { removeTokenCookie } from "@/lib/cookies";

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!req.cookies.token)
      return res.status(401).json({ message: "User is not logged in" });
    const token = req.cookies.token;
    const userId = await verifyToken(token);
    removeTokenCookie(res);
    try {
      if (typeof userId === "string") {
        await magicAdmin.users.logoutByIssuer(userId);
      } else {
        throw new Error("User's session with Magic alredy expired");
      }
    } catch (error) {
      console.error("Error occured while logging out magic user", error);
    }
    // redirects user to login page
    res.writeHead(302, { Location: "/login" });
    res.end();
  } catch (error) {
    console.error({ error });
    res.status(401).json({ message: "User is not logged in" });
  }
}
