# Manajemen Les Privat

Aplikasi web fullstack untuk mengelola data siswa les privat. Dibangun menggunakan Next.js App Router, Prisma ORM, dan PostgreSQL (Neon), dengan tampilan yang responsif menggunakan Tailwind CSS dan shadcn/ui.

## Demo

> 🔗 Link demo: https://management-private.vercel.app
> 
> 📸 Screenshot: _menyusul_

---

## Fitur

- ✅ Tambah data siswa baru
- ✅ Lihat daftar semua siswa
- ✅ Edit data siswa
- ✅ Hapus data siswa
- ✅ Tampilan responsif (tabel di desktop, card di mobile)
- ✅ Validasi input di frontend dan backend
- ✅ Format response API yang konsisten

---

## Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Bahasa | JavaScript |
| Database | [PostgreSQL](https://www.postgresql.org/) via [Neon](https://neon.tech/) |
| ORM | [Prisma 7](https://www.prisma.io/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| UI Components | [shadcn/ui](https://ui.shadcn.com/) |
| Deployment | [Vercel](https://vercel.com/) |

---

## Struktur Project

```
manajement-private/
├── app/
│   ├── api/
│   │   └── siswa/
│   │       ├── route.js          # GET semua siswa, POST tambah siswa
│   │       └── [id]/
│   │           └── route.js      # GET by id, PUT, DELETE
│   ├── siswa/
│   │   ├── tambah/
│   │   │   └── page.js           # Halaman tambah siswa
│   │   └── [id]/
│   │       └── edit/
│   │           └── page.js       # Halaman edit siswa
│   ├── layout.tsx
│   └── page.tsx                  # Halaman utama (daftar siswa)
├── components/
│   ├── ui/                       # Komponen shadcn/ui
│   ├── SiswaTable/               # Komponen tabel & card siswa
│   └── SiswaForm/                # Komponen form tambah & edit siswa
├── lib/
│   ├── prisma.js                 # Prisma client singleton
│   ├── response.js               # Helper response API (successResponse, errorResponse)
│   └── api.js                    # Helper fetch ke API endpoints
└── prisma/
    └── schema.prisma             # Schema database
```

---

## Memulai (Development)

### Prasyarat

- Node.js 18+
- Akun [Neon](https://neon.tech/) (untuk database PostgreSQL)

### Instalasi

1. Clone repository

```bash
git clone https://github.com/username/manajement-private.git
cd manajement-private
```

2. Install dependencies

```bash
npm install
```

3. Buat file `.env` di root project

```env
DATABASE_URL="postgresql://..."       # Pooled connection string dari Neon
DIRECT_URL="postgresql://..."         # Direct connection string dari Neon
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

4. Jalankan migrasi database

```bash
npx prisma migrate dev
```

5. Jalankan server development

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## API Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/siswa` | Ambil semua data siswa |
| POST | `/api/siswa` | Tambah siswa baru |
| GET | `/api/siswa/:id` | Ambil data siswa by ID |
| PUT | `/api/siswa/:id` | Update data siswa |
| DELETE | `/api/siswa/:id` | Hapus data siswa |

### Format Response

Semua endpoint menggunakan format response yang konsisten:

```json
// Sukses
{
  "success": true,
  "message": "Berhasil",
  "data": {},
  "meta": {
    "timestamp": "2026-07-04T10:00:00.000Z"
  }
}

// Error
{
  "success": false,
  "message": "Pesan error",
  "data": null,
  "meta": {
    "timestamp": "2026-07-04T10:00:00.000Z"
  }
}
```

---

## Deployment

Project ini di-deploy ke Vercel dengan database PostgreSQL di Neon.

Saat deploy, tambahkan environment variables berikut di Vercel dashboard:

```
DATABASE_URL
DIRECT_URL
NEXT_PUBLIC_BASE_URL
```

---

## Lisensi

[MIT](LICENSE)

---

> Dibuat oleh [Aimanurrofi](https://github.com/Mannn21) — sebagai project portofolio sekaligus alat bantu manajemen les privat harian.
