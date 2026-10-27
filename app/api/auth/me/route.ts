import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyToken } from '@/lib/jwt'; // <-- PASTIKAN DARI @/lib/jwt

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const result = await pool.query(
      'SELECT id, email, full_name FROM users WHERE id = $1',
      [payload.userId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const user = result.rows[0];
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
      },
    });
  } catch (err) {
    console.error('Me error:', err);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}