import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { magicAdmin } from "@/lib/magic";
import { setTokenCookie } from "@/lib/cookies";
import { isNewUser, createNewUser } from "@/lib/db/hasura";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });
  }

  const secretKey = process.env.JWT_SECRET as string;
  if (!secretKey) {
    return res
      .status(500)
      .json({ success: false, message: "JWT secret is not configured" });
  }

  try {
    const didToken = getDidToken(req.headers.authorization);
    const metadata = await magicAdmin.users.getMetadataByToken(didToken);
    const token = generateJwtToken(metadata, secretKey);

    const isNewUserQuery = await isNewUser(token, metadata.issuer);
    if (isNewUserQuery) {
      await createNewUser(token, metadata);
    }

    setTokenCookie(token, res);
    return res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error("Something went wrong logging in", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

function getDidToken(authorizationHeader: string | undefined): string {
  if (!authorizationHeader) {
    throw new Error("Authorization header is missing");
  }
  return authorizationHeader.substr(7);
}

function generateJwtToken(metadata: any, secretKey: string): string {
  return jwt.sign(
    {
      ...metadata,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
      "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": ["users", "admin"],
        "x-hasura-default-role": "users",
        "x-hasura-user-id": `${metadata.issuer}`,
      },
    },
    secretKey
  );
}
