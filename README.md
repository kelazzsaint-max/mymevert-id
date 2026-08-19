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
NEXT_PUBLIC_API_URL=https://web-production-16a78.up.railway.app
```

- Frontend membaca `NEXT_PUBLIC_API_URL` dari environment variable di `src/components/converter/converter-input.tsx:28`.
- Jika `.env.local` tidak di-set, aplikasi fallback ke URL Railway default.
- File `.env.local` **tidak** di-commit ke repo (sudah ada di `.gitignore`).

## Optimasi yang Diterapkan

- **Dynamic Import**: Komponen di bawah fold (`Features`, `HowItWorks`, `Platforms`, `WhyChoose`, `FAQ`) di-load via `next/dynamic` agar initial bundle lebih kecil.
- **Cache-Control Header**: Static assets di-cache via `next.config.ts` dengan `max-age=31536000` untuk gambar dan `max-age=604800` untuk video.
- **Polling Backoff**: Client polling status konversi menggunakan exponential backoff (1s → 2s → 4s → max 10s) untuk mengurangi request mubazir saat backend down.

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

Frontend otomatis ter-deploy ke Vercel saat push ke branch `master`. Backend Railway live di `https://web-production-16a78.up.railway.app` (catatan: free tier Railway bisa non-aktif sewaktu-waktu).

## License

© 2026 MYMevert Solo - Free for personal use.