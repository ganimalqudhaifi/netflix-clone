import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtVerify } from "jose";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function verifyToken(token: string) {
  try {
    if (token) {
      const verified = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      return typeof verified.payload.issuer === "string"
        ? verified.payload.issuer
        : null;
    }
    return null;
  } catch (error) {
    console.error({ error });
    return null;
  }
}

export async function getMetadataByToken(token: string) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    const { payload } = await jwtVerify(token, secret);
    return {
      email: payload.email,
    };
  } catch (error) {
    console.error({ error });
  }
}
