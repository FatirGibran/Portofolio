import React from 'react';
import { User, GraduationCap, MapPin, CheckCircle, Code, Award, Shield, Cpu, Terminal, Users } from 'lucide-react';

export default function About() {
  const stats = [
    { icon: <User className="w-5 h-5 text-pastel-blue-dark" />, label: 'Nama', val: 'Fatir Gibran' },
    { icon: <Award className="w-5 h-5 text-amber-600" />, label: 'Kepemimpinan', val: 'Chairman HMIF (2025/2026)' },
    { icon: <Code className="w-5 h-5 text-pastel-blue-dark" />, label: 'Fokus Peran', val: 'Full-Stack & Edge AI Engineer' },
    { icon: <GraduationCap className="w-5 h-5 text-pastel-blue-dark" />, label: 'Pendidikan', val: 'S1 Teknik Informatika' },
    { icon: <MapPin className="w-5 h-5 text-pastel-blue-dark" />, label: 'Kampus & Lokasi', val: 'Telkom University Purwokerto' },
  ];

  return (
    <section id="tentang" className="py-20 px-6 md:px-12 max-w-6xl mx-auto scroll-mt-12">
      <div className="text-center md:text-left mb-12">
        <h2 className="text-3xl md:text-4xl font-space text-pastel-navy inline-block relative">
          Tentang & Kepemimpinan
          <span className="absolute bottom-1 left-0 w-1/2 h-2 bg-pastel-blue/60 -z-10 rounded-full"></span>
        </h2>
        <p className="text-sm md:text-base text-pastel-navy/60 mt-2">
          Kombinasi antara kompetensi teknis rekayasa perangkat lunak dan kepemimpinan organisasi kemahasiswaan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Side: Stats Card */}
        <div className="md:col-span-5 bg-white border-2 border-pastel-peach rounded-3xl p-6 shadow-pastel-md hover:shadow-pastel-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-pastel-peach/40">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-pastel-yellow border border-pastel-yellow-hover"></span>
              <span className="text-xs font-bold font-space uppercase text-pastel-navy/60 tracking-wider">Identitas & Organisasi</span>
            </div>
            <span className="text-[10px] font-bold bg-pastel-yellow/80 border border-pastel-yellow-hover text-pastel-navy py-0.5 px-2.5 rounded-full">
              Executive Board
            </span>
          </div>

          <ul className="flex flex-col gap-4">
            {stats.map((stat, i) => (
              <li key={i} className="flex gap-4 items-start">
                <div className="p-2.5 rounded-2xl bg-pastel-peach/40 mt-0.5 shadow-pastel-sm">
                  {stat.icon}
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-pastel-navy/40 uppercase tracking-wider">{stat.label}</span>
                  <span className="text-sm font-bold text-pastel-navy leading-snug">{stat.val}</span>
                </div>
              </li>
            ))}
            <li className="flex gap-4 items-start pt-2">
              <div className="p-2.5 rounded-2xl bg-pastel-green/50 mt-0.5 shadow-pastel-sm">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <span className="block text-[11px] font-bold text-pastel-navy/40 uppercase tracking-wider">Status Studi</span>
                <span className="text-xs font-bold text-emerald-700 font-space bg-pastel-green/70 py-1 px-3 rounded-full inline-block mt-0.5">
                  AKTIF (Semester 5)
                </span>
              </div>
            </li>
          </ul>
        </div>

        {/* Right Side: Narrative & Pillars */}
        <div className="md:col-span-7 flex flex-col gap-6">
          <div className="bg-white border-2 border-pastel-blue rounded-3xl p-8 shadow-pastel-sm flex flex-col gap-4">
            <p className="text-base md:text-lg text-pastel-navy/80 leading-relaxed">
              Saya adalah mahasiswa S1 Teknik Informatika di <strong>Telkom University Purwokerto</strong> yang saat ini dipercaya sebagai <strong>Chairman (Ketua Himpunan) HMIF Telkom University Purwokerto (Periode 2025/2026)</strong>.
            </p>
            <p className="text-sm md:text-base text-pastel-navy/75 leading-relaxed">
              Dalam peran kepemimpinan ini, saya tidak hanya memimpin arah strategis organisasi, melainkan juga memodernisasi tata kelola birokrasi digital himpunan dengan membangun <strong>WEB_SECRETARY</strong> (otomasi penomoran dokumen resmi) dan <strong>project-eval</strong> (sistem penilaian KPI pengurus berbasis data).
            </p>
            <p className="text-sm md:text-base text-pastel-navy/75 leading-relaxed">
              Di sisi teknis, fokus saya terbagi pada 3 domain utama: <strong>On-Device Edge AI</strong> (seperti PostureLens & el_gestur_v2 yang memproses MediaPipe vision di peramban tanpa upload video), <strong>Keamanan Siber & Enkripsi Offline-First</strong> (seperti VaultSentinel dengan AES-128 Fernet & 95.8% test coverage), serta <strong>Pengembangan Full-Stack Modern</strong> (Next.js 15, FastAPI, Supabase Realtime).
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-pastel-blue/40 border border-pastel-blue/80 rounded-2xl p-3.5 text-center shadow-pastel-sm">
              <Cpu className="w-6 h-6 text-pastel-blue-dark mx-auto mb-1.5" />
              <span className="block font-bold text-xs text-pastel-navy">Edge AI</span>
            </div>
            <div className="bg-pastel-yellow/50 border border-pastel-yellow/80 rounded-2xl p-3.5 text-center shadow-pastel-sm">
              <Shield className="w-6 h-6 text-amber-700 mx-auto mb-1.5" />
              <span className="block font-bold text-xs text-pastel-navy">Cyber Security</span>
            </div>
            <div className="bg-pastel-green/50 border border-pastel-green/80 rounded-2xl p-3.5 text-center shadow-pastel-sm">
              <Terminal className="w-6 h-6 text-emerald-700 mx-auto mb-1.5" />
              <span className="block font-bold text-xs text-pastel-navy">Full-Stack Dev</span>
            </div>
            <div className="bg-pastel-purple/50 border border-pastel-purple/80 rounded-2xl p-3.5 text-center shadow-pastel-sm">
              <Users className="w-6 h-6 text-indigo-700 mx-auto mb-1.5" />
              <span className="block font-bold text-xs text-pastel-navy">HMIF Chairman</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
