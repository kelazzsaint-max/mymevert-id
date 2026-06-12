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

## Development

```bash
pnpm install
pnpm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Deploy

Frontend otomatis ter-deploy ke Vercel saat push ke branch `master`. Backend Railway sudah live di `https://web-production-16a78.up.railway.app`.

## License

© 2025 MYMevert Team - Free for personal use.