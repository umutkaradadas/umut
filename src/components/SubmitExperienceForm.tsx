import { useState, ChangeEvent, FormEvent } from 'react';
import { Doctor, Review, JourneyPhase } from '../types';
import { 
  FileText, 
  Calendar, 
  User, 
  Sliders, 
  Star, 
  Upload, 
  Lock, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Check
} from 'lucide-react';

interface SubmitExperienceFormProps {
  doctors: Doctor[];
  selectedDoctorId?: string;
  onClose: () => void;
  onAddReview: (doctorId: string, review: Review) => void;
  onNavigateToDoctor: (doctor: Doctor) => void;
}

export function SubmitExperienceForm({ 
  doctors, 
  selectedDoctorId, 
  onClose, 
  onAddReview,
  onNavigateToDoctor
}: SubmitExperienceFormProps) {
  
  // Doctor Selection (pre-selected or fallback to first doctor)
  const [chosenDocId, setChosenDocId] = useState<string>(selectedDoctorId || doctors[0]?.id || '');
  const [treatmentDate, setTreatmentDate] = useState<string>('2026-05-15');
  const [treatmentType, setTreatmentType] = useState<string>('Minimal İnvaziv Ayakta Tedavi Süreci');

  // Slider Ratings
  const [explanation, setExplanation] = useState<number>(5);
  const [success, setSuccess] = useState<number>(5);
  const [postOp, setPostOp] = useState<number>(5);

  // Summary and Text Body
  const [reviewSummary, setReviewSummary] = useState<string>('Kapsamlı takip süreci ve ağrısız rehabilitasyonla olağanüstü deneyim.');
  const [reviewBody, setReviewBody] = useState<string>('Teşhis aşamasından, cerrahi işleme ve taburculuğa kadar tüm tedavi süreci mükemmeldi. İletişim doğrudan, empatik ve gelişmiş takip sistemleriyle desteklenmişti.');

  // Journey Phases
  const [phase1Text, setPhase1Text] = useState<string>('Hekim, operasyonun risklerini 3 boyutlu modellemeler ve bilimsel verilerle son derece net açıkladı. Kendimi rahat ve hazır hissettim.');
  const [phase2Text, setPhase2Text] = useState<string>('Ameliyet büyük bir hassasiyet ve başarıyla tamamlandı. Ağrılarım, hedef odaklı modern yöntemlerle tamamen önlendi.');
  const [phase3Text, setPhase3Text] = useState<string>('Günlük ev takibiyle iyileşme safhalarım adım adım kontrol edildi. %100 sağlığıma ve eski hareket kapasiteme kavuştum.');

  // Mock Upload state
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isEncrypted, setIsEncrypted] = useState<boolean>(false);

  // Wizard Navigation
  const [step, setStep] = useState<number>(1);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [generatedReview, setGeneratedReview] = useState<Review | null>(null);

  const selectedDoctor = doctors.find(d => d.id === chosenDocId) || doctors[0];

  const handleNextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // Mock Uploader
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB'
      });
      simulateUpload();
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(10);
    setIsEncrypted(false);

    const int1 = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(int1);
          setIsUploading(false);
          setIsEncrypted(true);
          return 100;
        }
        return prev + 30;
      });
    }, 200);
  };

  const triggerMockFileDrop = () => {
    setUploadedFile({
      name: `Teyitli-Tedavi-Belgesi_Hashed_${Math.floor(Math.random() * 8000 + 1000)}.pdf`,
      size: '2.4 MB'
    });
    simulateUpload();
  };

  const getSliderMeaning = (val: number) => {
    if (val === 5) return 'Mükemmel ve Örnek Standart (5/5)';
    if (val === 4) return 'Çok İyi ve Güvenli Tedavi (4/5)';
    if (val === 3) return 'Yeterli ve Standart Hizmet (3/5)';
    if (val === 2) return 'Bazı Aksaklıklar Yaşandı (2/5)';
    return 'Ciddi Memnuniyetsizlik (1/5)';
  };

  // Submit Experience Data
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Create a beautifully formatted Review object
    const newReviewId = `rev-${Date.now()}`;
    const mockHashSuffix = Math.floor(Math.random() * 900000 + 100000);
    
    const submittedReview: Review = {
      id: newReviewId,
      treatmentType: treatmentType,
      patientIdCode: `Hasta Protokol Kodu #TR-${mockHashSuffix} — Merkez Sağlık Havuzunda Onaylandı`,
      verified: true,
      verifiedWithDocument: true,
      docFileName: uploadedFile ? uploadedFile.name : 'Teyitli_Evrak.pdf',
      date: new Date().toISOString().split('T')[0],
      summary: reviewSummary,
      text: reviewBody,
      ratings: {
        explanation: explanation,
        success: success,
        postOp: postOp
      },
      journey: [
        {
          phase: 'Etap 1: Teşhis ve Operasyon Öncesi Hazırlık',
          title: 'İlk Muayene ve Karar Süreci',
          text: phase1Text
        },
        {
          phase: 'Etap 2: Aktif Müdahale / Ameliyat Günü',
          title: 'Operasyonun Başarı Derecesi',
          text: phase2Text
        },
        {
          phase: 'Etap 3: Ameliyat Sonrası Evde Takip ve İyileşme',
          title: 'Yeniden Sağlıklı Yaşam',
          text: phase3Text
        }
      ]
    };

    onAddReview(chosenDocId, submittedReview);
    setGeneratedReview(submittedReview);
    setIsCompleted(true);
  };

  // SUCCESS SCREEN
  if (isCompleted && generatedReview) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12 text-center animate-fade-in">
        <div className="h-20 w-20 rounded-2xl bg-gradient-to-tr from-emerald-50 to-emerald-600 flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-emerald-200">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-single">
          Tedavi Deneyimi Kaydı Başarıyla Oluşturuldu!
        </h2>
        
        <p className="text-sm text-slate-500 mt-2">
          Geri bildiriminiz başarıyla şifrelenerek veri defterine işlendi. Kimliğiniz tamamen gizli tutularak, {selectedDoctor?.name} adlı doktorumuzun güvenilirlik analizine hassasiyetle yansıtıldı.
        </p>

        {/* Transaction Summary Card */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mt-6 mb-8 text-left space-y-3 font-mono text-xs text-slate-600">
          <div className="flex justify-between">
            <span className="font-bold text-slate-400">Veri Sicil Durumu:</span>
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> AKTİF VE MÜHÜRLÜ
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-slate-400">Hasta Dijital İmzası:</span>
            <span className="text-slate-900 font-semibold">{generatedReview.patientIdCode.split(' — ')[0]}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-slate-400">Tedavi Eden Hekim:</span>
            <span className="text-slate-950 font-bold">{selectedDoctor?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-slate-400">Genel Değerlendirme:</span>
            <span className="text-amber-600 font-extrabold flex items-center gap-1">
              ★ {((explanation + success + postOp) / 3).toFixed(1)} / 5.0
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => onNavigateToDoctor(selectedDoctor)}
            className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-100 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            Hekim Profiline Canlı Dön
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer transition-all"
          >
            Hekim Dizinine Geri Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Container header info */}
      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-none mb-2 text-center">
        Onaylı Tedavi Yolculuğunu Raporla
      </h2>
      <p className="text-slate-500 text-xs sm:text-sm text-center mb-8 max-w-lg mx-auto leading-relaxed">
        Güvenli bir tedavi anketi işleyerek binlerce hastaya dürüst bilgi sağlayın. Girişlerin onaylanması için reçete, eczane kaydı veya ameliyat faturası benzeri dijital belgeniz gizli taranacaktır.
      </p>

      {/* Progress Multi-Step Tracker Slider */}
      <div className="mb-8 select-none">
        <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3.5">
          <span>DOĞRULAMA ADIMI {step} / 4</span>
          <span className="text-blue-600">
            {step === 1 && 'Tedavi Görülen Hekim ve Tarih'}
            {step === 2 && 'Değerlendirme Puan Ölçeği'}
            {step === 3 && 'Adım Adım Tedavi Günlüğünüz'}
            {step === 4 && 'Belge Kanıtı ve Şifreli Onay'}
          </span>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-300" 
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Main wizard frame */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-lg p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* STEP 1: DOCTOR SELECT & DATE */}
          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex items-center gap-3 border-b border-slate-50 pb-4 mb-4">
                <div className="p-2 rounded-lg bg-blue-5 border border-blue-100">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Tedavi Gördüğünüz Hekimi Seçin</h3>
                  <p className="text-[11px] text-slate-400">Sisteme kayıtlı güvenilir uzman hekimler</p>
                </div>
              </div>

              {/* Selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">İlgili Uzman Hekim</label>
                <select
                  value={chosenDocId}
                  onChange={(e) => setChosenDocId(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  {doctors.map(d => (
                    <option key={d.id} value={d.id}>{d.name} ({d.specialty} — {d.hospital})</option>
                  ))}
                </select>
              </div>

              {/* Treatment Type Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Uygulanan Birincil Tedavi / Ameliyatın Adı</label>
                <input
                  type="text"
                  required
                  value={treatmentType}
                  onChange={(e) => setTreatmentType(e.target.value)}
                  placeholder="Örn: TAVI Operasyonu, Katarakt Ameliyatı, Parkinson Beyin Pili"
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-850 text-sm font-semibold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              {/* Date Input */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-450" />
                    Tedavi veya İşlem Tarihi
                  </label>
                  <input
                    type="date"
                    required
                    value={treatmentDate}
                    onChange={(e) => setTreatmentDate(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-medium"
                  />
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-blue-50/50 border border-blue-100/40 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-blue-600 shrink-0" />
                  <p className="text-[11px] text-blue-800 leading-normal font-semibold">
                    Sağlık bilgilerinin fatura/randevu kaydıyla eşleşmesi için işlem ayının doğru belirtilmesi önemlidir.
                  </p>
                </div>
              </div>
            </div>
          )}


          {/* STEP 2: EXPERIENCE SLIDERS */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3 border-b border-slate-50 pb-4 mb-4">
                <div className="p-2 rounded-lg bg-blue-5 border border-blue-100">
                  <Sliders className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Doğrulanabilir İyileşme Metrikleri</h3>
                  <p className="text-[11px] text-slate-400">Tedavinin objektif faydalarını derecelendirin</p>
                </div>
              </div>

              {/* Slider 1 */}
              <div className="space-y-2 bg-slate-50/50 p-4 border border-slate-100 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Hekimin Tedavi Anlatımı ve Yaklaşımı</span>
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md font-mono">
                    {getSliderMeaning(explanation)}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={explanation}
                  onChange={(e) => setExplanation(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <p className="text-[10px] text-slate-400">Hekimin ameliyat öncesi riskleri, süreci ve uygulanacak aşamaları hastayla detaylı paylaşma başarısı</p>
              </div>

              {/* Slider 2 */}
              <div className="space-y-2 bg-slate-50/50 p-4 border border-slate-100 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Tedaviden Alınan Başarılı Sonuç</span>
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md font-mono">
                    {getSliderMeaning(success)}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={success}
                  onChange={(e) => setSuccess(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <p className="text-[10px] text-slate-400">Tıbbi müdahalenin asıl şikayetlerinize etkisi ve vaat edilen biyolojik iyileşmenin gerçekleşmesi</p>
              </div>

              {/* Slider 3 */}
              <div className="space-y-2 bg-slate-50/50 p-4 border border-slate-100 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Operasyon Sonrası Takip ve Destek</span>
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md font-mono">
                    {getSliderMeaning(postOp)}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={postOp}
                  onChange={(e) => setPostOp(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <p className="text-[10px] text-slate-400">Taburculuktan sonraki rehabilitasyon, beslenme rutini desteği veya olası şikayetlerde ekibe kolay erişim</p>
              </div>
            </div>
          )}


          {/* STEP 3: WRITING YOUR JOURNEY DETAILS */}
          {step === 3 && (
            <div className="space-y-5 animate-fade-in text-left">
              <div className="flex items-center gap-3 border-b border-slate-50 pb-4 mb-4">
                <div className="p-2 rounded-lg bg-blue-5 border border-blue-100">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Tedavi Süreci Hikayeniz ve Detaylar</h3>
                  <p className="text-[11px] text-slate-400">Tedavi aşamalarınızı kendi cümlelerinizle objektif olarak kaleme alın</p>
                </div>
              </div>

              {/* Summary Statement */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Yolculuğun Genel Başlığı (Özet Cümle)</label>
                <input
                  type="text"
                  required
                  value={reviewSummary}
                  onChange={(e) => setReviewSummary(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-semibold"
                />
              </div>

              {/* Core Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Genel Tedavi ve Memnuniyet Açıklamanız</label>
                <textarea
                  required
                  rows={3}
                  value={reviewBody}
                  onChange={(e) => setReviewBody(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-750 text-xs sm:text-sm"
                />
              </div>

              {/* Detailed 3 phases logs */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-4">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tedavinin Adım Adım Kronolojisi (Sıralı Adımlar)</h4>
                
                {/* Phase 1 */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-blue-700 uppercase">Etap 1: Teşhis ve Operasyon Öncesi Hazırlık Süreci</span>
                  <input
                    type="text"
                    required
                    value={phase1Text}
                    onChange={(e) => setPhase1Text(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-600"
                  />
                </div>

                {/* Phase 2 */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-blue-700 uppercase">Etap 2: Aktif Ameliyat veya Müdahale Günü</span>
                  <input
                    type="text"
                    required
                    value={phase2Text}
                    onChange={(e) => setPhase2Text(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-600"
                  />
                </div>

                {/* Phase 3 */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-blue-700 uppercase">Etap 3: Ameliyat Sonrası Evde Takip ve İyileşme</span>
                  <input
                    type="text"
                    required
                    value={phase3Text}
                    onChange={(e) => setPhase3Text(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-600"
                  />
                </div>
              </div>
            </div>
          )}


          {/* STEP 4: PRIVACY-PRESERVING Cryptographic proof selection */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in text-left">
              <div className="flex items-center gap-3 border-b border-slate-50 pb-4 mb-4">
                <div className="p-2 rounded-lg bg-emerald-5 border border-emerald-150 shadow-xs">
                  <Lock className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Gizli ve Doğrulanabilir Kanıt Sistemi</h3>
                  <p className="text-[11px] text-slate-500">KVKK maskeli sıfır-bilgi (ZKP) belge tescili</p>
                </div>
              </div>

              {/* Drag n drop area */}
              <div 
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                  uploadedFile 
                    ? 'border-emerald-400 bg-emerald-50/20' 
                    : 'border-slate-300 hover:border-blue-500 bg-slate-50/50 hover:bg-slate-50'
                }`}
                onClick={triggerMockFileDrop}
              >
                <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-xs font-bold text-slate-800">
                  {uploadedFile ? 'Farklı bir doğrulama belgesi seçin' : 'Tedavi Belgenizi Sürükleyin veya Tıklayın'}
                </p>
                <p className="text-[10px] text-slate-400 mt-1">
                  Reçete, eczane kaydı, randevu barkodu veya tahlil raporu kabul edilmektedir (PDF, JPEG formatları).
                </p>

                <div className="mt-4 inline-flex items-center gap-1.5 text-[9px] font-bold bg-white text-slate-500 border border-slate-200 px-3 py-1.5 rounded-lg">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  Belgeleriniz sadece tarayıcınızda şifrelenir, sunuculara çıplak dosya olarak aktarılmaz.
                </div>
              </div>

              {/* Interactive File Upload Progress Feed */}
              {uploadedFile && (
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-center justify-between gap-3 animate-fade-in">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-8 w-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 shrink-0 border border-blue-100">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">{uploadedFile.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{uploadedFile.size}</p>
                    </div>
                  </div>

                  {/* Complete Check */}
                  <div className="flex items-center shrink-0">
                    {isUploading ? (
                      <span className="text-xs font-mono font-bold text-blue-600 animate-pulse">
                        KRİPTOGRAFİK ŞİFRELEME %{uploadProgress}...
                      </span>
                    ) : isEncrypted ? (
                      <span className="flex items-center gap-1.5 text-xs font-bold font-mono text-emerald-700 bg-emerald-100 px-3 py-1 rounded-lg border border-emerald-200">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        ŞİFRELENDİ VE DOĞRULANDI
                      </span>
                    ) : null}
                  </div>
                </div>
              )}

              {/* Privacy protection notices list */}
              <div className="bg-slate-900 text-slate-300 p-4 rounded-xl space-y-2 text-xs">
                <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-bold flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" />
                  KVKK Hasta Veri Maskeleme Protokolü Aktif
                </span>
                <p className="text-slate-400 leading-normal text-[11px]">
                  Yüklenen evraklar <strong>AES-256 tarayıcı tarafı mühürlemeden</strong> geride sadece veri doğruluğunu teyit edecek benzersiz bir kriptografik değer bırakır. Bu değer, ulusal resmi sağlık sistemlerine sıfır-bilgi kanıtı göndermek amacıyla güvenle kullanılır. Kimliğiniz gizli kalır.
                </p>
              </div>
            </div>
          )}

          {/* BUTTON ACTIONS GRID */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-5 mt-6 select-none">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="py-2.5 px-4 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Önceki Adım
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs transition-colors cursor-pointer"
              >
                Yazmayı İptal Et
              </button>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm shadow-blue-100"
              >
                Değerlendirmeye Devam Et
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isUploading || !uploadedFile}
                className={`py-2.5 px-5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition-all ${
                  uploadedFile && !isUploading 
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-100' 
                    : 'bg-slate-100 text-slate-400 border border-slate-200 shadow-none cursor-not-allowed'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                Tedavi Deneyimini Yayınla
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
