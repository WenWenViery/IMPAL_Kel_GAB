import { SignJWT, jwtVerify } from 'jose';

const getSecret = () =>
  new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-key');

export async function generateToken(payload: {
  userId: string;
  email: string;
}): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecret());
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as { userId: string; email: string };
  } catch {
    return null;
  }
}