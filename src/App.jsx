import { useState, useEffect } from 'react';
import { BookOpen, Award, ChevronRight, Home, Trophy, Volume2, CheckCircle2, XCircle, Sparkles, Settings, Brain, Hash, Play } from 'lucide-react';

const FALLBACK_SURAHS = [
  { nomor: 1, nama_latin: "Al-Fatihah", arti: "Pembukaan", jumlah_ayat: 7, tempat_turun: "Mekah" },
  { nomor: 2, nama_latin: "Al-Baqarah", arti: "Sapi Betina", jumlah_ayat: 286, tempat_turun: "Madinah" },
  { nomor: 3, nama_latin: "Ali 'Imran", arti: "Keluarga Imran", jumlah_ayat: 200, tempat_turun: "Madinah" },
  { nomor: 4, nama_latin: "An-Nisa'", arti: "Wanita", jumlah_ayat: 176, tempat_turun: "Madinah" },
  { nomor: 5, nama_latin: "Al-Ma'idah", arti: "Hidangan", jumlah_ayat: 120, tempat_turun: "Madinah" },
  { nomor: 6, nama_latin: "Al-An'am", arti: "Hewan Ternak", jumlah_ayat: 165, tempat_turun: "Mekah" },
  { nomor: 7, nama_latin: "Al-A'raf", arti: "Tempat Tertinggi", jumlah_ayat: 206, tempat_turun: "Mekah" },
  { nomor: 8, nama_latin: "Al-Anfal", arti: "Harta Rampasan Perang", jumlah_ayat: 75, tempat_turun: "Madinah" },
  { nomor: 9, nama_latin: "At-Taubah", arti: "Pengampunan", jumlah_ayat: 129, tempat_turun: "Madinah" },
  { nomor: 10, nama_latin: "Yunus", arti: "Nabi Yunus", jumlah_ayat: 109, tempat_turun: "Mekah" },
  { nomor: 11, nama_latin: "Hud", arti: "Nabi Hud", jumlah_ayat: 123, tempat_turun: "Mekah" },
  { nomor: 12, nama_latin: "Yusuf", arti: "Nabi Yusuf", jumlah_ayat: 111, tempat_turun: "Mekah" },
  { nomor: 13, nama_latin: "Ar-Ra'd", arti: "Guruh", jumlah_ayat: 43, tempat_turun: "Madinah" },
  { nomor: 14, nama_latin: "Ibrahim", arti: "Nabi Ibrahim", jumlah_ayat: 52, tempat_turun: "Mekah" },
  { nomor: 15, nama_latin: "Al-Hijr", arti: "Gunung Hijr", jumlah_ayat: 99, tempat_turun: "Mekah" },
  { nomor: 16, nama_latin: "An-Nahl", arti: "Lebah", jumlah_ayat: 128, tempat_turun: "Mekah" },
  { nomor: 17, nama_latin: "Al-Isra'", arti: "Perjalanan Malam", jumlah_ayat: 111, tempat_turun: "Mekah" },
  { nomor: 18, nama_latin: "Al-Kahf", arti: "Gua", jumlah_ayat: 110, tempat_turun: "Mekah" },
  { nomor: 19, nama_latin: "Maryam", arti: "Maryam", jumlah_ayat: 98, tempat_turun: "Mekah" },
  { nomor: 20, nama_latin: "Ta Ha", arti: "Ta Ha", jumlah_ayat: 135, tempat_turun: "Mekah" },
  { nomor: 21, nama_latin: "Al-Anbiya'", arti: "Para Nabi", jumlah_ayat: 112, tempat_turun: "Mekah" },
  { nomor: 22, nama_latin: "Al-Hajj", arti: "Haji", jumlah_ayat: 78, tempat_turun: "Madinah" },
  { nomor: 23, nama_latin: "Al-Mu'minun", arti: "Orang-orang Mukmin", jumlah_ayat: 118, tempat_turun: "Mekah" },
  { nomor: 24, nama_latin: "An-Nur", arti: "Cahaya", jumlah_ayat: 64, tempat_turun: "Madinah" },
  { nomor: 25, nama_latin: "Al-Furqan", arti: "Pembeda", jumlah_ayat: 77, tempat_turun: "Mekah" },
  { nomor: 26, nama_latin: "Asy-Syu'ara'", arti: "Para Penyair", jumlah_ayat: 227, tempat_turun: "Mekah" },
  { nomor: 27, nama_latin: "An-Naml", arti: "Semut", jumlah_ayat: 93, tempat_turun: "Mekah" },
  { nomor: 28, nama_latin: "Al-Qasas", arti: "Kisah-kisah", jumlah_ayat: 88, tempat_turun: "Mekah" },
  { nomor: 29, nama_latin: "Al-'Ankabut", arti: "Laba-laba", jumlah_ayat: 69, tempat_turun: "Mekah" },
  { nomor: 30, nama_latin: "Ar-Rum", arti: "Romawi", jumlah_ayat: 60, tempat_turun: "Mekah" },
  { nomor: 31, nama_latin: "Luqman", arti: "Luqman", jumlah_ayat: 34, tempat_turun: "Mekah" },
  { nomor: 32, nama_latin: "As-Sajdah", arti: "Sajdah", jumlah_ayat: 30, tempat_turun: "Mekah" },
  { nomor: 33, nama_latin: "Al-Ahzab", arti: "Golongan yang Bersekutu", jumlah_ayat: 73, tempat_turun: "Madinah" },
  { nomor: 34, nama_latin: "Saba'", arti: "Kaum Saba'", jumlah_ayat: 54, tempat_turun: "Mekah" },
  { nomor: 35, nama_latin: "Fatir", arti: "Pencipta", jumlah_ayat: 45, tempat_turun: "Mekah" },
  { nomor: 36, nama_latin: "Ya Sin", arti: "Ya Sin", jumlah_ayat: 83, tempat_turun: "Mekah" },
  { nomor: 37, nama_latin: "As-Saffat", arti: "Barisan-barisan", jumlah_ayat: 182, tempat_turun: "Mekah" },
  { nomor: 38, nama_latin: "Sad", arti: "Sad", jumlah_ayat: 88, tempat_turun: "Mekah" },
  { nomor: 39, nama_latin: "Az-Zumar", arti: "Rombongan", jumlah_ayat: 75, tempat_turun: "Mekah" },
  { nomor: 40, nama_latin: "Ghafir", arti: "Yang Mengampuni", jumlah_ayat: 85, tempat_turun: "Mekah" },
  { nomor: 41, nama_latin: "Fussilat", arti: "Yang Dijelaskan", jumlah_ayat: 54, tempat_turun: "Mekah" },
  { nomor: 42, nama_latin: "Asy-Syura", arti: "Musyawarah", jumlah_ayat: 53, tempat_turun: "Mekah" },
  { nomor: 43, nama_latin: "Az-Zukhruf", arti: "Perhiasan", jumlah_ayat: 89, tempat_turun: "Mekah" },
  { nomor: 44, nama_latin: "Ad-Dukhan", arti: "Kabut", jumlah_ayat: 59, tempat_turun: "Mekah" },
  { nomor: 45, nama_latin: "Al-Jasiyah", arti: "Yang Berlutut", jumlah_ayat: 37, tempat_turun: "Mekah" },
  { nomor: 46, nama_latin: "Al-Ahqaf", arti: "Bukit-bukit Pasir", jumlah_ayat: 35, tempat_turun: "Mekah" },
  { nomor: 47, nama_latin: "Muhammad", arti: "Nabi Muhammad", jumlah_ayat: 38, tempat_turun: "Madinah" },
  { nomor: 48, nama_latin: "Al-Fath", arti: "Kemenangan", jumlah_ayat: 29, tempat_turun: "Madinah" },
  { nomor: 49, nama_latin: "Al-Hujurat", arti: "Kamar-kamar", jumlah_ayat: 18, tempat_turun: "Madinah" },
  { nomor: 50, nama_latin: "Qaf", arti: "Qaf", jumlah_ayat: 45, tempat_turun: "Mekah" },
  { nomor: 51, nama_latin: "Az-Zariyat", arti: "Yang Menerbangkan", jumlah_ayat: 60, tempat_turun: "Mekah" },
  { nomor: 52, nama_latin: "At-Tur", arti: "Bukit", jumlah_ayat: 49, tempat_turun: "Mekah" },
  { nomor: 53, nama_latin: "An-Najm", arti: "Bintang", jumlah_ayat: 62, tempat_turun: "Mekah" },
  { nomor: 54, nama_latin: "Al-Qamar", arti: "Bulan", jumlah_ayat: 55, tempat_turun: "Mekah" },
  { nomor: 55, nama_latin: "Ar-Rahman", arti: "Yang Maha Pengasih", jumlah_ayat: 78, tempat_turun: "Madinah" },
  { nomor: 56, nama_latin: "Al-Waqi'ah", arti: "Hari Kiamat", jumlah_ayat: 96, tempat_turun: "Mekah" },
  { nomor: 57, nama_latin: "Al-Hadid", arti: "Besi", jumlah_ayat: 29, tempat_turun: "Madinah" },
  { nomor: 58, nama_latin: "Al-Mujadilah", arti: "Wanita yang Berdebat", jumlah_ayat: 22, tempat_turun: "Madinah" },
  { nomor: 59, nama_latin: "Al-Hasyr", arti: "Pengusiran", jumlah_ayat: 24, tempat_turun: "Madinah" },
  { nomor: 60, nama_latin: "Al-Mumtahanah", arti: "Wanita yang Diuji", jumlah_ayat: 13, tempat_turun: "Madinah" },
  { nomor: 61, nama_latin: "As-Saff", arti: "Barisan", jumlah_ayat: 14, tempat_turun: "Madinah" },
  { nomor: 62, nama_latin: "Al-Jumu'ah", arti: "Jumat", jumlah_ayat: 11, tempat_turun: "Madinah" },
  { nomor: 63, nama_latin: "Al-Munafiqun", arti: "Orang-orang Munafik", jumlah_ayat: 11, tempat_turun: "Madinah" },
  { nomor: 64, nama_latin: "At-Taghabun", arti: "Hari Dinampakkan Kesalahan", jumlah_ayat: 18, tempat_turun: "Madinah" },
  { nomor: 65, nama_latin: "At-Talaq", arti: "Talak", jumlah_ayat: 12, tempat_turun: "Madinah" },
  { nomor: 66, nama_latin: "At-Tahrim", arti: "Mengharamkan", jumlah_ayat: 12, tempat_turun: "Madinah" },
  { nomor: 67, nama_latin: "Al-Mulk", arti: "Kerajaan", jumlah_ayat: 30, tempat_turun: "Mekah" },
  { nomor: 68, nama_latin: "Al-Qalam", arti: "Pena", jumlah_ayat: 52, tempat_turun: "Mekah" },
  { nomor: 69, nama_latin: "Al-Haqqah", arti: "Hari Kiamat", jumlah_ayat: 52, tempat_turun: "Mekah" },
  { nomor: 70, nama_latin: "Al-Ma'arij", arti: "Tempat Naik", jumlah_ayat: 44, tempat_turun: "Mekah" },
  { nomor: 71, nama_latin: "Nuh", arti: "Nabi Nuh", jumlah_ayat: 28, tempat_turun: "Mekah" },
  { nomor: 72, nama_latin: "Al-Jinn", arti: "Jin", jumlah_ayat: 28, tempat_turun: "Mekah" },
  { nomor: 73, nama_latin: "Al-Muzzammil", arti: "Orang yang Berselimut", jumlah_ayat: 20, tempat_turun: "Mekah" },
  { nomor: 74, nama_latin: "Al-Muddassir", arti: "Orang yang Berkemul", jumlah_ayat: 56, tempat_turun: "Mekah" },
  { nomor: 75, nama_latin: "Al-Qiyamah", arti: "Hari Kiamat", jumlah_ayat: 40, tempat_turun: "Mekah" },
  { nomor: 76, nama_latin: "Al-Insan", arti: "Manusia", jumlah_ayat: 31, tempat_turun: "Madinah" },
  { nomor: 77, nama_latin: "Al-Mursalat", arti: "Malaikat yang Diutus", jumlah_ayat: 50, tempat_turun: "Mekah" },
  { nomor: 78, nama_latin: "An-Naba'", arti: "Berita Besar", jumlah_ayat: 40, tempat_turun: "Mekah" },
  { nomor: 79, nama_latin: "An-Nazi'at", arti: "Malaikat yang Mencabut", jumlah_ayat: 46, tempat_turun: "Mekah" },
  { nomor: 80, nama_latin: "'Abasa", arti: "Ia Bermuka Masam", jumlah_ayat: 42, tempat_turun: "Mekah" },
  { nomor: 81, nama_latin: "At-Takwir", arti: "Menggulung", jumlah_ayat: 29, tempat_turun: "Mekah" },
  { nomor: 82, nama_latin: "Al-Infitar", arti: "Terbelah", jumlah_ayat: 19, tempat_turun: "Mekah" },
  { nomor: 83, nama_latin: "Al-Mutaffifin", arti: "Orang yang Curang", jumlah_ayat: 36, tempat_turun: "Mekah" },
  { nomor: 84, nama_latin: "Al-Insyiqaq", arti: "Terbelah", jumlah_ayat: 25, tempat_turun: "Mekah" },
  { nomor: 85, nama_latin: "Al-Buruj", arti: "Gugusan Bintang", jumlah_ayat: 22, tempat_turun: "Mekah" },
  { nomor: 86, nama_latin: "At-Tariq", arti: "Yang Datang di Malam Hari", jumlah_ayat: 17, tempat_turun: "Mekah" },
  { nomor: 87, nama_latin: "Al-A'la", arti: "Yang Paling Tinggi", jumlah_ayat: 19, tempat_turun: "Mekah" },
  { nomor: 88, nama_latin: "Al-Ghasyiyah", arti: "Hari Pembalasan", jumlah_ayat: 26, tempat_turun: "Mekah" },
  { nomor: 89, nama_latin: "Al-Fajr", arti: "Fajar", jumlah_ayat: 30, tempat_turun: "Mekah" },
  { nomor: 90, nama_latin: "Al-Balad", arti: "Negeri", jumlah_ayat: 20, tempat_turun: "Mekah" },
  { nomor: 91, nama_latin: "Asy-Syams", arti: "Matahari", jumlah_ayat: 15, tempat_turun: "Mekah" },
  { nomor: 92, nama_latin: "Al-Lail", arti: "Malam", jumlah_ayat: 21, tempat_turun: "Mekah" },
  { nomor: 93, nama_latin: "Ad-Duha", arti: "Duha", jumlah_ayat: 11, tempat_turun: "Mekah" },
  { nomor: 94, nama_latin: "Asy-Syarh", arti: "Lapang", jumlah_ayat: 8, tempat_turun: "Mekah" },
  { nomor: 95, nama_latin: "At-Tin", arti: "Buah Tin", jumlah_ayat: 8, tempat_turun: "Mekah" },
  { nomor: 96, nama_latin: "Al-'Alaq", arti: "Segumpal Darah", jumlah_ayat: 19, tempat_turun: "Mekah" },
  { nomor: 97, nama_latin: "Al-Qadr", arti: "Kemuliaan", jumlah_ayat: 5, tempat_turun: "Mekah" },
  { nomor: 98, nama_latin: "Al-Bayyinah", arti: "Bukti yang Nyata", jumlah_ayat: 8, tempat_turun: "Madinah" },
  { nomor: 99, nama_latin: "Az-Zalzalah", arti: "Kegoncangan", jumlah_ayat: 8, tempat_turun: "Madinah" },
  { nomor: 100, nama_latin: "Al-'Adiyat", arti: "Kuda Perang", jumlah_ayat: 11, tempat_turun: "Mekah" },
  { nomor: 101, nama_latin: "Al-Qari'ah", arti: "Hari Kiamat", jumlah_ayat: 11, tempat_turun: "Mekah" },
  { nomor: 102, nama_latin: "At-Takasur", arti: "Bermegah-megahan", jumlah_ayat: 8, tempat_turun: "Mekah" },
  { nomor: 103, nama_latin: "Al-'Asr", arti: "Masa", jumlah_ayat: 3, tempat_turun: "Mekah" },
  { nomor: 104, nama_latin: "Al-Humazah", arti: "Pengumpat", jumlah_ayat: 9, tempat_turun: "Mekah" },
  { nomor: 105, nama_latin: "Al-Fil", arti: "Gajah", jumlah_ayat: 5, tempat_turun: "Mekah" },
  { nomor: 106, nama_latin: "Quraisy", arti: "Suku Quraisy", jumlah_ayat: 4, tempat_turun: "Mekah" },
  { nomor: 107, nama_latin: "Al-Ma'un", arti: "Barang-barang yang Berguna", jumlah_ayat: 7, tempat_turun: "Mekah" },
  { nomor: 108, nama_latin: "Al-Kausar", arti: "Nikmat yang Berlimpah", jumlah_ayat: 3, tempat_turun: "Mekah" },
  { nomor: 109, nama_latin: "Al-Kafirun", arti: "Orang-orang Kafir", jumlah_ayat: 6, tempat_turun: "Mekah" },
  { nomor: 110, nama_latin: "An-Nasr", arti: "Pertolongan", jumlah_ayat: 3, tempat_turun: "Madinah" },
  { nomor: 111, nama_latin: "Al-Lahab", arti: "Api yang Bergejolak", jumlah_ayat: 5, tempat_turun: "Mekah" },
  { nomor: 112, nama_latin: "Al-Ikhlas", arti: "Ikhlas", jumlah_ayat: 4, tempat_turun: "Mekah" },
  { nomor: 113, nama_latin: "Al-Falaq", arti: "Waktu Subuh", jumlah_ayat: 5, tempat_turun: "Mekah" },
  { nomor: 114, nama_latin: "An-Nas", arti: "Manusia", jumlah_ayat: 6, tempat_turun: "Mekah" }
];

const API_BASE = "https://equran.id/api/v2";

const api = {
  getSurahs: async () => {
    const response = await fetch(`${API_BASE}/surat`);
    const result = await response.json();

    return result.data.map(surah => ({
      nomor: surah.nomor,
      nama_latin: surah.namaLatin,
      arti: surah.arti,
      jumlah_ayat: surah.jumlahAyat,
      tempat_turun: surah.tempatTurun,
      nama_arab: surah.nama
    }));
  },

  getSurahDetail: async (number) => {
    const response = await fetch(`${API_BASE}/surat/${number}`);
    const result = await response.json();

    const surah = result.data;

    return {
      nomor: surah.nomor,
      nama_latin: surah.namaLatin,
      nama: surah.nama,
      arti: surah.arti,
      jumlah_ayat: surah.jumlahAyat,
      tempat_turun: surah.tempatTurun,

      ayat: surah.ayat.map(ayah => ({
        nomor: ayah.nomorAyat,
        ar: ayah.teksArab,
        idn: ayah.teksIndonesia,
        audio: ayah.audio?.["05"]
      }))
    };
  }
};

export default function QuranLearningApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalScore, setTotalScore] = useState(0);
  const [quizType, setQuizType] = useState(null);
  const [quizCount, setQuizCount] = useState(null);

  useEffect(() => {
    loadSurahs();
  }, []);

  const loadSurahs = async () => {
    try {
      setLoading(true);
      const data = await api.getSurahs();
      
      if (Array.isArray(data) && data.length > 0) {
        setSurahs(data);
      } else {
        setSurahs(FALLBACK_SURAHS);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading surahs, using fallback data:', error);
      setSurahs(FALLBACK_SURAHS);
      setLoading(false);
    }
  };

  const updateScore = (points) => {
    const newScore = totalScore + points;
    setTotalScore(newScore);
  };

  const navigateTo = (page, surah = null) => {
    setCurrentPage(page);
    setSelectedSurah(surah);

    if (page === "quiz-setup") {
      setQuizType(null);
      setQuizCount(null);
    }
  };

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-teal-50">
      <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Belajar Al-Qur'an</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigateTo('home')}
                className="flex items-center space-x-2 hover:bg-white/20 px-3 py-2 rounded-lg transition"
              >
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline">Beranda</span>
              </button>
              <div className="flex items-center space-x-2 bg-amber-500 px-4 py-2 rounded-full">
                <Trophy className="w-5 h-5" />
                <span className="font-bold">{totalScore}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {currentPage === 'home' && (
          <HomePage surahs={surahs} loading={loading} navigateTo={navigateTo} />
        )}
        {currentPage === 'read' && selectedSurah && (
          <ReadPage surah={selectedSurah} navigateTo={navigateTo} />
        )}
        {currentPage === 'quiz-setup' && selectedSurah && (
          <QuizSetup
            onStart={(type, count) => {
              setQuizType(type);
              setQuizCount(count);
              setCurrentPage("quiz");
            }}
          />
        )}
        {currentPage === 'quiz' && quizType && selectedSurah && (
          <QuizPage
            surah={selectedSurah}
            questionType={quizType}
            questionCount={quizCount}
            navigateTo={navigateTo}
            updateScore={updateScore}
          />
        )}
      </main>

      <footer className="bg-emerald-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-emerald-200">© 2025 Belajar Al-Qur'an.</p>
        </div>
      </footer>
    </div>
  );
}

function HomePage({ surahs, loading, navigateTo }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSurahs = Array.isArray(surahs) ? surahs.filter(surah =>
    (surah.nama_latin?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    surah.arti?.toLowerCase().includes(searchTerm.toLowerCase()))
  ) : [];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-emerald-700 font-semibold">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (!Array.isArray(surahs) || surahs.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-4">Gagal memuat data surah</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg"
          >
            Muat Ulang
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-xl p-8 mb-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Assalamu'alaikum! 🌙</h2>
        <p className="text-emerald-100 text-lg">
          Selamat datang di platform belajar Al-Qur'an interaktif. Mulai perjalanan Anda!
        </p>
      </div>

      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="🔍 Cari nama surat atau arti…"
          className="w-full px-5 py-4 rounded-2xl bg-white/70 backdrop-blur border border-emerald-300 shadow-inner 
          focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSurahs.map((surah) => (
          <SurahCard key={surah.nomor} surah={surah} navigateTo={navigateTo} />
        ))}
      </div>
    </div>
  );
}

function SurahCard({ surah, navigateTo }) {
  return (
    <div className="relative group rounded-2xl p-6 bg-white/70 backdrop-blur-xl border border-emerald-300/30 shadow-lg hover:shadow-2xl transition-all duration-300">
      <div className="absolute -top-4 -left-4 w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg text-white text-xl font-extrabold flex items-center justify-center z-20">
        {surah.nomor}
      </div>

      <div className="mb-6 mt-4">
        <h3 className="text-2xl font-bold text-emerald-800">{surah.nama_latin}</h3>
        <p className="text-emerald-700 font-semibold italic">{surah.arti}</p>
        <p className="text-gray-500 text-xs mt-2 capitalize">
          {surah.jumlah_ayat} ayat • {surah.tempat_turun}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => navigateTo("read", surah)}
          className="flex-1 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-md hover:shadow-lg transition"
        >
          Baca
        </button>
        <button
          onClick={() => navigateTo("quiz-setup", surah)}
          className="flex-1 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-md hover:shadow-lg transition"
        >
          Kuis
        </button>
      </div>
    </div>
  );
}

function ReadPage({ surah, navigateTo }) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [playingAyah, setPlayingAyah] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(null);

  useEffect(() => {
    loadSurahDetail();
    return () => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.src = '';
      }
    };
  }, [surah.nomor]);

  const loadSurahDetail = async () => {
    try {
      setLoading(true);
      const data = await api.getSurahDetail(surah.nomor);
      setDetail(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading surah detail:', error);
      setLoading(false);
    }
  };

  const playAudio = (ayahNumber, audioUrl) => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.src = '';
    }

    if (playingAyah === ayahNumber) {
      setPlayingAyah(null);
      setCurrentAudio(null);
    } else {
      setPlayingAyah(ayahNumber);
      const audio = new Audio(audioUrl);
      setCurrentAudio(audio);
      audio.play().catch(e => console.error('Audio play error:', e));
      audio.onended = () => {
        setPlayingAyah(null);
        setCurrentAudio(null);
      };
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-emerald-700 font-semibold">Memuat ayat...</p>
        </div>
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Gagal memuat detail surah</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-xl p-8 mb-8 text-white">
        <button
          onClick={() => navigateTo('home')}
          className="flex items-center space-x-2 text-emerald-100 hover:text-white mb-4 transition"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          <span>Kembali</span>
        </button>
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-2">{detail.nama_latin}</h2>
          <p className="text-emerald-100 text-xl mb-2">{detail.arti}</p>
          <p className="text-emerald-200 text-sm">{detail.jumlah_ayat} Ayat • {detail.tempat_turun}</p>
        </div>
      </div>

      {detail.nomor !== 1 && detail.nomor !== 9 && (
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6 text-center">
          <p className="text-4xl text-emerald-700 font-arabic">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
        </div>
      )}

      <div className="space-y-6">
        {detail.ayat?.map((ayah) => (
          <AyahCard 
            key={ayah.nomor} 
            ayah={ayah} 
            playAudio={playAudio} 
            playingAyah={playingAyah} 
          />
        ))}
      </div>
    </div>
  );
}

function AyahCard({ ayah, playAudio, playingAyah }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-emerald-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
          {ayah.nomor}
        </div>
        {ayah.audio && (
          <button
            onClick={() => playAudio(ayah.nomor, ayah.audio)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
              playingAyah === ayah.nomor
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span className="text-sm">{playingAyah === ayah.nomor ? 'Memutar...' : 'Dengar'}</span>
          </button>
        )}
      </div>

      <p className="text-3xl text-right leading-loose mb-6 text-emerald-900 font-arabic">
        {ayah.ar}
      </p>

      <p className="text-gray-700 leading-relaxed border-t border-gray-200 pt-4">
        {ayah.idn}
      </p>
    </div>
  );
}

function QuizSetup({ onStart }) {
  const [type, setType] = useState("all");
  const [count, setCount] = useState(10);

  return (
    <div className="max-w-md mx-auto animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-8 text-center">
          <Settings className="w-16 h-16 mx-auto text-white mb-3" />
          <h2 className="text-3xl font-bold text-white mb-2">Pengaturan Kuis</h2>
          <p className="text-white/80">Atur preferensi kuis Anda</p>
        </div>

        <div className="p-8 space-y-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <Brain className="w-4 h-4" />
              Tipe Soal
            </label>
            <select
              className="w-full p-4 rounded-xl border-2 border-gray-200 bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 transition-all outline-none font-medium"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="all">🎲 Semua Tipe Soal (Acak)</option>
              <option value="next">➡️ Lanjutan Ayat</option>
              <option value="meaning">💬 Tebak Arti</option>
              <option value="arab">📝 Tebak Ayat Arab</option>
              <option value="number">🔢 Tebak Nomor Ayat</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <Hash className="w-4 h-4" />
              Jumlah Soal
            </label>
            <div className="grid grid-cols-4 gap-3">
              {[5, 10, 15, 20].map(num => (
                <button
                  key={num}
                  onClick={() => setCount(num)}
                  className={`p-4 rounded-xl font-bold text-lg transition-all ${
                    count === num
                      ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => onStart(type, count)}
            className="w-full flex items-center justify-center gap-3 p-5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <Play className="w-6 h-6" />
            Mulai Kuis
          </button>
        </div>
      </div>
    </div>
  );
}


function QuizPage({ surah, questionType, questionCount, navigateTo, updateScore }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answerFeedback, setAnswerFeedback] = useState(null);

  useEffect(() => {
    generateQuestions();
  }, [surah, questionType, questionCount]);

  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const generateQuestions = async () => {
    try {
      const detail = await api.getSurahDetail(surah.nomor);
      const ayat = detail.ayat;
      const q = [];
      const types = ["next", "meaning", "arab", "number"];

      for (let i = 0; i < questionCount; i++) {
        const type = questionType === "all" ? types[Math.floor(Math.random() * types.length)] : questionType;
        const random = Math.floor(Math.random() * ayat.length);
        const current = ayat[random];
        const next = ayat[random + 1] || ayat[0];
        const wrong = ayat.filter(a => a.nomor !== current.nomor).sort(() => Math.random() - 0.5).slice(0, 3);

        let soal = null;
        if (type === "next") {
          soal = { type: "next", question: "Apa lanjutan dari ayat berikut?", show: current.ar, correct: next.ar, options: shuffle([next.ar, ...wrong.map(a => a.ar)]) };
        }
        if (type === "meaning") {
          soal = { type: "meaning", question: "Apa arti dari ayat ini?", show: current.ar, correct: current.idn, options: shuffle([current.idn, ...wrong.map(a => a.idn)]) };
        }
        if (type === "arab") {
          soal = { type: "arab", question: "Manakah teks Arab dari arti berikut?", show: current.idn, correct: current.ar, options: shuffle([current.ar, ...wrong.map(a => a.ar)]) };
        }
        if (type === "number") {
          soal = { type: "number", question: "Ayat ke berapakah ini?", show: current.ar, correct: current.nomor.toString(), options: shuffle([current.nomor.toString(), ...wrong.map(a => a.nomor.toString())]) };
        }
        q.push(soal);
      }
      setQuestions(q);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAnswer = (answer) => {
    if (selectedAnswer !== null) return;

    const question = questions[currentQuestion];
    const correct = answer === question.correct;

    setSelectedAnswer(answer);
    setAnswerFeedback(correct);
    
    if (correct) setScore(score + 10);

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setAnswerFeedback(null);
      } else {
        const finalScore = correct ? score + 10 : score;
        setShowResult(true);
        updateScore(finalScore);
      }
    }, 1500);
  };

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-lg font-semibold text-emerald-700">Memuat kuis...</p>
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = (score / (questionCount * 10)) * 100;
    const isPerfect = percentage === 100;
    const isGood = percentage >= 70;
    
    return (
      <div className="max-w-lg mx-auto lightswind-fade-in">
        <div className="bg-white/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 overflow-hidden">
          <div className={`p-8 text-center relative overflow-hidden ${isPerfect ? 'bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400' : isGood ? 'bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400' : 'bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400'}`}>
            <div className="absolute inset-0 bg-white/10"></div>
            <div className="relative z-10">
              <div className="mb-4">
                {isPerfect ? (
                  <Sparkles className="w-20 h-20 mx-auto text-white lightswind-pulse" />
                ) : (
                  <Trophy className="w-20 h-20 mx-auto text-white" />
                )}
              </div>
              <h2 className="text-4xl font-bold text-white mb-2">
                {isPerfect ? 'Sempurna! 🌟' : isGood ? 'Hebat! 💪' : 'Bagus! 📚'}
              </h2>
              <p className="text-white/90 text-lg">Kuis Selesai</p>
            </div>
          </div>

          <div className="p-8">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 mb-6 border border-emerald-100">
              <div className="text-center mb-4">
                <div className="text-6xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                  {score}
                </div>
                <div className="text-gray-600 text-sm">dari {questionCount * 10} poin</div>
              </div>
              
              <div className="relative h-4 bg-emerald-200/30 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${isPerfect ? 'bg-gradient-to-r from-yellow-400 to-orange-400' : 'bg-gradient-to-r from-emerald-400 to-teal-400'}`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <div className="text-center mt-2 text-sm font-semibold text-emerald-700">
                {percentage.toFixed(0)}% Benar
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center">
                <CheckCircle2 className="w-8 h-8 mx-auto text-green-600 mb-2" />
                <div className="text-2xl font-bold text-green-700">{score / 10}</div>
                <div className="text-sm text-green-600">Benar</div>
              </div>
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center">
                <XCircle className="w-8 h-8 mx-auto text-red-600 mb-2" />
                <div className="text-2xl font-bold text-red-700">{questionCount - (score / 10)}</div>
                <div className="text-sm text-red-600">Salah</div>
              </div>
            </div>

            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-lg mb-6">
              <p className="text-emerald-800 text-sm font-medium">
                {isPerfect ? 'Luar biasa! Kamu menguasai materi dengan sempurna!' : isGood ? 'Bagus sekali! Terus tingkatkan pemahamanmu!' : 'Tetap semangat! Latihan membuat sempurna!'}
              </p>
            </div>

            <button
              onClick={() => navigateTo("home")}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              <Home className="w-5 h-5" />
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto lightswind-fade-in">
      
      {/* Header Stats Card - Lightswind Style */}
      <div className="bg-white/60 backdrop-blur-2xl rounded-2xl shadow-lg border border-white/40 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-emerald-900">{surah.nama_latin}</h3>
            <p className="text-sm text-gray-500">Pertanyaan {currentQuestion + 1} dari {questions.length}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{score}</div>
            <div className="text-xs text-gray-500 font-medium">Poin</div>
          </div>
        </div>

        {/* Lightswind Progress Bar */}
        <div className="relative h-3 bg-emerald-100/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 transition-all duration-500 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/30 lightswind-shimmer"></div>
          </div>
        </div>
      </div>

      {/* Question Card - Lightswind Glass Effect */}
      <div className="bg-white/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10"></div>
          <div className="relative z-10 flex items-center gap-3 text-white">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold">{currentQuestion + 1}</span>
            </div>
            <h2 className="text-xl font-semibold">{q.question}</h2>
          </div>
                  </div>

        <div className="p-8">

          {/* Arabic / Indonesian Text Bubble */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 
                          rounded-2xl p-8 mb-6 border border-emerald-100 shadow-inner">
            <p className="text-center text-4xl leading-loose font-arabic text-emerald-900"
               style={{ fontFamily: "'Amiri', 'Traditional Arabic', serif" }}>
              {q.show}
            </p>
          </div>

          {/* Feedback Animation */}
          {answerFeedback !== null && (
            <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 shadow-md lightswind-fade-in ${
              answerFeedback 
                ? 'bg-green-50 border border-green-300 text-green-700'
                : 'bg-red-50 border border-red-300 text-red-700'
            }`}>
              {answerFeedback ? (
                <>
                  <CheckCircle2 className="w-6 h-6" />
                  <span className="font-semibold">Jawaban Benar! +10 poin</span>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6" />
                  <span className="font-semibold">Jawaban Salah</span>
                </>
              )}
            </div>
          )}

          {/* OPTIONS */}
          <div className="space-y-4">
            {q.options.map((opt, idx) => {
              const correct = opt === q.correct;
              const selected = selectedAnswer === opt;

              let base = "w-full p-5 rounded-2xl border-2 transition-all duration-300 backdrop-blur-xl text-left shadow";
              let style =
                "bg-white/50 border-white/20 hover:bg-white/80 hover:border-emerald-300 hover:shadow-lg";

              if (selectedAnswer !== null) {
                if (correct) style = "bg-gradient-to-r from-green-50 to-emerald-100 border-green-400 shadow-lg";
                else if (selected && !correct) style = "bg-gradient-to-r from-red-50 to-red-100 border-red-400 shadow-lg";
                else style = "bg-white/30 border-gray-200 opacity-50";
              }

              return (
                <button
                  key={idx}
                  disabled={selectedAnswer !== null}
                  onClick={() => handleAnswer(opt)}
                  className={`${base} ${style} ${selectedAnswer === null ? 'hover:scale-[1.02]' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg border-2
                      ${selectedAnswer !== null && correct
                        ? 'bg-green-500 border-green-600 text-white'
                        : selectedAnswer !== null && selected && !correct
                        ? 'bg-red-500 border-red-600 text-white'
                        : 'bg-white/40 border-gray-300 text-gray-700'
                      }`}>
                      {String.fromCharCode(65 + idx)}
                    </div>

                    <span className="flex-1 text-gray-800">{opt}</span>

                    {selectedAnswer !== null && correct && (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    )}
                    {selectedAnswer !== null && selected && !correct && (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}



const style = document.createElement('style');
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap');
  
  .font-arabic {
    font-family: 'Amiri', serif;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out;
  }
`;
document.head.appendChild(style);