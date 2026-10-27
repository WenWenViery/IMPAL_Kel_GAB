import bcrypt from 'bcryptjs';

// Hash password sebelum disimpan ke DB
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

// Cek password dengan hash di DB
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}