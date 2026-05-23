import { useState, useMemo } from 'react';
import { Doctor } from '../types';
import { SPECIALTIES, SYMPTOMS_MAPPING, CITIES } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Sliders, 
  Award, 
  CheckCircle2, 
  ChevronRight, 
  Stethoscope, 
  ArrowRight, 
  Sparkles,
  RefreshCw,
  Heart,
  Building2,
  Brain,
  Calendar,
  Filter,
  ArrowUpDown,
  User,
  AlertTriangle,
  ZoomIn,
  X
} from 'lucide-react';

interface HomeViewProps {
  doctors: Doctor[];
  onSelectDoctor: (doctor: Doctor) => void;
  onSubmitExperience: (doctor: Doctor) => void;
}

export function HomeView({ doctors, onSelectDoctor, onSubmitExperience }: HomeViewProps) {
  // Advanced Search & Filter States
  const [textQuery, setTextQuery] = useState<string>('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Tümü');
  const [selectedSymptom, setSelectedSymptom] = useState<string>('Tümü');
  const [selectedCity, setSelectedCity] = useState<string>('Tümü');
  const [hospitalQuery, setHospitalQuery] = useState<string>('');
  const [selectedAgeRange, setSelectedAgeRange] = useState<string>('Tümü');
  const [minCredibility, setMinCredibility] = useState<number>(50);
  const [sortBy, setSortBy] = useState<string>('credibility');
  const [zoomedImage, setZoomedImage] = useState<{ url: string; name: string; title: string } | null>(null);

  // AI Symptom Analyzer States
  const [symptomText, setSymptomText] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<{
    branch: string;
    explanation: string;
    precaution: string;
    matchedKeywords: string[];
  } | null>(null);
  const [analysisError, setAnalysisError] = useState<string>('');

  // Sık aranan hastaneler (quick search shortcut)
  const hospitalShortcuts = ['Acıbadem', 'Memorial', 'Medipol', 'Liv Hospital', 'Amerikan Hastanesi'];

  // Dynamic symptoms list based on chosen specialty
  const availableSymptoms = useMemo(() => {
    if (selectedSpecialty === 'Tümü') {
      const all: string[] = [];
      Object.values(SYMPTOMS_MAPPING).forEach(syms => {
        syms.forEach(s => {
          if (!all.includes(s)) all.push(s);
        });
      });
      return all;
    }
    return SYMPTOMS_MAPPING[selectedSpecialty] || [];
  }, [selectedSpecialty]);

  // Handle specialty tag click
  const handleSpecialtyTagClick = (spec: string) => {
    if (selectedSpecialty === spec) {
      setSelectedSpecialty('Tümü');
      setSelectedSymptom('Tümü');
    } else {
      setSelectedSpecialty(spec);
      setSelectedSymptom('Tümü');
    }
  };

  // Run Gemini Symptom Analyzer
  const handleSymptomAnalysis = async () => {
    if (!symptomText.trim()) return;
    setIsAnalyzing(true);
    setAnalysisError('');
    setAnalysisResult(null);

    try {
      const res = await fetch('/api/symptom-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms: symptomText }),
      });

      if (!res.ok) {
        throw new Error('Semptom analizi gerçekleştirilirken bir sunucu hatası oluştu.');
      }

      const data = await res.json();
      setAnalysisResult(data);

      // Automatically apply the AI matched medical specialty filter
      if (data.branch) {
        setSelectedSpecialty(data.branch);
        setSelectedSymptom('Tümü');
      }
    } catch (err: any) {
      setAnalysisError(err.message || 'Yapay zeka analizörüne erişilemedi. Lütfen internet durumunuzu veya API yapılandırmanızı kontrol edin.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Clear all analytical state
  const resetFilters = () => {
    setTextQuery('');
    setSelectedSpecialty('Tümü');
    setSelectedSymptom('Tümü');
    setSelectedCity('Tümü');
    setHospitalQuery('');
    setSelectedAgeRange('Tümü');
    setMinCredibility(50);
    setSortBy('credibility');
    setAnalysisResult(null);
    setSymptomText('');
  };

  // Filtered and sorted list of doctors
  const filteredAndSortedDoctors = useMemo(() => {
    // 1. Filter
    const filtered = doctors.filter(doc => {
      // General free-text keyword matching (search bar)
      const keyword = textQuery.trim().toLowerCase();
      const matchKeyword = keyword === '' || 
        doc.name.toLowerCase().includes(keyword) ||
        doc.title.toLowerCase().includes(keyword) ||
        doc.specialty.toLowerCase().includes(keyword) ||
        doc.hospital.toLowerCase().includes(keyword) ||
        (doc.about && doc.about.toLowerCase().includes(keyword)) ||
        (doc.specialInterests && doc.specialInterests.some(interest => interest.toLowerCase().includes(keyword)));

      const matchSpecialty = selectedSpecialty === 'Tümü' || doc.specialty === selectedSpecialty;
      const matchCity = selectedCity === 'Tümü' || doc.city === selectedCity;
      const matchCredibility = doc.credibilityRating >= minCredibility;
      const matchHospital = hospitalQuery.trim() === '' || doc.hospital.toLowerCase().includes(hospitalQuery.toLowerCase());

      // Semptom eşleştirme
      let matchSymptom = true;
      if (selectedSymptom !== 'Tümü') {
        const symptomsForDocSpecialty = SYMPTOMS_MAPPING[doc.specialty] || [];
        matchSymptom = symptomsForDocSpecialty.includes(selectedSymptom);
      }

      // Hekim Yaş aralığı eşleştirme
      let matchAge = true;
      if (selectedAgeRange === '30-45') {
        matchAge = doc.age >= 30 && doc.age <= 45;
      } else if (selectedAgeRange === '46-59') {
        matchAge = doc.age >= 46 && doc.age <= 59;
      } else if (selectedAgeRange === '60-plus') {
        matchAge = doc.age >= 60;
      }

      return matchKeyword && matchSpecialty && matchCity && matchCredibility && matchHospital && matchSymptom && matchAge;
    });

    // 2. Sort
    return [...filtered].sort((a, b) => {
      if (sortBy === 'credibility') {
        return b.credibilityRating - a.credibilityRating;
      } else if (sortBy === 'treatments') {
        return b.verifiedTreatments - a.verifiedTreatments;
      } else if (sortBy === 'satisfaction') {
        return b.satisfactionRate - a.satisfactionRate;
      } else if (sortBy === 'ageAsc') {
        return a.age - b.age;
      } else if (sortBy === 'ageDesc') {
        return b.age - a.age;
      }
      return 0;
    });
  }, [doctors, textQuery, selectedSpecialty, selectedSymptom, selectedCity, hospitalQuery, selectedAgeRange, minCredibility, sortBy]);

  return (
    <div className="py-6">
      {/* 1. Hero banner */}
      <section className="relative overflow-hidden bg-slate-50 border border-slate-200/60 shadow-xs py-12 lg:py-14 mb-8 rounded-3xl mx-4 sm:mx-6 lg:mx-8">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-15"></div>
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-900 text-[10px] font-bold uppercase tracking-wider mb-5 border border-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            BAĞIMSIZ SAĞLIK DOĞRULAMA SİSTEMİ
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Gerçek Klinik Deneyimlerle <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Onaylı Hekimlere</span> Güvenle Ulaşın
          </h1>
          <p className="text-sm sm:text-base text-slate-650 max-w-3xl mx-auto leading-relaxed mb-6">
            CareTrust, sponsorlu reklamları ve manipüle edilen yorumları devre dışı bırakır. Hastaların resmi evraklarla (fatura & epikriz) teyit edilmiş tedavi yolculuklarını, tarafsız medikal sicil skorlarıyla sunar.
          </p>

          <div className="flex flex-wrap justify-center gap-5 items-center text-xs font-mono text-slate-500 font-semibold">
            <span className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-xs"></span> %100 Resmi Kimlik Teftişli
            </span>
            <span className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-xs"></span> Epikriz/Fatura Kontrollü
            </span>
            <span className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-xs"></span> Bağımsız Güvenlik Skoru
            </span>
          </div>
        </div>
      </section>

      {/* 2. Gemini-Powered Smart Symptom Analyzer (Module 3) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-slate-950 text-white rounded-3xl border border-slate-800 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-indigo-900/15 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="p-6 sm:p-8 relative z-10">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-550/25">
                <Brain className="w-5.5 h-5.5 text-white" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block font-mono">CareAI - Klinik Yapay Zeka</span>
                <h3 className="text-base font-bold text-white tracking-tight">Gemini Akıllı Semptom Analizör & Branş Rehberi</h3>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed mb-6 max-w-3xl">
              Şikayetlerinizi, hissettiğiniz ağrıları veya semptomları aşağıdaki alana doğal dilde uzunca yazın. Gemini AI tıp arşivimizi tarayarak gitmeniz gereken en uygun ihtisas branşını belirleyecek, süzgeci otomatik ayarlayacak ve hekim önerisinde bulunacaktır.
            </p>

            <div className="flex flex-col md:flex-row gap-4 items-stretch">
              <div className="flex-1">
                <textarea
                  value={symptomText}
                  onChange={(e) => setSymptomText(e.target.value)}
                  placeholder="Örnek: Yaklaşık 3 gündür yokuş çıkarken veya merdiven tırmanırken göğsümün ortasında baskı ve sıkışma hissi ulaşıyor, durunca geçiyor. Hangisine gitmeliyim?"
                  rows={3}
                  className="w-full text-sm rounded-2xl border border-slate-800 bg-slate-900 text-slate-100 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 placeholder:text-slate-500 leading-relaxed resize-none shadow-inner"
                ></textarea>
              </div>
              <div className="flex flex-col justify-end">
                <button
                  type="button"
                  onClick={handleSymptomAnalysis}
                  disabled={isAnalyzing || !symptomText.trim()}
                  className="h-12 md:h-full md:min-h-24 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-900/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-98 cursor-pointer"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Analiz Ediliyor...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 animate-pulse text-yellow-300" />
                      <span>Semptom Analizini Başlat</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {analysisError && (
              <div className="mt-4 p-3 bg-red-950/40 border border-red-900/60 rounded-xl text-red-200 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <p>{analysisError}</p>
              </div>
            )}

            {/* AI Analysis Result Display Card */}
            {analysisResult && (
              <div className="mt-6 bg-slate-900/90 border border-slate-800 rounded-2.5xl p-5 lg:p-6 animate-fade-in relative">
                <div className="absolute top-4 right-4 text-[10px] font-bold text-blue-400 bg-blue-950/80 border border-blue-900/60 px-3 py-1 rounded-full font-mono uppercase">
                  Yapay Zeka Klinik Önerisi
                </div>
                
                <h4 className="text-sm font-bold text-slate-300 tracking-wider uppercase mb-3 flex items-center gap-1.5">
                  <Stethoscope className="w-4.5 h-4.5 text-blue-500" />
                  Ön Teşhis ve Branş Haritalandırması
                </h4>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    <div>
                      <span className="text-xs text-slate-500">Tavsiye Edilen Tıbbi Birim:</span>
                      <p className="text-lg font-extrabold text-white flex items-center gap-2 mt-0.5">
                        <span className="inline-block h-2 w-2 rounded-full bg-blue-500"></span>
                        {analysisResult.branch} Uzmanlığı
                      </p>
                    </div>

                    <div className="border-l-3 border-blue-500/50 pl-4 py-1">
                      <span className="text-xs text-slate-500 font-semibold block mb-0.5">Semptomların Klinik İncelemesi:</span>
                      <p className="text-xs text-slate-350 leading-relaxed">{analysisResult.explanation}</p>
                    </div>

                    <div>
                      <span className="text-xs text-amber-500 font-bold block mb-1 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        Medikal Tedbirler & Sınırlama Bilgisi:
                      </span>
                      <p className="text-xs text-slate-400 leading-relaxed font-semibold italic">{analysisResult.precaution}</p>
                    </div>
                  </div>

                  <div className="bg-slate-950/50 rounded-2xl p-4 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2 font-mono">Tespit Edilen Belirteçler</span>
                      <div className="flex flex-wrap gap-1.5">
                        {analysisResult.matchedKeywords.map((k, i) => (
                          <span key={i} className="text-[10px] bg-slate-800/80 text-blue-300 border border-slate-700/50 px-2 py-0.5 rounded-md font-medium">
                            #{k}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 border-t border-slate-800 pt-4">
                      <p className="text-[11px] text-slate-400 leading-snug">
                        Sistem filtreleri otomatik olarak <strong>{analysisResult.branch}</strong> birimine göre sınırlandı. Aşağıda bu branştaki onaylı hekimlerimizi inceleyebilir ve randevu alabilirsiniz.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Interactive Search & Filters Area (Module 1) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8" id="sorgulama-paneli">
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 sm:p-8">
          
          {/* Header row with search query term */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-2 shrink-0">
              <Sliders className="w-5 h-5 text-blue-600" />
              <div>
                <h2 className="text-base font-extrabold text-slate-900">
                  Gelişmiş Tıbbi Sicil ve Filtreleme Paneli
                </h2>
                <p className="text-[11px] text-slate-400 font-medium">Uzmanlık branşı, semptom, hekim yaşı, hastane ve güvenilirlik veritabanı taraması</p>
              </div>
            </div>

            {/* Instant text search input */}
            <div className="flex-1 max-w-xl relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="İsim, ünvan, uzmanlık, vaka veya ilgi alanı içinde kelime ara..."
                value={textQuery}
                onChange={(e) => setTextQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-10 rounded-xl border border-slate-250 bg-slate-50/50 text-slate-850 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-slate-400 placeholder:font-normal transition-all"
              />
              {textQuery && (
                <button
                  onClick={() => setTextQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-bold text-sm"
                >
                  &times;
                </button>
              )}
            </div>

            <button
              onClick={resetFilters}
              className="text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1.5 self-end lg:self-center bg-slate-50 hover:bg-slate-100 px-3 py-2 rounded-xl border border-slate-200 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Tüm Filtreleri Temizle
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            
            {/* Specialty Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 font-mono">
                <Stethoscope className="w-3.5 h-3.5 text-blue-500" />
                Ana Uzmanlık Alanı
              </label>
              <select
                value={selectedSpecialty}
                onChange={(e) => {
                  setSelectedSpecialty(e.target.value);
                  setSelectedSymptom('Tümü'); // Reset symptom on specialty change
                }}
                className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
              >
                <option value="Tümü">Tüm Uzmanlıklar ({SPECIALTIES.length})</option>
                {SPECIALTIES.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>

            {/* Symptom Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 font-mono">
                <Filter className="w-3.5 h-3.5 text-blue-500" />
                Spesifik Belirti / Semptom
              </label>
              <select
                value={selectedSymptom}
                onChange={(e) => setSelectedSymptom(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
              >
                <option value="Tümü">
                  {selectedSpecialty === 'Tümü' ? 'Tüm Semptomlar' : `Belirtiler (${availableSymptoms.length})`}
                </option>
                {availableSymptoms.map(sym => (
                  <option key={sym} value={sym}>{sym}</option>
                ))}
              </select>
            </div>

            {/* Location Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 font-mono">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                İstanbul İlçe Bölge
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
              >
                <option value="Tümü">Tüm İstanbul İlçeleri</option>
                {CITIES.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Hospital Search */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 font-mono">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                Hastane Grubu / Kurum
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Örn: Acıbadem, Memorial..."
                  value={hospitalQuery}
                  onChange={(e) => setHospitalQuery(e.target.value)}
                  className="w-full h-11 pl-3 pr-8 rounded-xl border border-slate-200 bg-white text-slate-800 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
                {hospitalQuery && (
                  <button
                    type="button"
                    onClick={() => setHospitalQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold"
                  >
                    &times;
                  </button>
                )}
              </div>
            </div>

            {/* Hekim Yaş Sınıflandırması (Module 1 Requirement) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 font-mono">
                <User className="w-3.5 h-3.5 text-slate-400" />
                Hekim Yaş Aralığı
              </label>
              <select
                value={selectedAgeRange}
                onChange={(e) => setSelectedAgeRange(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
              >
                <option value="Tümü">Tüm Yaşlar</option>
                <option value="30-45">30 - 45 Yaş Arası (Yükselen Değer)</option>
                <option value="46-59">46 - 59 Yaş Arası (Klinik Olgunluk)</option>
                <option value="60-plus">60+ Yaş Üstü (Kıdemli Profesörlük)</option>
              </select>
            </div>

            {/* Sorting Metric (Module 1 Requirement) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 font-mono">
                <ArrowUpDown className="w-3.5 h-3.5 text-indigo-500" />
                Öncelikli Sıralama
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-indigo-200 bg-indigo-50/20 text-indigo-900 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
              >
                <option value="credibility">🛡️ Güven Skoru (En Yüksek)</option>
                <option value="treatments">📊 Doğrulu Vaka Sayısı</option>
                <option value="satisfaction">⭐ Hasta Memnuniyeti</option>
                <option value="ageAsc">👶 Hekim Yaşı (En Genç)</option>
                <option value="ageDesc">👵 Hekim Yaşı (En Olgun)</option>
              </select>
            </div>

          </div>

          {/* Quick Hospital Shortcuts */}
          <div className="flex flex-wrap items-center gap-2 mt-4 text-xs">
            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] font-mono mr-1">Kurum Kısayolları:</span>
            {hospitalShortcuts.map(hn => (
              <button
                key={hn}
                onClick={() => setHospitalQuery(hn)}
                className="px-2.5 py-1 text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 border border-slate-200 rounded-lg text-[11px] font-medium transition-all"
              >
                {hn}
              </button>
            ))}
          </div>

          {/* Range Slider for Credibility Threshold */}
          <div className="mt-5 border-t border-slate-55 shadow-inner p-3 bg-slate-50/70 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs">
              <p className="font-bold text-slate-800 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-600 animate-pulse" />
                Asgari Güvenlik Skoru Filtresi (CareTrust Sicil Onayı)
              </p>
              <p className="text-[11px] text-slate-500 font-medium">Birimlerin teyit hızı ve hastaların doğruluk belgeleri oranına göre hesaplanan asgari kredi skoru.</p>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-80 justify-end shrink-0">
              <input
                type="range"
                min="50"
                max="98"
                step="1"
                value={minCredibility}
                onChange={(e) => setMinCredibility(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <span className="text-emerald-800 bg-emerald-150 px-3 py-1 rounded-xl text-xs font-mono font-extrabold tracking-wider shrink-0 border border-emerald-300">
                &ge; %{minCredibility} Skor
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Trending Specialties Horizontal List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Sık Aranan Tıbbi Birimler</h3>
        <div className="flex flex-wrap gap-2">
          {SPECIALTIES.map(spec => {
            const isActive = selectedSpecialty === spec;
            return (
              <button
                key={spec}
                onClick={() => handleSpecialtyTagClick(spec)}
                className={`py-2 px-4 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-150 flex items-center gap-1.5 border ${
                  isActive
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 shadow-2xs'
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-blue-500'}`}></span>
                {spec}
              </button>
            );
          })}
        </div>
      </section>

      {/* 5. Filter Results Status Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5">
        <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3">
          <p className="font-semibold text-slate-650">
            Kriterlerinize uyan <strong className="text-slate-900 font-bold font-mono bg-blue-50 border border-blue-150 px-2 py-0.5 rounded ml-1 mr-1">{filteredAndSortedDoctors.length}</strong> doğrulanmış uzman hekim listeleniyor
          </p>
          <p className="hidden sm:inline font-mono text-[10px] text-slate-400">CareTrust Güven Protokolü SHA-256 Onaylı Veri</p>
        </div>
      </section>

      {/* 6. Doctor Mini-Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredAndSortedDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedDoctors.map(doctor => (
              <div
                key={doctor.id}
                className="bg-white rounded-2xl border border-slate-200/70 shadow-xs hover:shadow-xl hover:border-slate-350 transition-all duration-300 group flex flex-col overflow-hidden"
              >
                {/* Doctor Visual Header */}
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <img
                    src={doctor.imageUrl}
                    referrerPolicy="no-referrer"
                    alt={doctor.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      setZoomedImage({ url: doctor.imageUrl, name: doctor.name, title: doctor.title });
                    }}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300 cursor-zoom-in"
                  />
                  
                  {/* Hover Zoom Overlay Badge */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setZoomedImage({ url: doctor.imageUrl, name: doctor.name, title: doctor.title });
                    }}
                    className="absolute top-4 left-4 bg-slate-900/70 hover:bg-slate-950/90 border border-white/10 text-white rounded-xl p-2 transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer flex items-center gap-1 shadow-md scale-90 group-hover:scale-100 z-10"
                    title="Fotoğrafı Büyüt"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </div>

                  {/* Verified Credibility Badge */}
                  <div 
                    onClick={() => onSelectDoctor(doctor)}
                    className="absolute top-4 right-4 bg-emerald-950/90 backdrop-blur-md text-emerald-50 text-[10px] sm:text-xs px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 border border-emerald-500/25 shadow-lg cursor-pointer z-10"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shadow-xs" />
                    <span>%{doctor.credibilityRating} Güven Endeksi</span>
                  </div>

                  {/* Gradient Overlay and Text */}
                  <div 
                    onClick={() => onSelectDoctor(doctor)}
                    className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent p-4 flex flex-col justify-end cursor-pointer z-10 pb-4"
                  >
                    <span className="text-[10px] font-extrabold uppercase tracking-wide text-blue-305">{doctor.specialty}</span>
                    <h3 className="font-extrabold text-white text-base leading-tight mt-0.5">{doctor.name}</h3>
                    <p className="text-[11px] font-medium text-slate-300">{doctor.title}</p>
                  </div>
                </div>

                {/* Doctor Meta Info */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="flex flex-col gap-3">
                    {/* Hospital & Location */}
                    <div className="flex flex-col gap-0.5">
                      <p className="text-xs font-bold text-slate-700 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        {doctor.hospital}
                      </p>
                      <p className="text-[11px] text-slate-500 font-semibold flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {doctor.city}
                      </p>
                    </div>

                    {/* Quick Stats Data Grid */}
                    <div className="grid grid-cols-4 gap-1 sm:gap-1.5 bg-slate-50 p-2.5 rounded-xl text-center border border-slate-100">
                      <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Doğrulu Vaka</p>
                        <p className="text-xs font-black text-slate-800 font-mono mt-0.5">+{doctor.verifiedTreatments}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Klinik Yıl</p>
                        <p className="text-xs font-black text-slate-800 font-mono mt-0.5">{doctor.experienceYears} Yıl</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Memnuniyet</p>
                        <p className="text-xs font-black text-slate-800 font-mono mt-0.5">%{doctor.satisfactionRate}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Hekim Yaşı</p>
                        <p className="text-xs font-black text-slate-800 font-mono mt-0.5">{doctor.age}</p>
                      </div>
                    </div>

                    {/* Sub-text preview highlighting AI matching if the brand filters */}
                    {analysisResult && doctor.specialty === analysisResult.branch && (
                      <div className="mt-1 bg-blue-50/50 p-2.5 rounded-lg text-[11px] text-blue-900 border border-blue-100 flex items-start gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <p className="font-semibold leading-relaxed">Şikayetlerinizle eşleşen tıbbi profil! Hekim biyografisini analiz edin.</p>
                      </div>
                    )}

                    {/* Highlighted Verified Review Statement */}
                    {doctor.reviews.length > 0 && (
                      <div className="border-l-2 border-emerald-500 pl-3 py-1.5 bg-emerald-50/30 rounded-r-lg">
                        <p className="text-[9px] font-extrabold text-emerald-800 uppercase tracking-widest flex items-center gap-1 font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Onaylı Hasta Deneyimi
                        </p>
                        <p className="text-xs text-slate-650 line-clamp-2 italic mt-0.5">
                          "{doctor.reviews[0].summary}"
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions Row */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => onSelectDoctor(doctor)}
                      className="flex-1 h-10 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-md shadow-slate-950/10 active:scale-98 transition-all cursor-pointer"
                    >
                      Profili Analiz Et
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => onSubmitExperience(doctor)}
                      className="h-10 px-3 rounded-xl border border-slate-200 text-slate-600 hover:border-slate-350 hover:bg-slate-50 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      title="Geçirdiğiniz tedavi deneyimini güvenli ağda doğrulayarak ekleyin"
                    >
                      <Heart className="w-4 h-4 text-emerald-600 fill-emerald-50" />
                      Yorum Yaz
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-dashed border-slate-250 py-16 text-center max-w-xl mx-auto px-6 shadow-sm">
            <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <Sliders className="w-6 h-6 text-slate-400 font-bold" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base mb-2">Seçilen Filtrelere Uygun Hekim Bulunamadı</h3>
            <p className="text-slate-550 text-xs mb-6 leading-relaxed">
              Aradığınız yaş grubunda, kurumda veya güven eşiğinde uyuşan hekim şu an sistemde bulunmuyor. Lütfen asgari güvenilirlik skoru sınırını kaydırarak düşürün veya farklı bir ilçe/semptom belirtin.
            </p>
            <button
              onClick={resetFilters}
              className="py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              Filtreleri Sıfırla
            </button>
          </div>
        )}
      </section>

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
