import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyPassword } from '@/lib/auth'; // Hanya verifyPassword dari auth
import { generateToken } from '@/lib/jwt';   // generateToken dari jwt

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email dan password wajib diisi' },
        { status: 400 }
      );
    }

    // 1. Cari user berdasarkan email
    const result = await pool.query(
      'SELECT id, email, password_hash, full_name FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Email atau password salah' },
        { status: 401 }
      );
    }

    const user = result.rows[0];

    // 2. Cek password
    const valid = await verifyPassword(password, user.password_hash);

    if (!valid) {
      return NextResponse.json(
        { error: 'Email atau password salah' },
        { status: 401 }
      );
    }

    // 3. Buat JWT token
    const token = await generateToken({
      userId: user.id,
      email: user.email,
    });

    // 4. Set token di cookie HTTP-only
    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
      },
    });

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 hari
      path: '/',
    });

    return response;
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}