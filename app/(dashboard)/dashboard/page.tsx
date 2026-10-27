'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [user, setUser] = useState<{ email: string; fullName: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Ambil info user dari /api/auth/me (buat nanti) — sementara demo simple
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((data) => setUser(data.user))
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">IA</span>
          </div>
          <span className="font-semibold text-gray-900">InventarisAI</span>
        </div>
        <div className="flex items-center gap-4">
          {user && (
            <span className="text-sm text-gray-600">
              {user.fullName || user.email}
            </span>
          )}
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 hover:underline font-medium"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Selamat datang! 🎉
        </h1>
        <p className="text-gray-600 mb-8">
          Login berhasil. Ini adalah halaman dashboard sementara.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm text-gray-500">Total Barang</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">0</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm text-gray-500">Barang Masuk Hari Ini</p>
            <p className="text-3xl font-bold text-green-600 mt-1">0</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm text-gray-500">Barang Keluar Hari Ini</p>
            <p className="text-3xl font-bold text-red-600 mt-1">0</p>
          </div>
        </div>
      </main>
    </div>
  );
}