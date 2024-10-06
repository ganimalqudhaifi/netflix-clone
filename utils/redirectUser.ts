import type { GetServerSidePropsContext } from "next";
import { verifyToken } from "@/lib/utils";

interface RedirectUserResult {
  userId: string | null;
  token: string | null;
}

export async function redirectUser(
  context: GetServerSidePropsContext,
): Promise<RedirectUserResult> {
  const token = context.req.cookies.token ?? null;
  let userId = typeof token === "string" ? await verifyToken(token) : null;

  return {
    userId,
    token,
  };
}
