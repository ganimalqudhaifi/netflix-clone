import { jwtVerify } from 'jose';

export async function verifyToken(token: string) {
  try {
    if (token) {
      const verified = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
      return typeof verified.payload.issuer === 'string' ? verified.payload.issuer : null;
    }
    return null;
  } catch (error) {
    console.error({ error });
    return null;
  }
}