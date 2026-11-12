# Job Link Generator

Aplikasi React dan TypeScript untuk membuat tautan pencarian lowongan di LinkedIn, Glints, dan JobStreet dari posisi dan lokasi yang dimasukkan pengguna. Hasil juga menampilkan variasi kata kunci, alternatif query, dan tips pencarian.

## Teknologi

React 19, TypeScript 6, Vite 8, Framer Motion, dan Lucide. Tampilan menggunakan CSS dan partikel canvas.

## Menjalankan

Gunakan Node.js 22.12 atau lebih baru dan npm.

```bash
npm ci
npm run dev
```

Tidak diperlukan API key, environment variable, atau backend.

## Pemeriksaan dan build

```bash
npm run lint
npm run build
npm run preview
```

Build statis dihasilkan di `dist/`.

## Cara kerja

1. Masukkan target posisi dan, bila diperlukan, industri, level pengalaman, serta lokasi.
2. Pilih Generate Smart Links.
3. Aplikasi menyusun template hasil secara lokal, lalu menampilkan tautan yang dapat dibuka di platform pekerjaan.

Ini merupakan demo berbasis template, tanpa pemanggilan AI, scraping, atau pengambilan lowongan secara langsung. Jeda 2,5 detik menyimulasikan proses pembuatan hasil. Industri dipakai dalam alternatif query; pilihan level pengalaman saat ini hanya dikumpulkan oleh form dan belum memengaruhi hasil. Tautan mengarah ke platform pihak ketiga dan bukan jaminan tersedianya lowongan.

## Struktur

- `src/App.tsx`: form, penyusunan template, hasil, serta canvas partikel.
- `src/index.css`: gaya aplikasi.
- `src/main.tsx`: bootstrap React.
- `public/`: aset statis.
