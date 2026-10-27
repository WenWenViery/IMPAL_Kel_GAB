# Progress Log — InventarisAI

## Minggu 7 — Login & Register Flow
**Tanggal:** 27 Oktober 2025

### ✅ Fitur Selesai

- Setup Next.js + TypeScript + Tailwind CSS
- Koneksi PostgreSQL (database `inventarisasi`)
- Halaman Login (`/login`)
- Halaman Register (`/register`)
- Halaman Dashboard (`/dashboard`)
- API Endpoint:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `POST /api/auth/logout`
  - `GET /api/auth/me`
- Middleware proteksi route `/dashboard`
- Password hashing bcrypt + JWT HTTP-only cookie

### 🐛 Kendala & Solusi

1. **`database "inventarisai" does not exist`** → Nama database di pgAdmin ternyata `inventarisasi`
2. **`verifyToken doesn't exist`** → Pisahkan JWT helper (`lib/jwt.ts`) dari bcrypt (`lib/auth.ts`)
3. **Form register tidak submit** → Validasi HTML5, tambahkan `noValidate` + valid email

### 📅 Rencana Minggu Depan

- [ ] CRUD Barang (list, tambah, edit, hapus)
- [ ] Form tambah barang