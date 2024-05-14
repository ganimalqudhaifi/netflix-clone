import { verifyToken } from '@/lib/utils';
import type { GetServerSidePropsContext } from 'next';

interface RedirectUserResult {
  userId: string,
  token: string | null | undefined
}

export async function redirectUser(context: GetServerSidePropsContext): Promise<RedirectUserResult> {
  const token = context.req ? context.req.cookies.token : null;
  const userId = await verifyToken(token);

  return {
    userId,
    token,
  }
}