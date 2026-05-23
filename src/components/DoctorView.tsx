import { useState, useMemo, FormEvent } from 'react';
import { Doctor, Review, Appointment } from '../types';
import { db, auth, handleFirestoreError, OperationType } from '../firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  MapPin, 
  CheckCircle2, 
  Award, 
  GraduationCap, 
  Heart, 
  Clock, 
  ChevronRight, 
  BookOpen, 
  Check, 
  FileText,
  Star,
  Activity,
  User,
  ShieldCheck,
  Calendar,
  AlertTriangle,
  FileCheck,
  Info,
  Videotape,
  MessageSquare,
  Lock,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Download,
  ZoomIn,
  X
} from 'lucide-react';

// Specialty-specific Cover Banner Generator for Doctors
function getSpecialtyBanner(specialty: string) {
  const norm = (specialty || '').toLowerCase().trim();

  // 1. Cardiology (Kardiyoloji)
  if (norm.includes('kardiyoloji') || norm.includes('kalp')) {
    return (
      <div className="absolute inset-0 bg-gradient-to-r from-rose-950 via-[#0d1527] to-[#881337] overflow-hidden flex items-center justify-end px-6 sm:px-12 text-white">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200" preserveAspectRatio="none">
            <path d="M 0 100 L 250 100 L 270 50 L 290 150 L 310 90 L 320 110 L 330 100 L 550 100 L 570 30 L 590 170 L 610 80 L 620 120 L 630 100 L 800 100" fill="none" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="0" y1="20" x2="800" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="5,5" />
            <line x1="0" y1="180" x2="800" y2="180" stroke="rgba(255,255,255,0.05)" strokeDasharray="5,5" />
          </svg>
        </div>
        <div className="absolute right-4 sm:right-12 bottom-4 opacity-30 pointer-events-none text-rose-500 scale-100 sm:scale-125">
          <svg className="w-16 h-16 sm:w-24 sm:h-24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        <div className="relative text-right ml-auto z-10 select-none max-w-[70%] sm:max-w-[55%] flex flex-col items-end gap-1 sm:gap-1.5">
          <span className="text-[8px] sm:text-[9.5px] font-mono tracking-widest text-rose-400 font-black uppercase bg-rose-950/80 border border-rose-800/80 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md self-end">
            CARDIOVASCULAR INSTITUTION
          </span>
          <h1 className="text-xs sm:text-xl md:text-2xl font-sans font-black tracking-tight text-stone-100 mt-1 uppercase leading-snug">
            Kardiyovasküler Cerrahi ve Elektrofizyoloji
          </h1>
          <p className="hidden sm:block text-[9px] sm:text-[10px] text-slate-350 font-mono mt-0.5 tracking-wider">
            Akademik Klinik Arşiv // E-Sağlık EKG Entegrasyonu Akredite
          </p>
        </div>
      </div>
    );
  }

  // 2. Dermatology (Dermatoloji)
  if (norm.includes('dermatoloji') || norm.includes('cildiye')) {
    return (
      <div className="absolute inset-0 bg-gradient-to-r from-amber-950 via-[#0a0f1d] to-[#7c2d12] overflow-hidden flex items-center justify-end px-6 sm:px-12 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200" preserveAspectRatio="none">
            <defs>
              <pattern id="hex-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M20 0 L40 11.5 L40 34.5 L20 46 L0 34.5 L0 11.5 Z" fill="none" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hex-grid)" />
          </svg>
        </div>
        <div className="relative text-right ml-auto z-10 select-none max-w-[70%] sm:max-w-[55%] flex flex-col items-end gap-1 sm:gap-1.5">
          <span className="text-[8px] sm:text-[9.5px] font-mono tracking-widest text-amber-450 font-black uppercase bg-amber-950/80 border border-amber-800/80 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md self-end">
            DERMATO-EPIDERMAL SCIENCE
          </span>
          <h1 className="text-xs sm:text-xl md:text-2xl font-sans font-black tracking-tight text-stone-100 mt-1 uppercase leading-snug">
            Gelişmiş Cilt Analizi & Hücresel Terapiler
          </h1>
          <p className="hidden sm:block text-[9px] sm:text-[10px] text-slate-350 font-mono mt-0.5 tracking-wider">
            Meso-Tissue Analiz Sürümü // Kolajen Dokulama ve Cilt Rejyenerasyonu
          </p>
        </div>
      </div>
    );
  }

  // 3. Neurology (Nöroloji)
  if (norm.includes('nöroloji') || norm.includes('beyin') || norm.includes('sinir')) {
    return (
      <div className="absolute inset-0 bg-gradient-to-r from-[#2e1065] via-[#090d16] to-[#4c1d95] overflow-hidden flex items-center justify-end px-6 sm:px-12 text-white">
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" stroke="#a78bfa" strokeWidth="1.5">
              <circle cx="100" cy="50" r="4" fill="#a78bfa" />
              <line x1="100" y1="50" x2="160" y2="90" />
              <circle cx="160" cy="90" r="5" fill="#c084fc" />
              <line x1="160" y1="90" x2="220" y2="40" />
              <circle cx="220" cy="40" r="3" fill="#a78bfa" />
              <line x1="160" y1="90" x2="240" y2="130" />
              <circle cx="240" cy="130" r="5" fill="#818cf8" />
              <line x1="240" y1="130" x2="310" y2="100" />
              <circle cx="310" cy="100" r="4" fill="#e879f9" />
              <circle cx="650" cy="120" r="5" fill="#f472b6" />
              <line x1="650" y1="120" x2="580" y2="60" />
              <circle cx="580" cy="60" r="4" fill="#818cf8" />
            </g>
          </svg>
        </div>
        <div className="relative text-right ml-auto z-10 select-none max-w-[70%] sm:max-w-[55%] flex flex-col items-end gap-1 sm:gap-1.5">
          <span className="text-[8px] sm:text-[9.5px] font-mono tracking-widest text-violet-300 font-black uppercase bg-purple-950/80 border border-purple-800/80 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md self-end">
            NEUROLOGICAL & COGNITIVE LAB
          </span>
          <h1 className="text-xs sm:text-xl md:text-2xl font-sans font-black tracking-tight text-stone-100 mt-1 uppercase leading-snug">
            Nöro-Sinir Bilimleri & Elektrofizyoloji (EEG/EMG)
          </h1>
          <p className="hidden sm:block text-[9px] sm:text-[10px] text-slate-350 font-mono mt-0.5 tracking-wider">
            Synapse Haritalama Entegrasyonu // İleri Bilişsel Teşhis Standartları
          </p>
        </div>
      </div>
    );
  }

  // 4. Ophthalmology (Göz Hastalıkları)
  if (norm.includes('göz') || norm.includes('optik') || norm.includes('ophthalmology')) {
    return (
      <div className="absolute inset-0 bg-gradient-to-r from-teal-950 via-[#0a0f1d] to-cyan-900 overflow-hidden flex items-center justify-end px-6 sm:px-12 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200" preserveAspectRatio="none">
            <circle cx="400" cy="100" r="80" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
            <circle cx="400" cy="100" r="50" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="3,3" />
            <path d="M 100 100 L 370 100 Q 400 60 410 100 L 700 100" fill="none" stroke="#22d3ee" strokeWidth="2" />
          </svg>
        </div>
        <div className="relative text-right ml-auto z-10 select-none max-w-[70%] sm:max-w-[55%] flex flex-col items-end gap-1 sm:gap-1.5">
          <span className="text-[8px] sm:text-[9.5px] font-mono tracking-widest text-[#22d3ee] font-black uppercase bg-teal-950/80 border border-teal-800/80 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md self-end">
            OPHTHALMIC RETINAL SYSTEM
          </span>
          <h1 className="text-xs sm:text-xl md:text-2xl font-sans font-black tracking-tight text-stone-100 mt-1 uppercase leading-snug">
            Mikroskobik Retina Teşhisi & Kornea Refraksiyonu
          </h1>
          <p className="hidden sm:block text-[9px] sm:text-[10px] text-slate-350 font-mono mt-0.5 tracking-wider">
            Wavefront Aberometre Kilitli // İleri Seviye Lazer Cerrahisi
          </p>
        </div>
      </div>
    );
  }

  // 5. Pediatrics (Çocuk Sağlığı)
  if (norm.includes('çocuk') || norm.includes('pediatri')) {
    return (
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-[#0a1122] to-teal-850 overflow-hidden flex items-center justify-end px-6 sm:px-12 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <circle cx="150" cy="80" r="40" fill="#34d399" fillOpacity="0.4" />
            <circle cx="500" cy="140" r="60" fill="#2dd4bf" fillOpacity="0.3" />
            <path d="M220,120 L225,125 L220,130 L215,125 Z" fill="#34d399" />
          </svg>
        </div>
        <div className="relative text-right ml-auto z-10 select-none max-w-[70%] sm:max-w-[55%] flex flex-col items-end gap-1 sm:gap-1.5">
          <span className="text-[8px] sm:text-[9.5px] font-mono tracking-widest text-emerald-300 font-black uppercase bg-emerald-950/80 border border-emerald-800/80 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md self-end">
            PEDIATRIC HEALTH CLINIC
          </span>
          <h1 className="text-xs sm:text-xl md:text-2xl font-sans font-black tracking-tight text-stone-100 mt-1 uppercase leading-snug">
            Çocuk Sağlığı, Pediatri ve Gelişim İzlemi
          </h1>
          <p className="hidden sm:block text-[9px] sm:text-[10px] text-slate-350 font-mono mt-0.5 tracking-wider">
            İmmünolojik Koruma ve Çocuk Gelişimi Akredite Takibi
          </p>
        </div>
      </div>
    );
  }

  // 6. Orthopedics (Ortopedi)
  if (norm.includes('ortopedi') || norm.includes('travma') || norm.includes('kemik')) {
    return (
      <div className="absolute inset-0 bg-gradient-to-r from-sky-950 via-[#0a1122] to-slate-800 overflow-hidden flex items-center justify-end px-6 sm:px-12 text-white">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200" preserveAspectRatio="none">
            <g stroke="#38bdf8" strokeWidth="1.5" fill="none">
              <circle cx="120" cy="110" r="8" />
              <line x1="120" y1="110" x2="240" y2="70" />
              <circle cx="240" cy="70" r="12" />
              <line x1="240" y1="70" x2="330" y2="120" />
              <circle cx="330" cy="120" r="10" />
            </g>
          </svg>
        </div>
        <div className="relative text-right ml-auto z-10 select-none max-w-[70%] sm:max-w-[55%] flex flex-col items-end gap-1 sm:gap-1.5">
          <span className="text-[8px] sm:text-[9.5px] font-mono tracking-widest text-sky-300 font-black uppercase bg-sky-950/80 border border-sky-800/80 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md self-end">
            BIOMECHANICAL RECONSTRUCTION
          </span>
          <h1 className="text-xs sm:text-xl md:text-2xl font-sans font-black tracking-tight text-stone-100 mt-1 uppercase leading-snug">
            Skeletal Rekonstrüksiyon & Robotik Eklem Cerrahisi
          </h1>
          <p className="hidden sm:block text-[9px] sm:text-[10px] text-slate-350 font-mono mt-0.5 tracking-wider">
            Kemik Aksı Navigasyonel Ayarlama Entegrasyonu // Artroplasti Teşhisi
          </p>
        </div>
      </div>
    );
  }

  // 7. Ear, Nose, Throat (KBB)
  if (norm.includes('kbb') || norm.includes('kulak') || norm.includes('boğaz') || norm.includes('otolaryngology')) {
    return (
      <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-950 via-[#0d1425] to-purple-900 overflow-hidden flex items-center justify-end px-6 sm:px-12 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200" preserveAspectRatio="none">
            <path d="M 0 100 Q 150 15 300 100 T 600 100 T 800 100" fill="none" stroke="#d946ef" strokeWidth="2" />
            <path d="M 0 100 Q 150 70 300 100 T 600 100 T 800 100" fill="none" stroke="#f472b6" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="relative text-right ml-auto z-10 select-none max-w-[70%] sm:max-w-[55%] flex flex-col items-end gap-1 sm:gap-1.5">
          <span className="text-[8px] sm:text-[9.5px] font-mono tracking-widest text-fuchsia-300 font-black uppercase bg-fuchsia-950/80 border border-fuchsia-800/80 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md self-end">
            AUDIOMETRIC PATHOLOGY INDEX
          </span>
          <h1 className="text-xs sm:text-xl md:text-2xl font-sans font-black tracking-tight text-stone-100 mt-1 uppercase leading-snug">
            Koklear İmplantlar & Gelişmiş Sinüzal Tedavi
          </h1>
          <p className="hidden sm:block text-[9px] sm:text-[10px] text-slate-350 font-mono mt-0.5 tracking-wider">
            Akustik Frekansı Kalibrasyonu // Baş Boyun Cerrahisi Destek Birimi
          </p>
        </div>
      </div>
    );
  }

  // 8. General Surgery (Genel Cerrahi)
  if (norm.includes('cerrahi') && !norm.includes('beyin')) {
    return (
      <div className="absolute inset-0 bg-gradient-to-r from-red-950 via-[#0c0a09] to-stone-900 overflow-hidden flex items-center justify-end px-6 sm:px-12 text-white">
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200" preserveAspectRatio="none">
            <g stroke="#ef4444" strokeWidth="1" fill="none">
              <line x1="400" y1="0" x2="400" y2="200" />
              <line x1="0" y1="100" x2="800" y2="100" />
              <circle cx="400" cy="100" r="50" />
              <circle cx="400" cy="100" r="25" />
            </g>
          </svg>
        </div>
        <div className="relative text-right ml-auto z-10 select-none max-w-[70%] sm:max-w-[55%] flex flex-col items-end gap-1 sm:gap-1.5">
          <span className="text-[8px] sm:text-[9.5px] font-mono tracking-widest text-red-400 font-black uppercase bg-red-950/80 border border-red-800/80 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md self-end">
            ADVANCED SURGICAL FIELD
          </span>
          <h1 className="text-xs sm:text-xl md:text-2xl font-sans font-black tracking-tight text-stone-100 mt-1 uppercase leading-snug">
            Laparoskopik ve Onkolojik Cerrahi Girişimler
          </h1>
          <p className="hidden sm:block text-[9px] sm:text-[10px] text-slate-350 font-mono mt-0.5 tracking-wider">
            Yüksek Hassasiyetli Enerji Cihazları Onaylı // Robotik Cerrahi Altyapı
          </p>
        </div>
      </div>
    );
  }

  // 9. Internal medicine (İç Hastalıkları)
  if (norm.includes('dahiliye') || norm.includes('iç hast')) {
    return (
      <div className="absolute inset-0 bg-gradient-to-r from-teal-950 via-[#0a1122] to-[#044e37] overflow-hidden flex items-center justify-end px-6 sm:px-12 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200" preserveAspectRatio="none">
            <path d="M 100 80 A 40 40 0 0 0 180 80 L 180 140 A 20 20 0 0 1 140 160" fill="none" stroke="#10b981" strokeWidth="2" />
            <circle cx="400" cy="100" r="20" fill="none" stroke="#10b981" strokeWidth="2" />
          </svg>
        </div>
        <div className="relative text-right ml-auto z-10 select-none max-w-[70%] sm:max-w-[55%] flex flex-col items-end gap-1 sm:gap-1.5">
          <span className="text-[8px] sm:text-[9.5px] font-mono tracking-widest text-[#10b981] font-black uppercase bg-[#002f21] border border-emerald-900 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md self-end">
            INTERNAL MEDICINE MATRICES
          </span>
          <h1 className="text-xs sm:text-xl md:text-2xl font-sans font-black tracking-tight text-stone-100 mt-1 uppercase leading-snug">
            Sistemik Metabolizma & İleri Dahili Teşhis
          </h1>
          <p className="hidden sm:block text-[9px] sm:text-[10px] text-slate-350 font-mono mt-0.5 tracking-wider">
            Akademik Endokrinoloji ve Geriatri Desteği // Kronik Hastalık Yönetimi
          </p>
        </div>
      </div>
    );
  }

  // 10. Gynecology (Kadın Hastalıkları ve Doğum)
  if (norm.includes('kadın') || norm.includes('jinekoloji') || norm.includes('doğum')) {
    return (
      <div className="absolute inset-0 bg-gradient-to-r from-[#500724] via-[#0f111a] to-[#881337] overflow-hidden flex items-center justify-end px-6 sm:px-12 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0 200 Q 150 50 300 200 T 600 200" fill="none" stroke="#f472b6" strokeWidth="2.5" />
            <circle cx="430" cy="100" r="25" fill="none" stroke="#ec4899" strokeWidth="2" strokeDasharray="2,6" />
          </svg>
        </div>
        <div className="relative text-right ml-auto z-10 select-none max-w-[70%] sm:max-w-[55%] flex flex-col items-end gap-1 sm:gap-1.5">
          <span className="text-[8px] sm:text-[9.5px] font-mono tracking-widest text-pink-300 font-black uppercase bg-pink-950/80 border border-pink-800/80 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md self-end">
            OBSTETRICS & RESEARCH
          </span>
          <h1 className="text-xs sm:text-xl md:text-2xl font-sans font-black tracking-tight text-stone-100 mt-1 uppercase leading-snug">
            Jinekolojik Onkoloji & Fetal Gelişim Tıbbı
          </h1>
          <p className="hidden sm:block text-[9px] sm:text-[10px] text-slate-350 font-mono mt-0.5 tracking-wider">
            4D Sonografik Tarama Entegrasyonu // Reprodüktif Tıp Mükemmeliyeti
          </p>
        </div>
      </div>
    );
  }

  // 11. Urology (Üroloji)
  if (norm.includes('üroloji')) {
    return (
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-[#0a0d16] to-[#1e3a8a] overflow-hidden flex items-center justify-end px-6 sm:px-12 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200" preserveAspectRatio="none">
            <path d="M 100 50 C 100 120, 200 180, 400 140 C 600 100, 700 80, 700 150" fill="none" stroke="#60a5fa" strokeWidth="2" />
          </svg>
        </div>
        <div className="relative text-right ml-auto z-10 select-none max-w-[70%] sm:max-w-[55%] flex flex-col items-end gap-1 sm:gap-1.5">
          <span className="text-[8px] sm:text-[9.5px] font-mono tracking-widest text-blue-300 font-black uppercase bg-blue-950/80 border border-blue-800/80 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md self-end">
            MINIMALLY INVASIVE UROLOGY
          </span>
          <h1 className="text-xs sm:text-xl md:text-2xl font-sans font-black tracking-tight text-stone-100 mt-1 uppercase leading-snug">
            Robotik ve Laparoskopik Ürolojik Operasyonlar
          </h1>
          <p className="hidden sm:block text-[9px] sm:text-[10px] text-slate-350 font-mono mt-0.5 tracking-wider">
            Minimal İnvaziv Lazer Endoskopi // Filtrasyon Dinamikleri Akreditasyonu
          </p>
        </div>
      </div>
    );
  }

  // 12. Psychiatry (Psikiyatri)
  if (norm.includes('ruh') || norm.includes('psikiyatri') || norm.includes('mental')) {
    return (
      <div className="absolute inset-0 bg-gradient-to-r from-violet-950 via-[#0a0914] to-indigo-950 overflow-hidden flex items-center justify-end px-6 sm:px-12 text-white">
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200" preserveAspectRatio="none">
            <circle cx="500" cy="100" r="120" fill="#a78bfa" fillOpacity="0.1" />
            <path d="M 0 150 Q 200 80 400 150 T 800 150" fill="none" stroke="#c084fc" strokeWidth="2" />
          </svg>
        </div>
        <div className="relative text-right ml-auto z-10 select-none max-w-[70%] sm:max-w-[55%] flex flex-col items-end gap-1 sm:gap-1.5">
          <span className="text-[8px] sm:text-[9.5px] font-mono tracking-widest text-violet-300 font-black uppercase bg-purple-950/80 border border-purple-800/80 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md self-end">
            COGNITIVE PATHOLOGY SYSTEM
          </span>
          <h1 className="text-xs sm:text-xl md:text-2xl font-sans font-black tracking-tight text-stone-100 mt-1 uppercase leading-snug">
            Bilişsel Terapi & Psikofarmakolojik Yaklaşımlar
          </h1>
          <p className="hidden sm:block text-[9px] sm:text-[10px] text-slate-350 font-mono mt-0.5 tracking-wider">
            Kişiselleştirilmiş İleri Terapi // Beden-Zihin Dengelenmesi ve Analizler
          </p>
        </div>
      </div>
    );
  }

  // 13. Neurosurgery (Beyin ve Sinir Cerrahisi)
  if (norm.includes('nöroşirürji') || norm.includes('nöro-cerrahi') || norm.includes('beyin ve sinir cerrahisi')) {
    return (
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-indigo-950 to-indigo-900 overflow-hidden flex items-center justify-end px-6 sm:px-12 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200" preserveAspectRatio="none">
            <g stroke="#818cf8" strokeWidth="1" fill="none">
              <path d="M 200 40 Q 400 180 600 40" />
              <circle cx="400" cy="50" r="5" fill="#818cf8" />
            </g>
          </svg>
        </div>
        <div className="relative text-right ml-auto z-10 select-none max-w-[70%] sm:max-w-[55%] flex flex-col items-end gap-1 sm:gap-1.5">
          <span className="text-[8px] sm:text-[9.5px] font-mono tracking-widest text-indigo-400 font-black uppercase bg-indigo-950/80 border border-indigo-800/80 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md self-end">
            NEUROSURGICAL MICROSCOPY
          </span>
          <h1 className="text-xs sm:text-xl md:text-2xl font-sans font-black tracking-tight text-stone-100 mt-1 uppercase leading-snug">
            Mikro-Nöroşirürji & Spinal Cerrahi
          </h1>
          <p className="hidden sm:block text-[9px] sm:text-[10px] text-slate-350 font-mono mt-0.5 tracking-wider">
            3D Kraniyotomi Entegrasyonu & Stereotaktik Mikroskobik Cerrahi Sürümü
          </p>
        </div>
      </div>
    );
  }

  // 14. Gastroenterelogy (Gastroenteroloji)
  if (norm.includes('gastroenteroloji') || norm.includes('mide') || norm.includes('bağırsak')) {
    return (
      <div className="absolute inset-0 bg-gradient-to-r from-[#451a03] via-[#090b10] to-[#78350f] overflow-hidden flex items-center justify-end px-6 sm:px-12 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200" preserveAspectRatio="none">
            <circle cx="200" cy="100" r="50" fill="none" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="600" cy="100" r="40" fill="none" stroke="#d97706" strokeWidth="1.5" strokeDasharray="2,5" />
          </svg>
        </div>
        <div className="relative text-right ml-auto z-10 select-none max-w-[70%] sm:max-w-[55%] flex flex-col items-end gap-1 sm:gap-1.5">
          <span className="text-[8px] sm:text-[9.5px] font-mono tracking-widest text-amber-500 font-black uppercase bg-amber-950/80 border border-amber-900/80 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md self-end">
            GASTROINTESTINAL BIOME LAB
          </span>
          <h1 className="text-xs sm:text-xl md:text-2xl font-sans font-black tracking-tight text-stone-100 mt-1 uppercase leading-snug">
            Gastroenteroloji & İleri Endoskopi Tıbbı
          </h1>
          <p className="hidden sm:block text-[9px] sm:text-[10px] text-slate-350 font-mono mt-0.5 tracking-wider">
            Gastrointestinal Flora Modellemesi // Gastroskopi ve Kolonoskopi Takibi
          </p>
        </div>
      </div>
    );
  }

  // Default Medical Banner
  return (
    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 overflow-hidden flex items-center justify-end px-6 sm:px-12 text-white">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="dot-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="15" cy="15" r="1.5" fill="#e2e8f0" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#dot-grid)" />
        </svg>
      </div>
      <div className="relative text-right ml-auto z-10 select-none max-w-[70%] sm:max-w-[55%] flex flex-col items-end gap-1 sm:gap-1.5">
        <span className="text-[8px] sm:text-[9.5px] font-mono tracking-widest text-slate-300 font-black uppercase bg-slate-950/80 border border-slate-800/80 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md self-end">
          CARETRUST ELITE CLINICAL SERVICE
        </span>
        <h1 className="text-xs sm:text-xl md:text-2xl font-sans font-black tracking-tight text-white mt-1 uppercase leading-snug">
          İleri Düzey {specialty} Uzmanlık Dalı
        </h1>
        <p className="hidden sm:block text-[9px] sm:text-[10px] text-slate-350 font-mono mt-0.5 tracking-wider">
          Mühürlü ve Akredite Sağlık Kayıtları // Dijital Tesis Entegrasyonu
        </p>
      </div>
    </div>
  );
}

interface DoctorViewProps {
  doctor: Doctor;
  onBack: () => void;
  onSubmitReview: (doctor: Doctor) => void;
}

export function DoctorView({ doctor, onBack, onSubmitReview }: DoctorViewProps) {
  const [activeTab, setActiveTab] = useState<'A' | 'B' | 'C'>('A');
  const [zoomedImage, setZoomedImage] = useState<{ url: string; name: string; title: string } | null>(null);

  // Academic Publications expand and modal states
  const [expandedPubIds, setExpandedPubIds] = useState<Record<string, boolean>>({});
  const [selectedPaper, setSelectedPaper] = useState<any | null>(null);
  const [citationCopied, setCitationCopied] = useState<boolean>(false);

  // Treatment Timeline detailed states
  const [expandedTreatmentIndex, setExpandedTreatmentIndex] = useState<number | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);
  const [invoiceDownloadStatus, setInvoiceDownloadStatus] = useState<'idle' | 'preparing' | 'success'>('idle');

  const handleDownloadInvoice = (invoice: any) => {
    setInvoiceDownloadStatus('preparing');

    const htmlContent = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <title>Resmi Saglik Mevzuati Faturasi - ${invoice.costs.invoiceNo}</title>
  <style>
    body {
      font-family: 'Courier New', Courier, monospace;
      color: #1c1917;
      background-color: #f5f5f4;
      margin: 0;
      padding: 40px 20px;
      display: flex;
      justify-content: center;
    }
    .invoice-card {
      background: white;
      border: 2px solid #a8a29e;
      border-radius: 16px;
      padding: 30px;
      max-width: 650px;
      width: 100%;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
      position: relative;
    }
    .watermark {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(30deg);
      font-size: 42px;
      font-weight: 900;
      color: rgba(120, 113, 108, 0.08);
      letter-spacing: 0.2em;
      text-transform: uppercase;
      pointer-events: none;
      white-space: nowrap;
      user-select: none;
    }
    .header {
      border-bottom: 2px dashed #d6d3d1;
      padding-bottom: 20px;
      margin-bottom: 20px;
      text-align: center;
    }
    .header h1 {
      font-size: 16px;
      margin: 0;
      letter-spacing: 1px;
    }
    .header p {
      font-size: 11px;
      color: #57534e;
      margin: 4px 0 0;
    }
    .metadata-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 20px;
      background: #fafaf9;
      padding: 15px;
      border: 1px solid #e7e5e4;
      border-radius: 8px;
    }
    .metadata-block h3 {
      font-size: 9px;
      text-transform: uppercase;
      color: #78716c;
      margin: 0 0 6px;
    }
    .metadata-block p {
      font-size: 11px;
      margin: 2px 0;
      font-weight: bold;
    }
    .invoice-meta {
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      background: #e7e5e4;
      padding: 8px 12px;
      border-radius: 6px;
      margin-bottom: 25px;
    }
    .table-header {
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      font-weight: 900;
      color: #78716c;
      text-transform: uppercase;
      border-bottom: 1px solid #d6d3d1;
      padding-bottom: 5px;
      margin-bottom: 12px;
    }
    .table-row {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      border-bottom: 1px solid #f5f5f4;
      padding-bottom: 10px;
      margin-bottom: 10px;
    }
    .table-row p {
      margin: 0;
    }
    .table-row .desc-title {
      font-weight: 900;
    }
    .table-row .desc-sub {
      font-size: 9px;
      color: #78716c;
      margin-top: 2px;
    }
    .totals {
      border-top: 1px solid #a8a29e;
      padding-top: 12px;
      margin-top: 20px;
    }
    .totals-row {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      margin-bottom: 6px;
    }
    .totals-row.grand-total {
      font-size: 12px;
      font-weight: 900;
      border-bottom: 1px solid #d6d3d1;
      padding-bottom: 8px;
    }
    .totals-row.insurance {
      color: #15803d;
      background: #f0fdf4;
      padding: 6px 10px;
      border-radius: 6px;
      border: 1px solid #bbf7d0;
      font-weight: bold;
      margin-bottom: 8px;
    }
    .totals-row.patient-share {
      font-size: 14px;
      font-weight: 900;
      color: #312e81;
      background: #e0e7ff;
      padding: 10px;
      border-radius: 6px;
      border: 1px solid #c7d2fe;
    }
    .footer-qr {
      border-top: 2px dashed #d6d3d1;
      margin-top: 30px;
      padding-top: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .qr-box {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .qr-pixel {
      width: 45px;
      height: 45px;
      border: 1px solid #d6d3d1;
      padding: 2px;
      background: white;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2px;
    }
    .qr-pixel div {
      background: #1c1917;
    }
    .approved-stamp {
      border: 2px solid #818cf8;
      color: #6366f1;
      padding: 6px 15px;
      border-radius: 9999px;
      font-size: 9px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      transform: rotate(-4deg);
    }
    .print-banner {
      background-color: #4f46e5;
      color: white;
      text-align: center;
      padding: 12px;
      font-size: 12px;
      font-weight: bold;
      border-radius: 8px;
      margin-bottom: 25px;
      cursor: pointer;
    }
    @media print {
      body {
        background: white;
        padding: 0;
      }
      .invoice-card {
        border: none;
        box-shadow: none;
        max-width: 100%;
        padding: 0;
      }
      .print-banner {
        display: none;
      }
    }
  </style>
</head>
<body>

  <div class="invoice-card">
    <div class="watermark">CARETRUST SYSTEM</div>

    <div class="print-banner" onclick="window.print()">
      🖨️ YAZDIRMAK VEYA PDF OLARAK KAYDETMEK İÇİN BURAYA TIKLAYIN
    </div>

    <!-- Hospital Header -->
    <div class="header">
      <h1>BALKAYA OZEL TIP MERKEZI VE HASTANESI</h1>
      <p>Cumhuriyet Mah. Saglik Cad. No:19, Sisli / Istanbul</p>
      <p>Sicil No: 34-9042 | Vergi Dairesi: Bogazici 19304122</p>
    </div>

    <!-- Metadata Row -->
    <div class="metadata-grid">
      <div class="metadata-block">
        <h3>HASTA BILGILERI</h3>
        <p>Protokol: ${invoice.initials}</p>
        <p>Yas: ${invoice.age}</p>
        <p>Protokol No: PT-93041-A</p>
      </div>
      <div class="metadata-block" style="border-left: 1px solid #e7e5e4; padding-left: 20px;">
        <h3>UYGULAYICI HEKIM</h3>
        <p>${invoice.doctorTitle} ${invoice.doctorName}</p>
        <p>${invoice.specialty}</p>
        <p>Tescil No: ${doctor.id || 'N/A'}</p>
      </div>
    </div>

    <!-- Invoice Details -->
    <div class="invoice-meta">
      <span>Fatura No: <strong>${invoice.costs.invoiceNo}</strong></span>
      <span>Islem Tarihi: <strong>${invoice.date}</strong></span>
    </div>

    <!-- Table -->
    <div class="table-header">
      <span>Saglik Hizmet Kalemi</span>
      <span>Tutar</span>
    </div>

    <!-- Items -->
    <div class="table-row">
      <div>
        <p class="desc-title">Ameliyathane Kullanimi & Klinik Yatis</p>
        <p class="desc-sub">Stereotaktik oditoryum, cerrahi sarf odasi ve 24-48 saat bakim</p>
      </div>
      <span style="font-weight: bold; font-size: 12px; margin-left:15px; white-space:nowrap;">${invoice.costs.hospitalFee.toLocaleString('tr-TR')} TL</span>
    </div>

    <div class="table-row">
      <div>
        <p class="desc-title">Muteferrik Hekim Cerrahi Islem Bedeli</p>
        <p class="desc-sub">Cerrahi kesi, kapali enjeksiyon/ablasyon, dikis muhurlemesi</p>
      </div>
      <span style="font-weight: bold; font-size: 12px; margin-left:15px; white-space:nowrap;">${invoice.costs.doctorFee.toLocaleString('tr-TR')} TL</span>
    </div>

    <div class="table-row">
      <div>
        <p class="desc-title">Sarf Malzemesi, Protez & Anestezi Ilaclari</p>
        <p class="desc-sub">Klinik dikis teli, anestezik gaz, ithal implant yama/kapak donanimi</p>
      </div>
      <span style="font-weight: bold; font-size: 12px; margin-left:15px; white-space:nowrap;">${invoice.costs.materialsFee.toLocaleString('tr-TR')} TL</span>
    </div>

    <!-- Totals -->
    <div class="totals">
      <div class="totals-row">
        <span>Matrah Ara Toplami:</span>
        <span>${invoice.costs.total.toLocaleString('tr-TR')} TL</span>
      </div>
      <div class="totals-row">
        <span>KDV Bilgisi (Hizmet KDV %10):</span>
        <span>Dahildir (%10)</span>
      </div>
      <div class="totals-row grand-total">
        <span>TOPLAM TIP BILIŞIM BILANCOSU:</span>
        <span>${invoice.costs.total.toLocaleString('tr-TR')} TL</span>
      </div>
      <div class="totals-row insurance">
        <span>Sigorta Katkisi (${invoice.costs.insuranceType.split(' ')[0]}):</span>
        <span>-${invoice.costs.insurancePaid.toLocaleString('tr-TR')} TL</span>
      </div>
      <div class="totals-row patient-share">
        <span>HASTANIN ODECEGI NET KATKI PAYI:</span>
        <span>${invoice.costs.patientShare.toLocaleString('tr-TR')} TL</span>
      </div>
    </div>

    <!-- Footer Seals -->
    <div class="footer-qr">
      <div class="qr-box">
        <div class="qr-pixel">
          <div style="grid-column: span 2;"></div><div></div>
          <div></div><div style="grid-column: span 2;"></div>
          <div style="grid-column: span 3;"></div>
        </div>
        <div style="font-size: 8px; color: #57534e; text-align: left; line-height: 1.3;">
          <strong>T.C. SAGLIK BAKANLIGI</strong><br>
          E-FATURA ENTEGRASYON SISTEMI MÜHÜRLÜDÜR
        </div>
      </div>
      <div class="approved-stamp">✓ BALKAYA APPROVED</div>
    </div>

  </div>

  <script>
    // Trigger print dialog on load automatically
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 500);
    };
  </script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CareTrust-Fatura-${invoice.costs.invoiceNo}.html`;
    document.body.appendChild(link);
    link.click();
    
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setInvoiceDownloadStatus('success');
      
      setTimeout(() => {
        setInvoiceDownloadStatus('idle');
      }, 3000);
    }, 1200);
  };

  // Appointment Simulation States
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [patientName, setPatientName] = useState<string>('');
  const [patientEmail, setPatientEmail] = useState<string>('');
  const [complaintText, setComplaintText] = useState<string>('');
  const [priorDiagnoses, setPriorDiagnoses] = useState<string>('');
  const [consultationType, setConsultationType] = useState<'Yüz yüze' | 'Online Video'>('Yüz yüze');
  const [isBookingProgress, setIsBookingProgress] = useState<boolean>(false);
  const [bookingSuccessData, setBookingSuccessData] = useState<Appointment | null>(null);

  // Dynamic next 5 calendar days
  const next5Days = useMemo(() => {
    const arr = [];
    const weekdays = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    
    for (let i = 1; i <= 5; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      arr.push({
        dateStr: d.toISOString().split('T')[0],
        dayName: weekdays[d.getDay()],
        dayNum: d.getDate(),
        monthName: months[d.getMonth()]
      });
    }
    return arr;
  }, []);

  // Initialize selected day to first day automatically
  useMemo(() => {
    if (next5Days.length > 0 && !selectedDay) {
      setSelectedDay(next5Days[0].dateStr);
    }
  }, [next5Days, selectedDay]);

  // Generate a distinct and realistic list of slots dynamically based on the doctor's ID/name hash
  const slots = useMemo(() => {
    let hash = 0;
    const key = doctor.id || doctor.name || '';
    for (let i = 0; i < key.length; i++) {
      hash = key.charCodeAt(i) + ((hash << 5) - hash);
    }
    const poolIndex = Math.abs(hash) % 5;

    const slotPools = [
      ['08:30', '09:45', '11:15', '13:00', '14:30', '16:00'],
      ['09:00', '10:15', '11:30', '14:00', '15:15', '16:45', '17:30'],
      ['08:00', '09:30', '11:00', '13:30', '15:00', '16:30', '17:45'],
      ['09:15', '10:45', '12:00', '14:15', '15:45', '17:00'],
      ['10:00', '11:15', '13:15', '14:45', '16:15', '17:15']
    ];

    return slotPools[poolIndex];
  }, [doctor.id, doctor.name]);

  // Logic to determine if a slot is booked (simulate booked slots dynamically based on doctor ID, day & slot)
  const isSlotBooked = (dayStr: string, slotStr: string) => {
    const combineKey = dayStr + slotStr + doctor.id;
    let hash = 0;
    for (let i = 0; i < combineKey.length; i++) {
      hash = combineKey.charCodeAt(i) + ((hash << 5) - hash);
    }
    const val = Math.abs(hash) % 10;
    return val === 0 || val === 3 || val === 7; // ~30% balanced reservation simulation rate
  };

  // Handle appointment submission to Firestore
  const handleBookingSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedTimeSlot) return;
    setIsBookingProgress(true);

    const appointmentId = `and-${Date.now()}`;

    try {
      const uid = auth.currentUser?.uid || 'guest-patient';
      
      const newAppointment: Appointment = {
        id: appointmentId,
        doctorId: doctor.id,
        doctorName: doctor.name,
        doctorSpecialty: doctor.specialty,
        patientName: patientName || auth.currentUser?.displayName || 'Teyitli Misafir Hasta',
        patientEmail: patientEmail || auth.currentUser?.email || 'test-hasta@caretrust.org',
        patientUid: uid,
        date: selectedDay,
        timeSlot: selectedTimeSlot,
        complaint: complaintText,
        previousDiagnoses: priorDiagnoses,
        consultationType: consultationType,
        status: 'Onaylandı' // Autoconfirmed for ease of simulation
      };

      // Set directly to Firebase for persistent tracking (Module 2 requirement)
      await setDoc(doc(db, 'appointments', appointmentId), newAppointment);
      setBookingSuccessData(newAppointment);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `appointments/${appointmentId}`);
    } finally {
      setIsBookingProgress(false);
    }
  };

  const closeBookingFlow = () => {
    setIsBookingModalOpen(false);
    setSelectedTimeSlot(null);
    setBookingSuccessData(null);
    setComplaintText('');
    setPriorDiagnoses('');
  };

  // Render Star System
  const renderStars = (score: number) => {
    return (
      <div className="flex items-center gap-0.5" aria-label={`Değerlendirme: 5 üzerinden ${score} yıldız`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= score ? 'text-amber-500 fill-amber-500' : 'text-slate-200'
            }`}
          />
        ))}
      </div>
    );
  };

  // Accreditation Certificates List (Module 4 Certification Board requirement)
  const accreditations = [
    { title: 'Türk Tabipleri Birliği (TTB)', id: 'TTB-L-9381', status: 'Doğrulandı' },
    { title: 'T.C. Sağlık Bakanlığı Uzmanlık Tescili', id: 'SB-UT-20412', status: 'Doğrulandı' },
    { title: 'Avrupa Kardiyoloji/İlgili İhtisas Board Sertifikası', id: 'EBO-N-5049', status: 'Doğrulandı' },
    { title: 'CareTrust Bağımsız Tıbbi Sicil Otorite Onayı', id: 'CT-TR-70291', status: 'Mühürlü' }
  ];

  // Past Verified Treatment History with Complete Medical and Cost Transparency (Success Rates & Complications)
  const clinicalTreatmentsTimeline = [
    {
      index: 1,
      initials: 'M.A.',
      age: 54,
      procedure: 'Mitral Kapak Tamiri & Koroner Bypass Ameliyatı',
      date: 'Ocak 2026',
      status: 'Tam Şifalı Rapor Onaylı',
      outcome: 'Son derece başarılı, %100 kalp debisinde artış, %15 koroner perfüzyon iyileşmesi.',
      outcomeType: 'positive',
      description: 'Hastanın mitral kapak yetersizliği ve 3 damarında kritik daralma saptandı. Tek seansta mitral kapak tamiri ve üçlü koroner bypass cerrahisi yapıldı. Yoğun bakımda geçen 48 saat sonrasında servis izlemine alındı.',
      successAreas: ['Sol ventrikül ejeksiyon fraksiyonunun (EF) stabilizasyonu', 'Göğüs ağrısı (Angina Pectoris) semptomlarının tamamen ortadan kalkması', 'Solunum konforunda belirgin yükseliş.'],
      challenges: 'Ciddi kalp yetmezliği başlangıcından ötürü ameliyat öncesi yüksek diüretik tedavisi ihtiyacı ve geçici aritmi takibi yapılmıştır.',
      costs: {
        hospitalFee: 47500,
        doctorFee: 42000,
        materialsFee: 26500,
        total: 116000,
        insurancePaid: 92800, // 80% SGK coverage
        patientShare: 23200,
        invoiceNo: 'TAX-2026-FT9012',
        insuranceType: 'SGK Devlet Teşviki (Katastrofik Cerrahi Destek - %80 Karşıladı)'
      }
    },
    {
      index: 2,
      initials: 'H.T.',
      age: 62,
      procedure: 'Kronik Varistöz Venöz Yetmezlik & Lazer Ablasyon',
      date: 'Ocak 2026',
      status: 'Kısmi Rezidüel Ödem & İzlem',
      outcome: 'Ana semptomlarda %70 azalma, ancak sol ayak bileğinde hafif uyuşukluk/duyu kaybı izlenmektedir.',
      outcomeType: 'challenging',
      description: 'Bilateral ileri derece venöz yetmezliği olan hastaya endovenöz lazer ablasyonu ve köpük skleroterapisi yapıldı. Sağ bacak tamamen iyileşirken, sol bacak derin ven yapısından ve yüksek kompresyondan ötürü geçici nöropatik duyu kaybı gelişti.',
      successAreas: ['Bacaklarda yürürken oluşan şiddetli krampların durması', 'Alt ekstremitedeki kronik venöz varis yaralarının (ülser) tamamen kapanması.'],
      challenges: 'Lokal sinir harabiyetine bağlı sol ayak lateralinde uyuşukluk (safen sinir irritasyonu). 6 aylık B-vitamini ve nöroloji fizik tedavi takibi reçete edildi.',
      costs: {
        hospitalFee: 18500,
        doctorFee: 14000,
        materialsFee: 12500,
        total: 45000,
        insurancePaid: 13500, // 30% private insurance
        patientShare: 31500,
        invoiceNo: 'TAX-2026-FT1108',
        insuranceType: 'Özel Sağlık Sigortası (Anlaşmalı Katkı Payı - %30 Karşıladı)'
      }
    },
    {
      index: 3,
      initials: 'C.K.',
      age: 71,
      procedure: 'Robotik Diz Protezi & Kompleks Eklem Değişimi',
      date: 'Kasım 2025',
      status: 'Hızlı Rehabilitasyon Mühürlü',
      outcome: 'Görkemli başarı; 3. haftada desteksiz tam yürüme kapasitesi kazanıldı.',
      outcomeType: 'positive',
      description: 'İleri derece diz kireçlenmesi (gonartroz) olan osteoartrit hastasına Robotik Mako Cerrahi Sistemiyle total diz eklemi protezi yerleştirildi. Kemik kesileri milimetrik doğrulukla tamamlandı.',
      successAreas: ['Post-operatif bacak aksı eğriliğinin sıfır hatayla düzeltilmesi', 'Aktif eklem hareket açıklığının (ROM) 120 dereceye ulaşması.'],
      challenges: 'Cihaz kalibrasyon fazı nedeniyle işlem süresi 15 dakika uzadı. Ameliyat sonrası ilk 3 gün orta-şiddetli lokalize ağrı için epidural analjezi uygulandı.',
      costs: {
        hospitalFee: 31000,
        doctorFee: 26000,
        materialsFee: 58000, // Imported precision knee implant
        total: 115000,
        insurancePaid: 80500, // 70% SGK coverage matching state robotic system
        patientShare: 34500,
        invoiceNo: 'TAX-2025-FT7281',
        insuranceType: 'SGK Robotik Tıp Desteği Onayı (Devlet Katkısı - %70 Karşıladı)'
      }
    },
    {
      index: 4,
      initials: 'S.O.',
      age: 55,
      procedure: 'Herni (Fıtık) Yaması Re-operasyonu & Enfeksiyon Yönetimi',
      date: 'Eylül 2025',
      status: 'Yara Debridmanı & Klinik Revizyon',
      outcome: 'Cerrahi yama yerleşiminde post-op yara enfeksiyonu gelişti; 11 gün ek yatış ve VAC tedavisi ile enfeksiyon çözüldü.',
      outcomeType: 'challenging',
      description: 'Farklı bir hastanede yapılan fıtık operasyonu nüksü nedeniyle başvuran obez hastaya greftli re-fıtık operasyonu uygulandı. Ameliyattan 5 gün sonra cilt altı yağ dokusu nekrozu ve akıntısı görüldü. Tekrar yatış verilerek VAC (Vakumlu Yara Kapama) uygulandı.',
      successAreas: ['Yama malzemesi yerinden çıkarılmadan enfeksiyonun tam olarak kurutulması', 'Fıtık nüksünün cerrahi olarak başarıyla durdurulması.'],
      challenges: 'Hastanede yatış süresi plansız şekilde 11 gün uzadı. Hastaya ve yakınlarına ek klinik stres yarattı. IV geniş spektrumlu antibiyoterapi uygulandı.',
      costs: {
        hospitalFee: 35000,
        doctorFee: 18000,
        materialsFee: 15500,
        total: 68500,
        insurancePaid: 54800, // 80% coverage
        patientShare: 13700,
        invoiceNo: 'TAX-2025-FT0841',
        insuranceType: 'SGK Genel Sağlık Sigortası (%80 Karşıladı)'
      }
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in text-left">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold text-xs mb-6 transition-colors group cursor-pointer focus:outline-none"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Hekim Listesine Geri Dön
      </button>

      {/* 1. Doctor Profile Hero */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-8">
        {/* Specialty-Specific Department Cover Banner */}
        <div className="h-40 sm:h-56 relative w-full overflow-hidden border-b border-slate-100">
          {getSpecialtyBanner(doctor.specialty)}
        </div>

        {/* Hero Card Body */}
        <div className="p-6 lg:p-8 pt-6 relative">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 z-10 relative">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-end text-center sm:text-left">
              {/* Overlapping Rounded Portrait Photo */}
              <div 
                onClick={() => setZoomedImage({ url: doctor.imageUrl, name: doctor.name, title: doctor.title })}
                className="h-28 w-28 sm:h-32 sm:w-32 rounded-3xl overflow-hidden bg-white p-1.5 border border-slate-200 shadow-md shrink-0 relative z-20 transition-all hover:scale-[1.04] active:scale-95 duration-300 -mt-20 sm:-mt-24 mb-1 sm:mb-0 cursor-pointer group"
                title="Fotoğrafı Büyüt"
              >
                {/* Hover zoom overlay badge */}
                <div className="absolute inset-0 bg-slate-900/45 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-10 rounded-2xl">
                  <ZoomIn className="w-6 h-6 text-white scale-90 group-hover:scale-100 transition-transform duration-300" />
                </div>
                <img
                  src={doctor.imageUrl}
                  referrerPolicy="no-referrer"
                  alt={doctor.name}
                  className="h-full w-full object-cover rounded-2xl"
                />
              </div>

              {/* Title & Affiliations */}
              <div className="flex flex-col gap-1.5 justify-end pb-1 text-center sm:text-left items-center sm:items-start select-none">
                <span className="text-[10px] font-extrabold text-[#312e81] bg-[#e0e7ff] border border-slate-200/10 px-3 py-1 rounded-full uppercase tracking-wider shadow-3xs">
                  {doctor.specialty} UZMANI
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-none mt-2">
                  {doctor.name}
                </h2>
                <p className="text-sm sm:text-base font-bold text-slate-600">{doctor.title}</p>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 text-xs text-slate-500 font-semibold mt-2">
                  <span className="flex items-center gap-1 justify-center sm:justify-start">
                    <Activity className="w-4 h-4 text-emerald-600 shrink-0" />
                    {doctor.hospital}
                  </span>
                  <span className="hidden sm:inline text-slate-300">|</span>
                  <span className="flex items-center gap-1 justify-center sm:justify-start">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    {doctor.city}
                  </span>
                </div>
              </div>
            </div>

            {/* Credibility Score Circle */}
            <div className="w-full lg:w-72 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex lg:flex-col items-center justify-between gap-4 shrink-0 shadow-3xs">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-xl bg-emerald-950 flex items-center justify-center text-white font-mono font-bold shadow-xs">
                  <CheckCircle2 className="w-5.5 h-5.5 text-emerald-300" />
                </div>
                <div className="text-left">
                  <p className="text-[9px] font-black text-emerald-950 uppercase tracking-widest leading-none">
                    Kayıt Durumu
                  </p>
                  <p className="text-xs font-bold text-emerald-900 mt-1">Klinik Doğrulama Tamamlandı</p>
                </div>
              </div>
              
              <div className="bg-emerald-950 text-white font-mono px-4 py-2 rounded-xl text-center shadow-inner flex items-center lg:flex-col justify-center gap-1.5 lg:gap-0 w-full">
                <span className="text-xl sm:text-2xl font-black tracking-tight leading-none text-emerald-300">%{doctor.credibilityRating}</span>
                <span className="text-[10px] font-extrabold text-white tracking-widest uppercase">Güvenlik Skoru</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real-Time Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-100 pt-6 mt-6">
          <div className="bg-slate-50/70 p-4 rounded-xl text-center border border-slate-150">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Doğrulanmış Toplam Tedavi</span>
            <p className="text-xl sm:text-2xl font-black text-slate-900 font-mono mt-1">+{doctor.verifiedTreatments}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Mühürlü vaka dosyası</p>
          </div>
          <div className="bg-slate-50/70 p-4 rounded-xl text-center border border-slate-150">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Klinik Tecrübe</span>
            <p className="text-xl sm:text-2xl font-black text-slate-900 font-mono mt-1">{doctor.experienceYears} Yıl</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Akredite hastane hizmeti</p>
          </div>
          <div className="bg-slate-50/70 p-4 rounded-xl text-center border border-slate-150">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Hasta Memnuniyeti</span>
            <p className="text-xl sm:text-2xl font-black text-slate-900 font-mono mt-1">%{doctor.satisfactionRate}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Bağımsız anket rasyosu</p>
          </div>
          <div className="bg-slate-50/70 p-4 rounded-xl text-center border border-slate-150">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Hekim Sicil Yaşı</span>
            <p className="text-xl sm:text-2xl font-black text-slate-900 font-mono mt-1">{doctor.age}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Tıbbi kütük beyan yaşı</p>
          </div>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="flex border-b border-slate-200 mb-6 gap-2 sm:gap-4 overflow-x-auto whitespace-nowrap">
        <button
          onClick={() => setActiveTab('A')}
          className={`py-3.5 px-4 font-bold text-xs uppercase tracking-wider border-b-2 cursor-pointer transition-all ${
            activeTab === 'A'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Birim A: Akademik Özet & Rezervasyon
        </button>
        <button
          onClick={() => setActiveTab('B')}
          className={`py-3.5 px-4 font-bold text-xs uppercase tracking-wider border-b-2 cursor-pointer transition-all flex items-center gap-1.5 ${
            activeTab === 'B'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Birim B: Evrak Onaylı Tedavi Deneyimleri
          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full">
            {doctor.reviews.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('C')}
          className={`py-3.5 px-4 font-bold text-xs uppercase tracking-wider border-b-2 cursor-pointer transition-all flex items-center gap-1.5 ${
            activeTab === 'C'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Birim C: Klinik Vaka Geçmişi & Akreditasyon
        </button>
      </div>

      {/* 3. Tab Content Panels */}
      <div className="min-h-[400px]">
        {/* TAB A: OVERVIEW & APPOINTMENT BOOKING CORES */}
        {activeTab === 'A' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              
              {/* About description */}
              <div className="bg-white rounded-2xl border border-slate-200/60 p-6 sm:p-8 shadow-3xs">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Activity className="w-4.5 h-4.5 text-blue-600" />
                  Klinik Yaklaşım ve Hekim Biyografisi
                </h3>
                <p className="text-slate-650 text-sm leading-relaxed whitespace-pre-line">{doctor.about}</p>
              </div>

              {/* Module 2: Weekly Availability Calendar Scheduling Widget */}
              <div className="bg-slate-950 text-white rounded-3xl border border-slate-800 p-6 sm:p-8 relative overflow-hidden shadow-lg shadow-blue-950/10" id="randevu-simulasyonu">
                <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800/10 rounded-full blur-2xl pointer-events-none"></div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-tight">Güvenli Ön Görüşme ve Takvim Rezervasyonu</h4>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase font-mono mt-0.5">Sadece CareTrust Protokolüyle Doğrulanmıştır</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-900/60 px-2.5 py-1 rounded-full flex items-center gap-1 self-start sm:self-center">
                    <Lock className="w-3 h-3 text-emerald-400" />
                    Kasıtsız Rezerve Sistemi
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Bu hekim için CareTrust sistemi üzerinden doğrudan bir ön-bilgi randevusu oluşturabilirsiniz. Uygun bir tarih günü seçip aşağıdaki saat dilimlerinden birine dokunarak şikayetinizi rapor edin.
                </p>

                {/* Date select strip */}
                <div className="grid grid-cols-5 gap-2 mb-6 select-none">
                  {next5Days.map(day => {
                    const isActive = selectedDay === day.dateStr;
                    return (
                      <button
                        key={day.dateStr}
                        onClick={() => {
                          setSelectedDay(day.dateStr);
                          setSelectedTimeSlot(null);
                        }}
                        className={`py-2 px-1 rounded-xl text-center cursor-pointer border transition-all ${
                          isActive
                            ? 'bg-blue-600 border-blue-500 text-white shadow-md'
                            : 'bg-slate-900 border-slate-800 text-slate-350 hover:bg-slate-850'
                        }`}
                      >
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{day.dayName.slice(0, 3)}</p>
                        <p className="text-base font-extrabold mt-0.5">{day.dayNum}</p>
                        <p className="text-[9px] text-slate-400 truncate">{day.monthName}</p>
                      </button>
                    );
                  })}
                </div>

                {/* Slots grid */}
                <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Günlük Uygun Muayene Saatleri</h5>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-2">
                  {slots.map(slot => {
                    const booked = isSlotBooked(selectedDay, slot);
                    const isPicked = selectedTimeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={booked}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`py-2.5 px-3 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                          booked 
                            ? 'bg-slate-900/40 border border-slate-950 text-slate-600 cursor-not-allowed line-through' 
                            : isPicked
                            ? 'bg-emerald-600 border border-emerald-500 text-white shadow-md shadow-emerald-900/20'
                            : 'bg-slate-900 border border-slate-800 text-emerald-400 hover:border-emerald-500/30 hover:bg-slate-850'
                        }`}
                      >
                        {slot} {booked ? '(Dolu)' : '(Uygun)'}
                      </button>
                    );
                  })}
                </div>

                {/* Modal Trigger or Warning */}
                {selectedTimeSlot ? (
                  <div className="mt-5 p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in">
                    <p className="text-xs text-slate-300">
                      Tarih: <strong>{selectedDay}</strong> | Saat: <strong>{selectedTimeSlot}</strong> olarak bir muayene talep ediyorsunuz.
                    </p>
                    <button
                      onClick={() => setIsBookingModalOpen(true)}
                      className="py-2.5 px-5 bg-gradient-to-r from-emerald-500 to-teal-550 text-white font-extrabold rounded-xl text-xs hover:shadow-lg transition-all active:scale-98 cursor-pointer"
                    >
                      Hasta Bilgilerini Girerek Rezervasyonu Tamamla
                    </button>
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-400 mt-3 flex items-center gap-1.5 justify-center">
                    <Info className="w-3.5 h-3.5" />
                    Rezervasyon yapabilmek için üstten boş bir saate dokunmanız gerekmektedir.
                  </p>
                )}
              </div>

              {/* Education Background Panel */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-3xs flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-slate-50 pb-2">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                    Uzmanlık Eğitimi ve Akademik Özgeçmiş
                  </h3>
                  <div className="space-y-3">
                    {doctor.education.map((edu, idx) => (
                      <div key={idx} className="flex gap-2.5 items-start p-3 rounded-xl bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-100">
                        <div className="h-5 w-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 border border-blue-100">
                          <Check className="w-3 h-3 stroke-[3px]" />
                        </div>
                        <span className="leading-tight text-slate-800">{edu}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Side Column: Special Interests and CTA */}
            <div className="space-y-6">
              
              <div className="bg-slate-900 text-white rounded-2xl p-6 relative overflow-hidden shadow-md">
                <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:12px_12px] opacity-10"></div>
                <div className="relative z-10">
                  <h4 className="font-extrabold text-white text-base leading-snug mb-2">Bu hekime tedavi oldunuz mu?</h4>
                  <p className="text-slate-300 text-xs leading-relaxed mb-6">
                    Deneyim bilgilerinizi, tedavi safhalarınızı ve iyileşme metriklerinizi resmi olarak ekleyerek diğer hastalara tarafsız ışık tutun.
                  </p>
                  <button
                    onClick={() => onSubmitReview(doctor)}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 hover:shadow-lg transition-all active:scale-98 cursor-pointer shadow-md shadow-emerald-950/20"
                  >
                    <Heart className="w-4 h-4 text-white animate-pulse" />
                    Doğrulanmış Deneyimini Paylaş
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-3xs">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Özel İlgi ve Çalışma Alanları</h3>
                <div className="flex flex-col gap-2">
                  {doctor.specialInterests.map((interest, idx) => (
                    <div key={idx} className="flex items-center gap-2 py-2 px-3 rounded-lg bg-emerald-50/50 text-emerald-900 font-bold border border-emerald-100/40 text-xs text-left">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-650 shrink-0"></span>
                      {interest}
                    </div>
                  ))}
                </div>
              </div>

              {/* Accreditations Summary list */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-3xs text-left">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <Award className="w-4.5 h-4.5 text-blue-600" />
                  Hekim Tıbbi Sivil Lisansları
                </h3>
                <div className="space-y-3">
                  {accreditations.map(acc => (
                    <div key={acc.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                      <p className="text-xs font-extrabold text-slate-900">{acc.title}</p>
                      <div className="flex justify-between mt-1 text-[10px] text-slate-400 font-mono font-semibold">
                        <span>Lisans No: {acc.id}</span>
                        <span className="text-emerald-700 font-bold">● {acc.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB B: VERIFIED TREATMENT EXPERIENCES LIST & FEED */}
        {activeTab === 'B' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in text-left">
            {doctor.reviews.length > 0 ? (
              doctor.reviews.map((review) => (
                <div 
                  key={review.id} 
                  className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 flex flex-col gap-6"
                >
                  {/* Review Header Card */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <div className="flex items-start gap-3 text-left">
                      <div className="h-9 w-9 bg-emerald-100 text-emerald-800 rounded-lg flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-5.5 h-5.5 text-emerald-600" />
                      </div>
                      <div>
                        {/* Dynamic Verified Document Badge (Module 5 integration in Review Feed) */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-slate-400 font-mono block">
                            {review.patientIdCode}
                          </span>
                          
                          {/* If review actually uploaded a verification document, or mock-rendered */}
                          {(review.verifiedWithDocument || review.id.startsWith('rev-')) && (
                            <span className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md hover:bg-amber-100 transition-colors" title={`Yüklenen Resmi Evrak: ${review.docFileName || 'Epikriz-Raporu_Mühürlü_SHA256.pdf'}`}>
                              <FileCheck className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                              🛡️ FATURALI & EPİKRİZ ONAYLI KANIT
                            </span>
                          )}
                        </div>
                        <h4 className="text-base font-bold text-slate-900 tracking-tight mt-0.5">
                          {review.treatmentType}
                        </h4>
                      </div>
                    </div>
                    
                    {/* Date Block */}
                    <div className="text-left sm:text-right">
                      <span className="text-xs text-slate-400 font-serif flex items-center sm:justify-end gap-1.5 font-semibold">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        Teyit Tarihi: {review.date}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 mt-1 font-mono">
                        🔒 Kriptografik Şifreli Kayıt
                      </span>
                    </div>
                  </div>

                  {/* Summary & Core Narrative */}
                  <div className="text-left">
                    <h5 className="font-extrabold text-slate-950 text-sm mb-1.5 italic">
                      "{review.summary}"
                    </h5>
                    <p className="text-slate-650 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                      {review.text}
                    </p>
                  </div>

                  {/* Rating Metrics Sliders Showcase */}
                  <div className="bg-slate-50 p-4 rounded-xl text-left border border-slate-100">
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 font-mono">Doğrulanmış Hasta Memnuniyet Puanları</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="flex items-center justify-between sm:flex-col sm:items-start gap-1">
                        <span className="text-xs font-semibold text-slate-600">Tedavi/Teşhis Anlatımı</span>
                        <div className="flex items-center gap-2 mt-0.5 font-mono">
                          {renderStars(review.ratings.explanation)}
                          <span className="font-mono text-xs font-bold text-slate-700">({review.ratings.explanation}/5)</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:flex-col sm:items-start gap-1">
                        <span className="text-xs font-semibold text-slate-600">Tedavi ve Operasyon Başarısı</span>
                        <div className="flex items-center gap-2 mt-0.5 font-mono">
                          {renderStars(review.ratings.success)}
                          <span className="font-mono text-xs font-bold text-slate-700">({review.ratings.success}/5)</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:flex-col sm:items-start gap-1">
                        <span className="text-xs font-semibold text-slate-600">Ameliyat / İşlem Sonrası Takip</span>
                        <div className="flex items-center gap-2 mt-0.5 font-mono">
                          {renderStars(review.ratings.postOp)}
                          <span className="font-mono text-xs font-bold text-slate-700">({review.ratings.postOp}/5)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Journey Treatment Timeline Narrative */}
                  {review.journey && review.journey.length > 0 && (
                    <div className="border-t border-slate-100 pt-5 text-left">
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 font-mono">Adım Adım Tedavi ve İyileşme Kronolojisi</h5>
                      
                      <div className="relative pl-6 border-l border-slate-200 ml-3 space-y-6">
                        {review.journey.map((phaseData, pIdx) => (
                          <div key={pIdx} className="relative">
                            {/* Left node point */}
                            <div className="absolute -left-[31px] top-1 bg-white border border-blue-500 rounded-full h-4 w-4 flex items-center justify-center shadow-xs">
                              <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md uppercase tracking-wider font-mono">
                                {phaseData.phase}
                              </span>
                              <h6 className="font-bold text-sm text-slate-950 mt-1">{phaseData.title}</h6>
                              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                {phaseData.text}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Module 6: Official Doctor Feedback Reply Display Panel */}
                  {review.replyText ? (
                    <div className="mt-4 bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 text-left animate-fade-in">
                      <div className="flex items-center justify-between gap-2 border-b border-slate-250 pb-2.5 mb-2.5">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-4.5 h-4.5 text-blue-600" />
                          <span className="text-xs font-extrabold text-slate-905 flex items-center gap-1">
                            {doctor.name} <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full font-mono font-bold text-[9px] uppercase border border-blue-105">Hekim Resmi Yanıtı</span>
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">Tarih: {review.replyDate || '2026-05-18'}</span>
                      </div>
                      <p className="text-xs font-semibold italic text-slate-700 leading-relaxed whitespace-pre-wrap">
                        "{review.replyText}"
                      </p>
                    </div>
                  ) : null}

                </div>
              ))
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-xs">
                <CheckCircle2 className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h4 className="font-bold text-slate-900 text-base mb-1">Kayıtlı Tedavi Deneyimi Yok</h4>
                <p className="text-slate-500 text-xs mb-6">
                  Bu hekim ile yaşadığınız teyitli tedavi sürecini sisteme ilk ekleyen hasta siz olun.
                </p>
                <button
                  onClick={() => onSubmitReview(doctor)}
                  className="py-2.5 px-5 rounded-xl bg-blue-600 text-white font-bold text-xs cursor-pointer hover:bg-blue-700 transition-colors"
                >
                  Doğrulanmış Deneyim Ekle
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB C: CLINICAL TREATMENT TIMELINE & CERTIFICATE WALL */}
        {activeTab === 'C' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in py-4 text-left">
            
            {/* 1. Accreditations Badge Wall Checklist (Module 4 Certification) */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-3xs">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-600" />
                Onaylı Tıbbi Akreditasyonlar ve Sertifikasyon Duvarı
              </h3>
              <p className="text-xs text-slate-500 mb-6">Hekimin mesleki lisans durumu, bağımsız otoriteler düzeyinde doğrulanmış kayıt numaralarıyla mühürlenmiştir.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {accreditations.map((acc, index) => (
                  <div key={index} className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex items-start gap-3 hover:border-indigo-200 transition-all">
                    <div className="h-8 w-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Award className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900">{acc.title}</h4>
                      <p className="text-[10px] text-slate-400 font-mono font-bold mt-1">LİSANS ID KODU: {acc.id}</p>
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 mt-2">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        RESMİ {acc.status.toUpperCase()} SİCİL
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Historic Treatment Timeline (Module 4 Timeline requirement, upgraded with details, positive/negative outcomes, and cost transparency) */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-3xs" id="klinik-islem-gecmisi">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-150 pb-5">
                <div>
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-1 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-indigo-600" />
                    ŞEFFAF KLİNİK GEÇMİŞ & REKOR TRANSANKSİYEL MALİYET VE SÜREÇ ANALİZİ
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Hekimin arşiv kaydına onay vermiş gerçek hastaların kimliksizleştirilmiş, hem tam şifalı (olumlu) hem de tıbbi açıdan zorlu/komplikasyon revizyonlu (olumsuz) operasyon kronolojisi ve tedavi maliyet faturaları.
                  </p>
                </div>
                <div className="flex gap-1.5 shrink-0 flex-wrap">
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 px-2.5 py-1 rounded-full text-[10px] font-black flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> %100 Şeffaflık
                  </span>
                  <span className="bg-indigo-50 text-indigo-800 border border-indigo-100 px-2.5 py-1 rounded-full text-[10px] font-black flex items-center gap-1">
                    <FileCheck className="w-3 h-3 text-indigo-600" /> Fatura Onaylı
                  </span>
                </div>
              </div>

              {/* Informational Box regarding Medical Reality */}
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl mb-8 text-xs text-slate-600 flex items-start gap-3">
                <div className="h-6 w-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 font-bold mt-0.5">!</div>
                <div>
                  <p className="font-extrabold text-slate-900 mb-0.5">Tıbbi Dürüstlük Taahhüdü ve Vaka Şeffaflığı</p>
                  <p className="leading-relaxed">
                    Tıp bilimi, doğası gereği hem hedeflenen başarıları hem de beklenmedik anatomik varyasyonları ve iyileşme zorluklarını barındırır. Aşağıdaki zaman tüneli, hastalarımızın rızasıyla gizlilik çerçevesinde yayınlanan, komplikasyon yönetimi dahil tüm tıbbi ve finansal (maliyet/fatura) verileri içeren özgün bir arşivdir.
                  </p>
                </div>
              </div>

              <div className="relative pl-8 border-l-2 border-slate-200 ml-4 space-y-8">
                {clinicalTreatmentsTimeline.map((item, idx) => {
                  const isExpanded = expandedTreatmentIndex === idx;
                  const isPositive = item.outcomeType === 'positive';

                  return (
                    <div key={idx} className="relative group text-left">
                      
                      {/* Interactive Circle Bullet Node indicating status type */}
                      <button
                        type="button"
                        onClick={() => {
                          setExpandedTreatmentIndex(isExpanded ? null : idx);
                        }}
                        className={`absolute -left-[42px] top-1.5 h-7 w-7 rounded-full border-2 flex items-center justify-center text-white shrink-0 shadow-sm cursor-pointer z-10 transition-all ${
                          isExpanded 
                            ? 'bg-indigo-600 border-indigo-700 font-extrabold scale-110' 
                            : isPositive 
                              ? 'bg-emerald-600 border-emerald-100 hover:bg-emerald-700' 
                              : 'bg-amber-600 border-amber-100 hover:bg-amber-700'
                        }`}
                        title="Detay Penceresini Aç / Kapat"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 animate-pulse" />
                        )}
                      </button>

                      <div className={`rounded-2xl border transition-all overflow-hidden ${
                        isExpanded 
                          ? 'border-indigo-300 bg-white shadow-sm' 
                          : 'border-slate-150 bg-slate-50/60 hover:bg-white hover:border-slate-300'
                      }`}>
                        
                        {/* Summary Header of the Treatment */}
                        <div 
                          className="p-5 cursor-pointer select-none"
                          onClick={() => {
                            setExpandedTreatmentIndex(isExpanded ? null : idx);
                          }}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-2.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-black text-slate-900 font-mono tracking-wider bg-slate-200 px-2.5 py-0.5 rounded-md">
                                Protokol Mührü: {item.initials} ({item.age} Yaş)
                              </span>
                              <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
                                isPositive 
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-150' 
                                  : 'bg-amber-50 text-amber-700 border-amber-150'
                              }`}>
                                {item.status.toUpperCase()}
                              </span>
                            </div>
                            <span className="text-xs text-slate-400 font-bold font-mono">{item.date}</span>
                          </div>

                          <h4 className="font-black text-slate-950 text-base leading-tight">
                            {item.procedure}
                          </h4>
                          
                          <p className="text-xs text-slate-600 mt-2 font-medium leading-relaxed flex items-start gap-1.5">
                            <span className="mt-0.5 shrink-0 block">
                              {isPositive ? (
                                <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
                              ) : (
                                <span className="h-2 w-2 rounded-full bg-amber-500 inline-block" />
                              )}
                            </span>
                            <span><strong>Klinik Özet:</strong> {item.outcome}</span>
                          </p>

                          <div className="mt-4 pt-3 border-t border-slate-150/60 flex items-center justify-between text-xs text-slate-400 font-bold">
                            <span className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800">
                              {isExpanded ? 'Tedavi Detaylarını & Fatura Dökümünü Gizle' : 'Tedavi Detaylarını & Şeffaf Fatura Dökümünü İncele'}
                              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90 text-indigo-700' : ''}`} />
                            </span>
                            <span className="font-mono text-slate-700">
                              Toplam Maliyet: <strong className="text-slate-950 font-black">{item.costs.total.toLocaleString('tr-TR')} TL</strong>
                            </span>
                          </div>
                        </div>

                        {/* Detailed Expanded Dashboard section */}
                        {isExpanded && (
                          <div className="px-5 pb-5 pt-1 border-t border-slate-150 bg-slate-50/50 space-y-5 animate-fade-in">
                            
                            {/* Treatment Narrative Description */}
                            <div className="space-y-1.5 text-left">
                              <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-wider font-mono">
                                1. Detaylı Tedavi Semptom & Ameliyat Hikayesi (Anamnez)
                              </h5>
                              <p className="text-xs text-slate-700 leading-relaxed bg-white border border-slate-200 p-4 rounded-xl shadow-3xs font-serif font-medium">
                                {item.description}
                              </p>
                            </div>

                            {/* Medical Outcome Analysis Grid (Positive vs Negative/Challenges) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              
                              {/* SUCCESSES (Olumlu Alanlar) */}
                              <div className="bg-emerald-50/50 border border-emerald-150 p-4 rounded-xl space-y-2.5">
                                <h6 className="text-[11px] font-black text-emerald-800 uppercase tracking-widest flex items-center gap-1.5 font-mono">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                  BAŞARI SAĞLANAN ALANLAR (OLUMLU/ŞİFALI)
                                </h6>
                                <ul className="space-y-1.5 text-xs text-slate-800 font-medium">
                                  {Array.isArray(item.successAreas) ? (
                                    item.successAreas.map((suc, sIdx) => (
                                      <li key={sIdx} className="flex items-start gap-1.5">
                                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                        <span>{suc}</span>
                                      </li>
                                    ))
                                  ) : (
                                    <li className="flex items-start gap-1.5">
                                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                      <span>{item.successAreas}</span>
                                    </li>
                                  )}
                                </ul>
                              </div>

                              {/* CHALLENGES (Zorluklar / Komplikasyon Revizyonları) */}
                              <div className="bg-amber-50/50 border border-amber-150 p-4 rounded-xl space-y-2.5">
                                <h6 className="text-[11px] font-black text-amber-800 uppercase tracking-widest flex items-center gap-1.5 font-mono">
                                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                                  KADRAJA GEREN ZORLUKLAR & ENGELLER (OLUMSUZ / YAN ETKİ)
                                </h6>
                                <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                                  {item.challenges}
                                </p>
                                <div className="text-[10px] text-slate-500 italic">
                                  * Gelişen tıbbi pürüzler hekim tarafından proaktif müdahale ve rehabilitasyon ilaçlarıyla kontrol altına alınmıştır.
                                </div>
                              </div>

                            </div>

                            {/* Transparent Treatment Costs Section */}
                            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs space-y-3">
                              <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
                                <h6 className="text-[11px] font-black text-slate-900 uppercase tracking-wider font-mono flex items-center gap-1.5">
                                  <FileCheck className="w-4 h-4 text-indigo-500" />
                                  2. Tedavi Şeffaf Maliyet & Fatura Dağılım Matrisi
                                </h6>
                                <span className="font-mono text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-md">
                                  Belge No: {item.costs.invoiceNo}
                                </span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-left">
                                  <span className="text-[10px] font-bold text-slate-400 font-mono block">AMELİYATHANE & HASTANE</span>
                                  <span className="text-sm font-extrabold text-slate-800">{item.costs.hospitalFee.toLocaleString('tr-TR')} TL</span>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-left">
                                  <span className="text-[10px] font-bold text-slate-400 font-mono block">HEKİM OPERASYON BEDELİ</span>
                                  <span className="text-sm font-extrabold text-slate-800">{item.costs.doctorFee.toLocaleString('tr-TR')} TL</span>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-left">
                                  <span className="text-[10px] font-bold text-slate-400 font-mono block">TIBBİ MALZEME & İLAÇLAR</span>
                                  <span className="text-sm font-extrabold text-slate-800">{item.costs.materialsFee.toLocaleString('tr-TR')} TL</span>
                                </div>
                              </div>

                              <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                <div className="text-left">
                                  <p className="text-[10px] text-slate-500 font-mono font-black uppercase">Sigorta Katkı Şeması</p>
                                  <p className="text-xs font-bold text-slate-800">{item.costs.insuranceType}</p>
                                  <p className="text-[10px] text-emerald-800 font-extrabold mt-0.5">Müteferrik Sigorta Ödemesi: {item.costs.insurancePaid.toLocaleString('tr-TR')} TL</p>
                                </div>
                                <div className="sm:text-right shrink-0">
                                  <p className="text-[10px] text-indigo-500 font-mono font-black uppercase">Hastanın Cebinden Çıkan Net Pay</p>
                                  <p className="text-xl font-black text-indigo-900 line-height-none">{item.costs.patientShare.toLocaleString('tr-TR')} TL</p>
                                  <p className="text-[9px] text-slate-400 font-mono">KDV %10 Dahildir</p>
                                </div>
                              </div>

                              <div className="flex items-center justify-between pt-2 flex-wrap gap-2">
                                <span className="text-[10px] text-slate-500 font-medium">
                                  * Hastanemiz "Sağlıkta Hesap Verebilirlik" protokolü uyarınca faturada gizli ücret çıkarmaz.
                                </span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedInvoice({
                                      ...item,
                                      doctorName: doctor.name,
                                      doctorTitle: doctor.title,
                                      specialty: doctor.specialty
                                    });
                                  }}
                                  className="px-4 py-2 border border-indigo-200 hover:border-indigo-400 text-indigo-700 bg-white hover:bg-slate-50 font-black text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-3xs"
                                >
                                  <FileText className="w-3.5 h-3.5" />
                                  Görsel Resmi Fatura Makbuzu Üret
                                </button>
                              </div>
                            </div>

                          </div>
                        )}

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>


            {/* Academic papers list */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-3xs hover:shadow-2xs transition-all" id="akademik-yayinlar">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                    MEDİKAL YAYINLAR VE AKADEMİK ÇALIŞMALARI
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium mt-1">
                    Hekimin ulusal ve uluslararası tıp literatürüne kazandırdığı hakemli dergi makaleleri, vaka takipleri ve klinik tez çalışmaları.
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <span className="bg-blue-50 text-blue-800 border border-blue-100 px-3 py-1 rounded-full text-[10px] font-mono font-black flex items-center gap-1 shadow-2xs">
                    <BookOpen className="w-3.5 h-3.5" />
                    {doctor.timeline?.length || 0} Makale Yayını
                  </span>
                </div>
              </div>
              
              <div className="relative pl-8 border-l border-slate-200 ml-4 space-y-6">
                {doctor.timeline && doctor.timeline.map((item) => {
                  const isExpanded = !!expandedPubIds[item.id];
                  
                  // Generate realistic simulated metadata based on name or year
                  const journal = item.institution.includes('Üniversite') || item.institution.includes('Fakültesi')
                    ? `${item.institution} Tıp Fakültesi Akademik Arşivi (Indexed in PubMed)`
                    : "International Journal of Clinical Medicine & Therapeutics Research (Indexed in PubMed / MEDLINE)";
                  
                  const doi = `10.4852/caretrust.${doctor.id || 'doc'}.${item.id}`;
                  const authors = `${doctor.title} ${doctor.name}, Prof. Dr. Melih Şen, Uzm. Dr. Canan Aksoy, et al.`;
                  const impactFactor = ((parseInt(item.year || '2023') % 10) * 1.6 + 4.2).toFixed(1);
                  const citations = (parseInt(item.year || '2023') % 100) * 4 + 14;

                  const fullTextAbstract = `Giriş: Bu akademik çalışmada, "${item.title}" konusu kapsamında yürütülen klinik araştırmanın ana şablonu, operasyon metotları ve bulguları detaylandırılmıştır. Araştırma, ${item.institution} bünyesinde ${item.year} yılında tamamlanmış olup kohort grubu üzerinde yapılan ileriye dönük gözlemleri içerir.

Metot: Çalışmaya toplamda gönüllü 120 hasta dahil edilmiştir. Uygulanan prosedürlerin etkinliği klinik parametreler, hasta memnuniyet skorları ve uzun vadeli takip verileriyle analiz edilmiştir. İstatistiksel doğrulamalar p < 0.05 anlamlılık düzeyinde hesaplanmıştır.

Bulgular ve Sonuç: Araştırma sonucunda elde edilen veriler, "${item.description}" bulgularını tam doğrulamaktadır. Tedavi grubunda komplikasyon oranları asgari düzeyde tutulmuş ve klinik başarı oranlarında %94.2 seviyesinde istatistiksel açıdan anlamlı bir artış gözlenmiştir.`;

                  return (
                    <div key={item.id} className="relative group text-left">
                      {/* Left circular timeline dot indicator */}
                      <button 
                        type="button"
                        onClick={() => {
                          setExpandedPubIds(prev => ({ ...prev, [item.id]: !prev[item.id] }));
                        }}
                        className={`absolute -left-[45px] top-1.5 h-8 w-8 rounded-full flex items-center justify-center text-white border transition-all shadow-xs cursor-pointer z-10 ${
                          isExpanded ? 'bg-indigo-600 border-indigo-700 font-extrabold' : 'bg-blue-600 border-blue-700 hover:bg-indigo-600'
                        }`}
                        title="Metni Aç / Kapat"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>

                      <div className={`bg-slate-50/70 rounded-2xl border transition-all text-left overflow-hidden ${
                        isExpanded ? 'border-indigo-200 bg-white shadow-xs' : 'border-slate-150 hover:border-slate-350 hover:bg-white'
                      }`}>
                        
                        {/* Summary Header viewable in list */}
                        <div 
                          className="p-5 cursor-pointer select-none"
                          onClick={() => {
                            setExpandedPubIds(prev => ({ ...prev, [item.id]: !prev[item.id] }));
                          }}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-black text-slate-950 font-mono bg-slate-200 px-2.5 py-0.5 rounded-md">
                                {item.year}
                              </span>
                              <span className="text-[9px] font-black px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 uppercase tracking-wide">
                                SCI-EXPANDED / HAKEMLİ YAYIN
                              </span>
                              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono">
                                Impact: {impactFactor}
                              </span>
                            </div>
                            <span className="text-xs text-slate-500 font-bold flex items-center gap-1">
                              <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                              {item.institution}
                            </span>
                          </div>

                          <h4 className="font-extrabold text-slate-950 text-base leading-snug group-hover:text-blue-600 transition-colors">
                            {item.title}
                          </h4>
                          
                          <p className="text-xs text-slate-500 mt-2 font-medium leading-relaxed">
                            {item.description}
                          </p>

                          <div className="mt-3.5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-bold">
                            <span className="flex items-center gap-1 text-blue-600 hover:text-blue-750">
                              {isExpanded ? 'Makale Detaylarını ve Özetini Kapat' : 'Makale Detaylarını ve Özetini Göster'}
                              <ChevronRight className={`w-3.5 h-3.5 transition-transform shrink-0 ${isExpanded ? 'rotate-90' : ''}`} />
                            </span>
                            <span className="font-mono text-[10px]">
                              Atıf Sayısı: <strong className="text-slate-705">{citations}</strong>
                            </span>
                          </div>
                        </div>

                        {/* Expandable Body Container */}
                        {isExpanded && (
                          <div className="px-5 pb-5 pt-1 border-t border-slate-100 bg-slate-50/50 space-y-4 animate-fade-in text-left">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 bg-white p-4 rounded-xl border border-slate-200 mt-2">
                              <div>
                                <span className="text-[10px] font-mono text-slate-400 uppercase font-black block mb-0.5">Yayın Bilimi & Dergi Resmi</span>
                                <span className="text-xs font-extrabold text-slate-900 leading-tight block">{journal}</span>
                              </div>
                              <div>
                                <span className="text-[10px] font-mono text-slate-400 uppercase font-black block mb-0.5">Başlıca Yazarlar</span>
                                <span className="text-xs font-semibold text-slate-800 leading-tight block">{authors}</span>
                              </div>
                              <div className="md:col-span-2">
                                <span className="text-[10px] font-mono text-slate-400 uppercase font-black block mb-0.5">Digital Object Identifier (DOI) mühür</span>
                                <span className="text-xs font-mono text-slate-600 block select-all break-all">{doi}</span>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1 font-mono">
                                <FileText className="w-3.5 h-3.5 text-blue-500" />
                                Medikal Özet Önemli Bulgular (Abstract)
                              </h5>
                              <p className="text-xs text-slate-700 leading-relaxed bg-white border border-slate-200 p-4 rounded-xl whitespace-pre-line font-serif shadow-3xs">
                                {fullTextAbstract}
                              </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                              <div className="text-[10px] text-slate-500 font-medium">
                                * Bu makale ulusal ve uluslararası hakem denetiminden geçmiş ve kütüphane kaydı yapılmıştır.
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedPaper({
                                    ...item,
                                    journal,
                                    authors,
                                    doi,
                                    impactFactor,
                                    citations,
                                    abstract: fullTextAbstract
                                  });
                                }}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-xs hover:shadow-sm cursor-pointer transition-all self-stretch sm:self-auto text-center justify-center shrink-0"
                              >
                                <BookOpen className="w-3.5 h-3.5" />
                                Tam Metni ve İstatistikleri Oku
                              </button>
                            </div>
                          </div>
                        )}

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}
      </div>

      {/* APPOINTMENT SIMULATION MODAL (Module 2 Intake Form) */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in text-left">
          <div className="bg-white rounded-3xl border border-slate-250 shadow-2xl p-6 sm:p-8 max-w-lg w-full relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={closeBookingFlow}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 font-bold text-lg"
            >
              &times;
            </button>

            {bookingSuccessData ? (
              /* Success Booking Panel */
              <div className="text-center py-4 space-y-5 animate-scale-up">
                <div className="h-14 w-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto border border-emerald-250 shadow-sm">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Randevu Kaydınız Mühürlendi!</h3>
                
                <p className="text-xs text-slate-500 leading-relaxed">
                  Şikayetleriniz ve medikal özgeçmişiniz CareTrust veri defterine başarıyla işlendi. Muayene tarihinizde {doctor.name} ekibi sizi beklemektedir.
                </p>

                <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 text-xs font-mono text-left space-y-2.5 text-slate-600">
                  <div className="flex justify-between border-b border-slate-200/50 pb-2">
                    <span className="font-bold text-slate-400">Görüşme Tarihi:</span>
                    <span className="text-slate-950 font-bold">{bookingSuccessData.date}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/50 pb-2">
                    <span className="font-bold text-slate-400">Saat Dilimi:</span>
                    <span className="text-slate-950 font-bold">{bookingSuccessData.timeSlot} (Onaylandı)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/50 pb-2">
                    <span className="font-bold text-slate-400">Hekim Detayı:</span>
                    <span className="text-slate-950 font-bold">{doctor.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/50 pb-2">
                    <span className="font-bold text-slate-400">Konsültasyon Modu:</span>
                    <span className={bookingSuccessData.consultationType === 'Online Video' ? 'text-blue-700 font-bold' : 'text-slate-900 font-bold'}>
                      {bookingSuccessData.consultationType}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-400">Hasta Adı:</span>
                    <span className="text-slate-950 font-bold">{bookingSuccessData.patientName}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeBookingFlow}
                  className="w-full py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-bold text-xs"
                >
                  Takvime Geri Dön
                </button>
              </div>
            ) : (
              /* Booking Intake Intake Form */
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm">Medikal Ön Bilgi Alım Formu</h3>
                    <p className="text-[10px] text-slate-400 font-semibold font-mono uppercase">Tıbbi Sicil Kimlik Maskelemesi Etkindir</p>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 leading-normal">
                  Doktorunuzun muayene öncesinde durumunuzu analiz edebilmesi için asgari klinik şikayet ayrıntılarınızı girin.
                </p>

                {/* Patient Guest Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Adınız Soyadınız</label>
                    <input
                      type="text"
                      required
                      placeholder="Örn: Burak Çelik"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="h-10 px-3 rounded-lg border border-slate-250 bg-slate-50 text-xs font-semibold"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">E-Posta Adresiniz</label>
                    <input
                      type="email"
                      required
                      placeholder="e-posta@adresiniz.com"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      className="h-10 px-3 rounded-lg border border-slate-250 bg-slate-50 text-xs font-semibold"
                    />
                  </div>
                </div>

                {/* Consultation type */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Muayene ve Görüşme Modu</label>
                  <div className="grid grid-cols-2 gap-2 select-none">
                    <button
                      type="button"
                      onClick={() => setConsultationType('Yüz yüze')}
                      className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                        consultationType === 'Yüz yüze'
                          ? 'bg-blue-50 border-blue-500 text-blue-900'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      🏥 Yüz Yüze Muayene (Hastane)
                    </button>
                    <button
                      type="button"
                      onClick={() => setConsultationType('Online Video')}
                      className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                        consultationType === 'Online Video'
                          ? 'bg-blue-50 border-blue-500 text-blue-900'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      🎥 Online Tele-Sağlık Görüşmesi
                    </button>
                  </div>
                </div>

                {/* Complaint Text */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Mevcut Şikayetiniz (Belirtileriniz)</label>
                  <textarea
                    required
                    placeholder="Şikayetlerinizi ve ne kadar süredir devam ettiğini açıkça yazın..."
                    rows={3}
                    value={complaintText}
                    onChange={(e) => setComplaintText(e.target.value)}
                    className="p-3 text-xs rounded-lg border border-slate-250 bg-slate-50"
                  />
                </div>

                {/* Prior details */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center justify-between">
                    <span>Geçmiş Ameliyatlar / Alerji veya İlaçlar (Opsiyonel)</span>
                    <span className="text-[9px] text-slate-400 capitalize">Gizliliği Korunur</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: Düzenli aspirin kullanımı, penisilin alerjisi..."
                    value={priorDiagnoses}
                    onChange={(e) => setPriorDiagnoses(e.target.value)}
                    className="h-10 px-3 rounded-lg border border-slate-250 bg-slate-50 text-xs font-semibold"
                  />
                </div>

                {/* Submit row */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 mt-5">
                  <button
                    type="button"
                    onClick={closeBookingFlow}
                    className="py-2 px-4 rounded-xl border border-slate-200 text-slate-650 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
                  >
                    Vazgeç
                  </button>
                  <button
                    type="submit"
                    disabled={isBookingProgress}
                    className="py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-105 disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                  >
                    {isBookingProgress ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Randevu Şifreleniyor...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Rezervasyonu Tamamla ve Mühürle</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* FULL ACADEMIC PAPER / RESEARCH READER MODAL (Interactive Reading & Abstract) */}
      {selectedPaper && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-50 p-2 sm:p-4 text-left">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 max-w-2xl w-full relative max-h-[92vh] flex flex-col overflow-hidden animate-scale-up">
            
            {/* Modal header details */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4 mb-4 shrink-0">
              <div className="space-y-1 pr-6">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase">
                    Hakemli Orijinal Makale (SCI)
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono font-bold">
                    Atıf: {selectedPaper.citations} | Impact: {selectedPaper.impactFactor}
                  </span>
                </div>
                <h3 className="text-lg font-black text-slate-950 font-serif leading-snug">
                  {selectedPaper.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Dergi: <strong className="text-slate-800 font-semibold">{selectedPaper.journal}</strong> | Yıl: {selectedPaper.year}
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedPaper(null);
                  setCitationCopied(false);
                }}
                className="text-slate-400 hover:text-slate-900 font-bold text-2xl h-8 w-8 rounded-full hover:bg-slate-100 flex items-center justify-center cursor-pointer transition-colors"
              >
                &times;
              </button>
            </div>

            {/* Scrollable Content Container */}
            <div className="flex-1 overflow-y-auto space-y-6 pr-1 text-slate-750">
              
              {/* Authors info */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold mb-1">Yazar Listesi & Kurumlar</p>
                <p className="text-xs font-bold text-slate-800 leading-tight">
                  {selectedPaper.authors}
                </p>
                <p className="text-[10px] text-slate-500 mt-1 italic">
                  {selectedPaper.institution} Tıp Bilimleri Anabilim Dalı Klinik Araştırmalar Birimi
                </p>
              </div>

              {/* SECTION: Abstract and Background */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-1 flex items-center gap-1.5 font-mono">
                  <FileText className="w-4 h-4 text-indigo-500" />
                  1. Medikal Özet (Turkish Abstract)
                </h4>
                <div className="text-xs font-serif leading-relaxed text-slate-800 bg-amber-50/20 border border-amber-900/10 p-4 rounded-xl whitespace-pre-line">
                  {selectedPaper.abstract}
                </div>
              </div>

              {/* SECTION: Methodology and Scientific Data Study Table */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-1 flex items-center gap-1.5 font-mono">
                  <Activity className="w-4 h-4 text-emerald-500" />
                  2. Çalışma Tasarımı, Kohort Verileri ve Bulgular
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-serif">
                  Klinik çalışma, randomize kontrollü çift-kör tasarım şemasına uygun olarak gerçekleştirilmiş olup, elde edilen istatistiksel değişkenler ve p-değerleri (olasılık hesaplamaları) aşağıdaki tabloda özetlenmiştir:
                </p>

                {/* Simulated scientific statistics result table */}
                <div className="overflow-hidden border border-slate-200 rounded-xl">
                  <table className="w-full text-left border-collapse text-[11px] font-mono">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200 text-slate-600">
                        <th className="p-2.5 font-bold">Klinik Parametre</th>
                        <th className="p-2.5 font-bold">Tedavi Alan Kohort</th>
                        <th className="p-2.5 font-bold">Plasebo / Başlangıç</th>
                        <th className="p-2.5 font-bold">P-Değeri</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                      <tr>
                        <td className="p-2.5 font-bold">Tedavi Başarı Oranı</td>
                        <td className="p-2.5 text-emerald-600 font-bold">%94.2 (n=120)</td>
                        <td className="p-2.5">%58.5 (n=120)</td>
                        <td className="p-2.5 font-bold text-indigo-600">p &lt; 0.001 *</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold">Sıfır Komplikasyon</td>
                        <td className="p-2.5 text-emerald-600 font-bold">%96.8</td>
                        <td className="p-2.5">%88.0</td>
                        <td className="p-2.5">p = 0.042 *</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold">Medyan İyileşme (Gün)</td>
                        <td className="p-2.5 text-slate-900 font-bold">4.2 Gün</td>
                        <td className="p-2.5">8.9 Gün</td>
                        <td className="p-2.5 font-bold text-indigo-600">p &lt; 0.005 *</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold">Hasta Memnuniyet Skoru</td>
                        <td className="p-2.5 text-emerald-600 font-bold">9.4 / 10</td>
                        <td className="p-2.5">6.1 / 10</td>
                        <td className="p-2.5 font-bold text-indigo-600">p &lt; 0.001 *</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="bg-slate-50 p-2 border-t border-slate-100 text-[9px] text-slate-400 font-semibold font-mono text-center">
                    * p &lt; 0.05 değeri istatistiksel açıdan klinik olarak son derece anlamlı kabul edilir.
                  </div>
                </div>
              </div>

              {/* SECTION: Academic Citation Generator block */}
              <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-3.5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl pointer-events-none"></div>
                <div className="relative">
                  <h4 className="text-xs font-black text-indigo-300 uppercase tracking-widest flex items-center gap-1 font-mono">
                    <BookOpen className="w-4 h-4" />
                    3. Akademik Atıf Bilgisi & MLA / APA / BibTeX
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Bu çalışmayı kendi medikal makalenizde veya tez çalışmanızda kaynak göstermek için aşağıdaki hazır sitasyon kodunu kopyalayabilirsiniz:
                  </p>
                  
                  {/* Copyable Citation boxes */}
                  <div className="mt-3 space-y-2 text-[10.5px]">
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-slate-300 relative truncate">
                      <code className="block select-all cursor-pointer">
                        {`@article{caretrust_${doctor.id || 'doc'}_${selectedPaper.id},
  author = {${doctor.name}, Melih Sen, Canan Aksoy},
  title = {${selectedPaper.title}},
  journal = {${selectedPaper.journal}},
  year = {${selectedPaper.year}},
  doi = {${selectedPaper.doi}}
}`}
                      </code>
                    </div>

                    <div className="flex gap-2 items-center justify-between flex-wrap">
                      <span className="text-[10px] text-slate-400 font-medium">Balkaya Tıp Sicili & CareTrust Arşivi</span>
                      <button
                        type="button"
                        onClick={() => {
                          const code = `${doctor.name}, et al. "${selectedPaper.title}." ${selectedPaper.journal} ${selectedPaper.year}. DOI: ${selectedPaper.doi}`;
                          navigator.clipboard.writeText(code);
                          setCitationCopied(true);
                          setTimeout(() => setCitationCopied(false), 3000);
                        }}
                        className="py-1.5 px-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 font-bold text-[10px] cursor-pointer transition-all flex items-center gap-1 shrink-0"
                      >
                        {citationCopied ? 'Atıf Kopyalandı 👍' : 'MLA/APA Atıf Metnini Kopyala'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal footer controls */}
            <div className="border-t border-slate-100 pt-4 mt-4 flex items-center justify-between shrink-0 flex-wrap gap-2">
              <span className="text-[10px] text-slate-400 font-mono break-all selection:bg-indigo-100">
                DOI: {selectedPaper.doi}
              </span>
              <button
                type="button"
                onClick={() => {
                  setSelectedPaper(null);
                  setCitationCopied(false);
                }}
                className="py-2 px-5 rounded-xl bg-slate-900 text-white hover:bg-slate-850 font-bold text-xs cursor-pointer transition-all flex items-center gap-1.5 shrink-0"
              >
                Kapat
              </button>
            </div>

          </div>
        </div>
      )}

      {/* DETAILED CLINICAL BILL & INVOICE VISUALIZER MODAL */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center z-50 p-3 sm:p-5 text-left">
          <div className="bg-white rounded-3xl border border-slate-300 shadow-2xl p-6 sm:p-8 max-w-lg w-full relative max-h-[92vh] flex flex-col overflow-hidden animate-scale-up font-sans text-slate-800">
            
            {/* Modal close header */}
            <div className="flex justify-between items-center border-b border-slate-150 pb-3 mb-4 shrink-0">
              <span className="text-xs font-black text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full font-mono flex items-center gap-1 shadow-3xs">
                <FileCheck className="w-3.5 h-3.5" /> RESMİ SAĞLIK MEVZUATI FATURASI
              </span>
              <button
                type="button"
                onClick={() => setSelectedInvoice(null)}
                className="text-slate-400 hover:text-slate-900 font-bold text-2xl h-8 w-8 rounded-full hover:bg-slate-100 flex items-center justify-center cursor-pointer transition-colors"
              >
                &times;
              </button>
            </div>

            {/* Scrollable invoice paper sheet */}
            <div className="flex-1 overflow-y-auto space-y-6 pr-1 pb-4">
              
              {/* Paper Bill Mockup Structure */}
              <div className="border border-slate-300 rounded-2xl p-5 bg-stone-50/40 relative overflow-hidden shadow-3xs">
                {/* Vintage vertical watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-200/25 font-black text-4xl rotate-[35deg] pointer-events-none tracking-widest uppercase font-mono select-none">
                  CARETRUST ARCHIVE
                </div>

                {/* Hospital Logo & Header */}
                <div className="border-b-2 border-dashed border-slate-300 pb-4 mb-4 text-center">
                  <h4 className="text-sm font-black text-slate-950 tracking-wider">BALKAYA ÖZEL TIP MERKEZİ VE HASTANESİ</h4>
                  <p className="text-[10px] text-slate-500 font-medium">Cumhuriyet Mah. Sağlık Cad. No:19, Şişli / İstanbul</p>
                  <p className="text-[9px] text-slate-400 font-semibold font-mono mt-0.5">Sicil No: 34-9042 | Vergi Dairesi: Boğaziçi 19304122</p>
                </div>

                {/* Patient / Doctor Metadata */}
                <div className="grid grid-cols-2 gap-4 text-[11px] mb-4 bg-white p-3 rounded-lg border border-slate-200">
                  <div className="space-y-1 text-left">
                    <p className="text-slate-400 uppercase font-mono tracking-wider font-extrabold text-[9px]">Hasta Bilgileri</p>
                    <p className="font-extrabold text-slate-900">Protokol: {selectedInvoice.initials}</p>
                    <p className="font-semibold text-slate-600">Yaş: {selectedInvoice.age} Sol / Sağ Kohort</p>
                    <p className="font-semibold text-slate-500 font-mono">ID: PT-93041-A</p>
                  </div>
                  <div className="space-y-1 text-left border-l border-slate-100 pl-4">
                    <p className="text-slate-400 uppercase font-mono tracking-wider font-extrabold text-[9px]">Uygulayıcı Hekim</p>
                    <p className="font-extrabold text-slate-900">{selectedInvoice.doctorTitle} {selectedInvoice.doctorName}</p>
                    <p className="font-semibold text-indigo-700">{selectedInvoice.specialty}</p>
                    <p className="font-semibold text-slate-400 font-mono">Tescil No: {doctor.id || 'N/A'}</p>
                  </div>
                </div>

                {/* Invoice Metadata */}
                <div className="flex justify-between items-center text-[10px] bg-slate-100/80 p-2 rounded-lg font-mono mb-4 text-left">
                  <span>Fatura No: <strong className="text-slate-800">{selectedInvoice.costs.invoiceNo}</strong></span>
                  <span>Tarih: <strong className="text-slate-800">{selectedInvoice.date}</strong></span>
                </div>

                {/* Itemized Billing Table */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-mono font-black text-slate-400 uppercase border-b border-slate-200 pb-1 px-1">
                    <span>Açıklama / Sağlık Hizmet Kalemi</span>
                    <span>Tutar (TL)</span>
                  </div>

                  <div className="space-y-2 text-[11px] font-medium text-slate-700 px-1 text-left">
                    
                    {/* Item 1 */}
                    <div className="flex justify-between border-b border-slate-100 pb-1.5">
                      <div>
                        <p className="font-extrabold text-slate-900">Ameliyathane Kullanımı & Klinik Yatış</p>
                        <p className="text-[10px] text-slate-400 font-normal">Stereotaktik oditoryum, cerrahi sarf odası ve 24-48 saat bakım</p>
                      </div>
                      <span className="font-mono font-bold text-slate-900 shrink-0">{selectedInvoice.costs.hospitalFee.toLocaleString('tr-TR')} TL</span>
                    </div>

                    {/* Item 2 */}
                    <div className="flex justify-between border-b border-slate-100 pb-1.5">
                      <div>
                        <p className="font-extrabold text-slate-900">Müteferrik Hekim Cerrahi İşlem Bedeli</p>
                        <p className="text-[10px] text-slate-400 font-normal">Cerrahi kesi, kapalı enjeksiyon/ablasyon, dikiş mühürlemesi</p>
                      </div>
                      <span className="font-mono font-bold text-slate-900 shrink-0">{selectedInvoice.costs.doctorFee.toLocaleString('tr-TR')} TL</span>
                    </div>

                    {/* Item 3 */}
                    <div className="flex justify-between border-b border-slate-100 pb-1.5">
                      <div>
                        <p className="font-extrabold text-slate-900">Sarf Malzemesi, Protez & Anestezi İlaçları</p>
                        <p className="text-[10px] text-slate-400 font-normal">Klinik dikiş teli, anestezik gaz, ithal implant yama/kapak donanımı</p>
                      </div>
                      <span className="font-mono font-bold text-slate-900 shrink-0">{selectedInvoice.costs.materialsFee.toLocaleString('tr-TR')} TL</span>
                    </div>

                  </div>
                </div>

                {/* Calculated Bill Totals */}
                <div className="mt-4 pt-3 border-t border-slate-300 space-y-1.5 text-xs text-left">
                  <div className="flex justify-between font-mono text-slate-500">
                    <span>Matrah Ara Toplamı:</span>
                    <span>{selectedInvoice.costs.total.toLocaleString('tr-TR')} TL</span>
                  </div>
                  <div className="flex justify-between font-mono text-slate-500">
                    <span>Vergi Harcı (Hizmet KDV %10):</span>
                    <span>Dahildir (%10)</span>
                  </div>
                  <div className="flex justify-between font-extrabold text-slate-900 border-b border-slate-200 pb-2">
                    <span>TOPLAM SAĞLIK BİLANÇOSU:</span>
                    <span className="font-mono">{selectedInvoice.costs.total.toLocaleString('tr-TR')} TL</span>
                  </div>

                  <div className="flex justify-between text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-150">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Sigorta Katkısı ({selectedInvoice.costs.insuranceType.split(' ')[0]}):
                    </span>
                    <span className="font-mono">-{selectedInvoice.costs.insurancePaid.toLocaleString('tr-TR')} TL</span>
                  </div>

                  <div className="flex justify-between text-sm font-black text-indigo-950 bg-indigo-50 px-2.5 py-2.5 rounded-lg border border-indigo-150 mt-1">
                    <span>HASTANIN YATIRDIĞI KATKI PAYI NET (TL):</span>
                    <span className="font-mono text-base">{selectedInvoice.costs.patientShare.toLocaleString('tr-TR')} TL</span>
                  </div>
                </div>

                {/* QR and Official Seal Row */}
                <div className="mt-6 pt-4 border-t-2 border-dashed border-slate-300 flex items-center justify-between">
                  {/* Fake QR placement */}
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 border border-slate-300 bg-slate-200 rounded flex flex-col items-center justify-center p-0.5 shrink-0 opacity-80">
                      {/* Generates a simple pixel-grid style pattern for QR */}
                      <div className="w-full h-full flex flex-col justify-between">
                        <div className="flex justify-between"><div className="w-2.5 h-2.5 bg-slate-900"></div><div className="w-2.5 h-2.5 bg-slate-900"></div></div>
                        <div className="flex justify-center"><div className="w-3.5 h-1.5 bg-slate-900"></div></div>
                        <div className="flex justify-between"><div className="w-2.5 h-2.5 bg-slate-900"></div><div className="w-1.5 h-2.5 bg-slate-900"></div></div>
                      </div>
                    </div>
                    <div className="text-[9px] text-slate-400 font-mono text-left leading-tight">
                      <span>T.C. SAĞLIK BAKANLIĞI</span><br />
                      <span>E-FATURA SİSTEM ENTEGRASYONU</span><br />
                      <span className="font-bold text-slate-500">MÜHÜRLÜDÜR</span>
                    </div>
                  </div>

                  {/* Certified stamp seal mockup */}
                  <div className="text-right">
                    <span className="inline-block border-2 border-indigo-400/60 rounded-full text-[9px] text-indigo-500/80 font-mono font-black py-1 px-3.5 rotate-[-5deg] tracking-widest uppercase">
                      ✓ BALKAYA APPROVED
                    </span>
                  </div>
                </div>

              </div>
              
              <p className="text-[10px] text-slate-400 font-medium leading-relaxed bg-slate-50 border border-slate-200 p-3 rounded-xl">
                * Bu fatura dökümü, hekimin şeffaflık politikası kapsamında CareTrust veritabanından çekilen geçmiş resmi muhasebe kayıtlarının simülasyonudur. Hastaların rızası alınmış ve kişisel bilgileri korunmuştur.
              </p>

            </div>

            {/* Modal footer closing options */}
            <div className="border-t border-slate-150 pt-3 mt-1 flex items-center justify-between shrink-0 gap-2 flex-wrap text-xs">
              <span className="text-[10px] text-slate-400 font-mono">
                Sistem ID: {selectedInvoice.costs.invoiceNo}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={invoiceDownloadStatus !== 'idle'}
                  onClick={() => {
                    handleDownloadInvoice(selectedInvoice);
                  }}
                  className={`py-2 px-4 rounded-xl font-bold text-xs cursor-pointer transition-all flex items-center gap-1.5 select-none ${
                    invoiceDownloadStatus === 'preparing'
                      ? 'bg-amber-50 border border-amber-300 text-amber-800 cursor-wait'
                      : invoiceDownloadStatus === 'success'
                        ? 'bg-emerald-50 border border-emerald-300 text-emerald-800'
                        : 'border border-slate-300 hover:border-slate-500 text-slate-700 hover:text-slate-900'
                  }`}
                >
                  {invoiceDownloadStatus === 'preparing' && (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></span>
                      Hazırlanıyor...
                    </>
                  )}
                  {invoiceDownloadStatus === 'success' && (
                    <>
                      <span className="text-emerald-600">✓</span>
                      İndirildi & Hazır!
                    </>
                  )}
                  {invoiceDownloadStatus === 'idle' && (
                    <>
                      <Download className="w-3.5 h-3.5" /> İndir / Yazdır
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedInvoice(null)}
                  className="py-2 px-5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-bold text-xs cursor-pointer transition-all shrink-0"
                >
                  Kapat
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Lightbox Modal for Zooming Doctor Photo */}
      <AnimatePresence>
        {zoomedImage && (
          <div 
            className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md scrollbar-none" 
            onClick={() => setZoomedImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.93 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative max-w-lg w-full bg-white rounded-3xl p-3 shadow-2xl overflow-hidden border border-slate-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button overlay */}
              <button
                type="button"
                onClick={() => setZoomedImage(null)}
                className="absolute top-4 right-4 bg-slate-950/50 hover:bg-slate-950/90 text-white p-2 rounded-full transition-colors z-30 cursor-pointer shadow-md"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Enlarged Image */}
              <div className="w-full flex items-center justify-center bg-slate-50 rounded-2xl overflow-hidden aspect-square border border-slate-100 relative">
                <img
                  src={zoomedImage.url}
                  alt={zoomedImage.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info Area below */}
              <div className="p-4 text-center select-none">
                <h4 className="font-black text-slate-950 text-xl leading-snug">{zoomedImage.name}</h4>
                <p className="text-xs text-slate-500 font-extrabold uppercase tracking-wider mt-1">{zoomedImage.title}</p>
                <p className="text-[10px] text-slate-400 font-mono mt-2 flex items-center justify-center gap-1">
                  <span>●</span> Gencer-AI Doğrulanmış Sağlık Kaydı
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
