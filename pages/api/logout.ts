import type { NextApiRequest, NextApiResponse } from "next";
import { removeTokenCookie } from "@/lib/cookies";
import { magicAdmin } from "@/lib/magic";
import { verifyToken } from "@/lib/utils";

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "User is not logged in" });
  }

  try {
    const userId = await verifyToken(token);
    removeTokenCookie(res);

    if (!userId) {
      throw new Error("User's session with Magic already expired");
    }

    await logoutMagicUser(userId);

    // Redirect user to login page
    res.writeHead(302, { Location: "/login" });
    res.end();
  } catch (error) {
    console.error("Error occurred during logout:", error);
    res.status(401).json({ message: "User is not logged in" });
  }
}

async function logoutMagicUser(userId: string) {
  try {
    await magicAdmin.users.logoutByIssuer(userId);
  } catch (error) {
    console.error("Error occurred while logging out magic user:", error);
  }
}
