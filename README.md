# MYMevert.id

Website converter media gratis yang memungkinkan kamu mengonversi video YouTube ke MP4, mengekstrak audio MP3 dari video lokal, atau mendownload MP3 langsung dari YouTube.

## Fitur

- **YouTube ke MP4** - Download video YouTube dalam berbagai resolusi (1080p, 720p, 480p, 360p)
- **YouTube ke MP3** - Ekstrak audio berkualitas tinggi dari video YouTube
- **Lokal ke MP3** - Konversi file video lokal (MP4, AVI, MKV, MOV) menjadi MP3

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Icons**: Lucide React
- **Deployment**: Vercel
- **Backend**: Railway (FastAPI)

## Endpoints Backend (Railway)

| Fungsi | Method | URL |
|--------|--------|-----|
| YouTube ke MP4 | POST | `/convert/yt-mp4/start` |
| YouTube ke MP3 | POST | `/convert/yt-mp3/start` |
| Lokal ke MP3 | POST | `/convert/local-mp3/start` |
| Cek status | GET | `/convert/status/{job_id}` |
| Download | GET | `/convert/download/{job_id}` |

## Environment Variables

Buat file `.env.local` di root project:

```bash
NEXT_PUBLIC_API_URL=https://stauroscopically-fluorescent-shelli.ngrok-free.dev
```

- Frontend membaca `NEXT_PUBLIC_API_URL` dari environment variable di `src/components/converter/converter-input.tsx:28`.
- Jika `.env.local` tidak di-set, aplikasi fallback ke URL ngrok default.
- File `.env.local` **tidak** di-commit ke repo (sudah ada di `.gitignore`).
- Backend saat ini berjalan via **ngrok** (tunnel HTTPS ke localhost). URL ngrok bisa berubah jika tunnel di-restart.

## Optimasi yang Diterapkan

- **Dynamic Import**: Komponen di bawah fold (`Features`, `HowItWorks`, `Platforms`, `WhyChoose`, `FAQ`) di-load via `next/dynamic` agar initial bundle lebih kecil.
- **Cache-Control Header**: Static assets di-cache via `next.config.ts` dengan `max-age=31536000` untuk gambar dan `max-age=604800` untuk video.
- **Polling Backoff**: Client polling status konversi menggunakan exponential backoff (1s → 2s → 4s → max 10s) untuk mengurangi request mubazir saat backend down.
- **Lazy Load Modal**: Modal Privacy, Terms, dan Cookies di-import secara dynamic via `next/dynamic` supaya tidak ikut ke initial JS bundle.
- **Video Autoplay Policy**: Video background menghormati setting `prefers-reduced-motion`, `Data Saver`, dan koneksi lambat (2G) — video tidak dimuat jika salah satu kondisi aktif.
- **Aksesibilitas Zoom**: Viewport memungkinkan pinch-zoom (maximumScale: 5) untuk pengguna low-vision.
- **Reduced Motion Global**: Semua animasi dihentikan via CSS media query `prefers-reduced-motion: reduce`.
- **Performa Mobile**: Intensitas blur dikurangi di mobile (≤768px) untuk mengurangi beban GPU di perangkat low-end.
- **Responsive Navbar**: Tombol toggle theme dan hamburger menu memiliki ukuran lebih kecil di mobile untuk menghemat ruang.

## Performance Testing (k6)

Folder `k6-tests/` berisi script k6 untuk menguji frontend secara otomatis. Diurutkan sesuai konsep K6:

| File | Konsep | Deskripsi |
|------|--------|-----------|
| `01-options-default.js` | Options & Default Function | Baseline test ke route dan asset statis |
| `02-checks-fail.js` | Checks & Fail | Validasi status code, response time, content-type |
| `03-execution-context.js` | Execution Context | Simulasi user unik via `k6/execution` |
| `04-test-lifecycle.js` | Test Life Cycle | `setup()` health check + HEAD metadata, `teardown()` ringkasan |
| `05-environment-variables.js` | Environment Variables | Base URL via `__ENV.BASE_URL` |
| `06-scenarios-executors.js` | Scenario & Executor | Pisahkan traffic browse vs spike download asset |
| `07-metrics.js` | Metrics | Custom Counter, Gauge, Rate, Trend per asset |
| `08-thresholds.js` | Thresholds | Batas wajar per kategori asset (HTML, video, image) |
| `09-remote-modules.js` | Remote Modules | Placeholder edukasi (tidak dipaksa) |

### Menjalankan Test

```bash
# Baseline
k6 run k6-tests/01-options-default.js

# Dengan environment variable (disarankan)
k6 run -e BASE_URL=https://mymevert.id k6-tests/05-environment-variables.js

# Jalankan semua berurutan
for f in k6-tests/*.js; do k6 run "$f"; done
```

## Development

```bash
pnpm install
pnpm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Deploy

Frontend otomatis ter-deploy ke Vercel saat push ke branch `master`. Backend saat ini berjalan di `https://stauroscopically-fluorescent-shelli.ngrok-free.dev` via ngrok tunnel (catatan: URL ngrok bisa berubah sewaktu-waktu jika tunnel di-restart).

## License

© 2026 MYMevert Solo - Free for personal use.