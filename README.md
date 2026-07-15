# 🌙 Al-Qur'an & Quiz Interaktif Platform

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.3-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23.24-FF0055?logo=framer&logoColor=white)](https://www.framer.com/motion/)

Platform pembelajaran dan ruang baca Al-Qur'an digital berbasis web yang interaktif, modern, dan sepenuhnya responsif. Aplikasi ini mengintegrasikan API publik untuk menyajikan data surah serta ayat secara *real-time*, sekaligus dilengkapi dengan modul kuis interaktif (gamifikasi) berbasis skor untuk menguji hafalan pengguna.

---

## ✨ Fitur Utama

- **📖 Ruang Baca Al-Qur'an:** Menampilkan 114 surah lengkap dengan teks Arab dan terjemahan bahasa Indonesia yang bersih dan mudah dibaca.
- **🔍 Pencarian Cepat:** Filter pencarian surah yang responsif berdasarkan nama latin maupun arti surah.
- **🔊 Pemutar Audio Per Ayat:** Fitur audio *streaming* per ayat menggunakan native JavaScript Audio API untuk mendengarkan pelafalan yang benar.
- **🎮 Gamifikasi Kuis Dinamis:** Modul kuis interaktif dengan 4 tipe soal acak: *Lanjutan Ayat*, *Tebak Arti*, *Tebak Teks Arab*, dan *Tebak Nomor Surah*.
- **📊 Sistem Skor & Feedback Instan:** Perhitungan skor global secara *real-time* dilengkapi visual *pop-up feedback* saat menjawab pertanyaan.
- **✨ UI/UX Premium & Animasi Modern:** Tampilan cantik dengan tema *Glassmorphism*, transisi halaman yang mulus menggunakan **Framer Motion**, animasi **Lottie**, dan efek kartu 3D interaktif dari **React Parallax Tilt**.
- **🛡️ Sistem Fallback Offline-Ready:** Aplikasi dilengkapi dengan cadangan data lokal 114 surah untuk memastikan sistem kuis dan navigasi dasar tetap berjalan lancar jika API eksternal mengalami gangguan.

---

## 🛠️ Tech Stack & Dependencies

### Core:
- **React 19** - Library frontend terbaru untuk pembangunan komponen deklaratif.
- **Vite 7** - Build tool generasi baru yang sangat cepat untuk *development*.
- **Tailwind CSS v3** - Framework CSS berbasis utilitas untuk *styling* yang cepat dan responsif.

### Libraries:
- **Framer Motion (v12)** - Untuk mengontrol transisi halaman dan *micro-interactions*.
- **Lottie React** - Merendernya animasi berbasis vektor (.json) agar UI terasa lebih hidup.
- **React Parallax Tilt** - Memberikan efek interaksi 3D paralaks pada komponen kartu surah/kuis.
- **Lucide React** - Set ikon SVG yang bersih, konsisten, dan ringan.

