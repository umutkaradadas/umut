import { useEffect, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth, handleFirestoreError, OperationType } from '../firebase';
import { doc, onSnapshot, updateDoc, setDoc, collection, query, where } from 'firebase/firestore';
import { Appointment, Review } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Edit3, 
  Activity, 
  HeartPulse, 
  User, 
  MapPin, 
  Target, 
  Stethoscope, 
  Briefcase, 
  FileSignature, 
  CheckCircle2, 
  Calendar,
  Clock,
  Video,
  XCircle,
  MessageSquare,
  Sparkles,
  Settings,
  Reply,
  HelpCircle,
  FileCheck,
  Building2,
  Lock,
  ArrowRight,
  Info,
  ZoomIn,
  X
} from 'lucide-react';

export function ProfileSummary() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [role, setRole] = useState<'doctor' | 'patient' | null>(null);
  
  const [userData, setUserData] = useState<any>(null);
  const [profileData, setProfileData] = useState<any>(null);

  const [userDataLoaded, setUserDataLoaded] = useState(false);
  const [profileDataLoaded, setProfileDataLoaded] = useState(false);

  // Module 2 & 6 State Additions
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [receivedReviews, setReceivedReviews] = useState<Review[]>([]);
  const [doctorAge, setDoctorAge] = useState<number>(45);
  const [doctorImageUrl, setDoctorImageUrl] = useState<string>('');
  const [zoomedImage, setZoomedImage] = useState<{ url: string; name: string; title: string } | null>(null);
  
  // Feedback response text box state
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});
  const [replyMessageStatus, setReplyMessageStatus] = useState<string>('');

  // Doctor Settings edit form toggler
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [settingsHospital, setSettingsHospital] = useState<string>('');
  const [settingsTitle, setSettingsTitle] = useState<string>('');
  const [settingsBio, setSettingsBio] = useState<string>('');

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(user => {
      if (!user) {
        navigate('/register');
      } else {
        setCurrentUser(user);
      }
    });
    return () => unsubscribeAuth();
  }, [navigate]);

  useEffect(() => {
    if (!currentUser) return;

    const unsubUser = onSnapshot(doc(db, 'users', currentUser.uid), (docSnap) => {
      if (docSnap.exists()) {
        const uData = docSnap.data();
        setUserData(uData);
        setRole(uData.role);
      } else {
        setUserData(null);
        setRole(null);
      }
      setUserDataLoaded(true);
    }, err => {
      handleFirestoreError(err, OperationType.GET, 'users');
      setUserDataLoaded(true);
    });

    return () => unsubUser();
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser || !role) {
      if (userDataLoaded && !role) {
        setProfileDataLoaded(true);
      }
      return;
    }

    const collectionName = role === 'doctor' ? 'doctorProfiles' : 'patientProfiles';
    
    const unsubProfile = onSnapshot(doc(db, collectionName, currentUser.uid), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfileData(data);
        
        // Populate settings fields for doctor role
        if (role === 'doctor') {
          setSettingsHospital(data.hospitalClinicAffiliation || '');
          setSettingsTitle(data.currentTitle || 'Uzm. Dr.');
          setSettingsBio(data.biography || '');
          setDoctorAge(data.doctorAge || 45);
          setDoctorImageUrl(data.imageUrl || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300');
        }
      } else {
        setProfileData(null);
      }
      setProfileDataLoaded(true);
    }, err => {
      handleFirestoreError(err, OperationType.GET, collectionName);
      setProfileDataLoaded(true);
    });

    return () => unsubProfile();
  }, [currentUser, role, userDataLoaded]);

  // Real-time Fetch of Appointments (Module 2 requirement)
  useEffect(() => {
    if (!currentUser || !role) return;

    const q = role === 'doctor'
      ? query(collection(db, 'appointments'), where('doctorId', '==', currentUser.uid))
      : query(collection(db, 'appointments'), where('patientUid', '==', currentUser.uid));

    const unsub = onSnapshot(q, (snap) => {
      const list: Appointment[] = [];
      snap.forEach(d => {
        const item = d.data() as Appointment;
        list.push({ ...item, id: d.id });
      });
      setAppointments(list);
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, 'appointments');
    });

    return () => unsub();
  }, [currentUser, role]);

  // Real-time Fetch of Doctor Reviews (Module 6 feedback reply requirement)
  useEffect(() => {
    if (!currentUser || role !== 'doctor') return;

    const unsub = onSnapshot(collection(db, 'doctors', currentUser.uid, 'reviews'), (snap) => {
      const list: Review[] = [];
      snap.forEach(d => {
        list.push(d.data() as Review);
      });
      setReceivedReviews(list);
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, `doctors/${currentUser.uid}/reviews`);
    });

    return () => unsub();
  }, [currentUser, role]);

  // Cancel Appointment handler
  const handleCancelAppointment = async (appId: string) => {
    try {
      await updateDoc(doc(db, 'appointments', appId), {
        status: 'İptal Edildi'
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `appointments/${appId}`);
    }
  };

  // Submit doctor feedback response (Module 6 Feedback Response)
  const handleDoctorReplySubmit = async (reviewId: string) => {
    const text = replyInputs[reviewId]?.trim();
    if (!text || !currentUser) return;

    try {
      setReplyMessageStatus('Yayınlanıyor...');
      const replyDateStr = new Date().toISOString().split('T')[0];

      // 1. Update the review structure inside Firestore subcollection
      const reviewRef = doc(db, 'doctors', currentUser.uid, 'reviews', reviewId);
      await updateDoc(reviewRef, {
        replyText: text,
        replyDate: replyDateStr
      });

      // Clear text box
      setReplyInputs(prev => ({ ...prev, [reviewId]: '' }));
      setReplyMessageStatus('Cevabınız resmi profilinizde başarıyla yayınlandı!');
      setTimeout(() => setReplyMessageStatus(''), 4000);
    } catch (err) {
      console.error('Doctor reply submit error:', err);
      setReplyMessageStatus('Cevap eklenirken hata oluştu.');
    }
  };

  // Save Doctor public settings variables (Module 6 Settings changes)
  const handleSavePublicSettings = async (e: FormEvent) => {
    e.preventDefault();
    if (!currentUser || !profileData || !userData) return;

    try {
      setReplyMessageStatus('Kaydediliyor...');
      
      // Update doctorProfiles
      await setDoc(doc(db, 'doctorProfiles', currentUser.uid), {
        hospitalClinicAffiliation: settingsHospital,
        currentTitle: settingsTitle,
        biography: settingsBio,
        doctorAge: Number(doctorAge),
        imageUrl: doctorImageUrl
      }, { merge: true });

      // Update the public doctors search records registry as well so changes sync in public searches in real-time!
      await setDoc(doc(db, 'doctors', currentUser.uid), {
        id: currentUser.uid,
        name: userData.fullName,
        title: settingsTitle,
        hospital: settingsHospital,
        city: profileData.city || 'İstanbul (Şişli)',
        age: Number(doctorAge),
        about: settingsBio,
        imageUrl: doctorImageUrl,
        specialty: Array.isArray(profileData.medicalSpecialty) ? profileData.medicalSpecialty[0] : 'Kardiyoloji',
        rating: 5,
        reviewsCount: receivedReviews.length,
        credibilityRating: 98,
        verifiedTreatments: 12,
        experienceYears: 15,
        satisfactionRate: 98,
        timeline: [
          { id: 't-1', year: '2026', title: 'Onaylı Akademik Kayıt', category: 'Award', institution: 'CareTrust', description: 'Uzmanlığın onaylanmış tescil kaydı.' }
        ],
        reviews: receivedReviews,
        specialInterests: profileData.focusAreas || [],
        education: [profileData.medicalSchool || 'İstanbul Üniversitesi Tıp Fakültesi']
      }, { merge: true });

      setIsSettingsOpen(false);
      setReplyMessageStatus('Halkla açık hekim parametreleriniz başarıyla mühürlendi!');
      setTimeout(() => setReplyMessageStatus(''), 4000);
    } catch (err) {
      console.error('Settings saving error:', err);
      setReplyMessageStatus('Ayarlar güncellenirken hata oluştu.');
    }
  };

  if (!userDataLoaded || !profileDataLoaded) {
    return (
      <div className="flex justify-center py-20">
        <p className="font-mono text-xs text-slate-450 font-black animate-pulse tracking-widest uppercase">
          GÜVEN DEFTEDİNDEN VERİLER YÜKLENİYOR...
        </p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12 animate-fade-in text-center">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-10 space-y-6">
          <div className="h-14 w-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto">
            <User className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">Hesap Tipi Seçilmedi</h2>
          <p className="text-sm text-slate-500 text-center">
            CareTrust portalına tam erişim sağlamak için hesap profil tipinizi belirlemeniz gerekmektedir.
          </p>
          <button
            onClick={() => navigate('/register')}
            className="w-full py-3 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all cursor-pointer"
          >
            Hesap Kurulumunu Tamamla
          </button>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12 animate-fade-in text-center">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-10 space-y-6">
          <div className="h-14 w-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <Activity className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">Profiliniz Tamamlanmadı</h2>
          <p className="text-sm text-slate-500 text-center">
            {role === 'doctor' 
              ? 'Hekim portalı özelliklerinden faydalanabilmek ve doğrulanabilir dikey panellerinizi yönetebilmek için mesleki detaylarınızı girin.' 
              : 'Deneyimlerinizi onaylı olarak ekleyebilmek ve portal dikey özelliklerini kişiselleştirmek için bilgilerinizi tamamlayın.'}
          </p>
          <button
            onClick={() => navigate(role === 'doctor' ? '/doctor-profile-form' : '/patient-profile-form')}
            className="w-full py-3 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all cursor-pointer"
          >
            Profil Bilgilerini Tamamla
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 animate-fade-in relative text-left">
      
      {/* Edit Profile Action */}
      <div className="absolute top-10 right-4 sm:right-4 flex items-center gap-2">
        {role === 'doctor' && (
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow"
          >
            <Settings className="w-4 h-4" />
            {isSettingsOpen ? 'Paneli Kapat' : 'Profil Düzenleyici'}
          </button>
        )}
        <button 
          onClick={() => navigate(role === 'doctor' ? '/doctor-profile-form' : '/patient-profile-form')}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-650 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all font-bold text-xs"
        >
          <Edit3 className="w-3.5 h-3.5" /> Detaylarımı Güncelle
        </button>
      </div>

      {replyMessageStatus && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 bg-slate-950 text-white border border-slate-800 text-xs py-2.5 px-5 rounded-full font-bold shadow-2xl z-50 animate-bounce flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-emerald-405 animate-pulse" />
          <span>{replyMessageStatus}</span>
        </div>
      )}

      {/* DOCTOR WORKSPACE INTERFACE */}
      {role === 'doctor' && (
        <div className="space-y-8 mt-6">
          
          {/* Main card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <Stethoscope className="w-48 h-48" />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 relative z-10">
              <div 
                onClick={() => setZoomedImage({ url: doctorImageUrl, name: `${settingsTitle} ${userData.fullName}`, title: settingsHospital || 'Genel Hekim' })}
                className="h-20 w-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-200 relative cursor-pointer overflow-hidden group/profile-img"
                title="Fotoğrafı Büyüt"
              >
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/profile-img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 rounded-2xl">
                  <ZoomIn className="w-5 h-5 text-white scale-90 group-hover/profile-img:scale-100 transition-transform duration-300" />
                </div>
                <img src={doctorImageUrl} className="h-full w-full object-cover rounded-2xl" alt="Hekim" onError={(e)=>{(e.target as any).src='https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300'}} />
              </div>

              {/* Lightbox Modal for Zooming Doctor Photo */}
              <AnimatePresence>
                {zoomedImage && (
                  <div 
                    className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md" 
                    onClick={() => setZoomedImage(null)}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.93 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.933 }}
                      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                      className="relative max-w-lg w-full bg-white rounded-3xl p-3 shadow-2xl overflow-hidden border border-slate-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Close Button overlay */}
                      <button
                        type="button"
                        onClick={() => setZoomedImage(null)}
                        className="absolute top-4 right-4 bg-slate-950/50 hover:bg-slate-950/90 text-white p-2 rounded-full transition-colors z-30 cursor-pointer shadow-md border border-white/10"
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
                      <div className="p-4 text-center select-none text-slate-900">
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
              <div className="flex-1 justify-center flex flex-col">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-none">
                    {settingsTitle} {userData.fullName}
                  </h1>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-bold mb-3 mt-1 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5 bg-slate-105 px-3 py-1 rounded-full border border-slate-200"><Briefcase className="w-4 h-4 text-slate-400"/> {settingsHospital || 'Klinik Ataması Bekleniyor'}</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-blue-550"/> KUTLAMA MEZUNİYETİ: {profileData.graduationYear}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-indigo-500"/> SİCİL YAŞI: {doctorAge}</span>
                </div>
                
                {profileData.pending_verification ? (
                  <span className="self-start inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-lg text-xs font-bold font-mono">
                    <Activity className="w-3.5 h-3.5" /> DOĞRULAMA İNCELENİYOR
                  </span>
                ) : (
                  <span className="self-start inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-lg text-xs font-bold font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> RESMİ CARETRUST TEŞHİS SİCİLİ UZMANI
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Module 6: Live Settings Editor (Doctor Public Parameters management panel) */}
          {isSettingsOpen && (
            <div className="bg-slate-50 rounded-3xl border border-slate-250 p-6 sm:p-8 animate-fade-in text-left">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Settings className="w-4.5 h-4.5 text-blue-600 animate-spin" />
                Halka Açık Hekim Arama ve Detay Parametresi Kontrolü
              </h3>
              <p className="text-xs text-slate-500 mb-6">Burada düzelteceğiniz parametreler en yüksek gizlilik korumalarıyla eşlemlenerek public dizin tablolarında saniyeler içinde güncellenir.</p>

              <form onSubmit={handleSavePublicSettings} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Çalıştığınız Hastane Grubu</label>
                    <input
                      type="text"
                      required
                      value={settingsHospital}
                      onChange={(e) => setSettingsHospital(e.target.value)}
                      className="bg-white px-3.5 h-10 border border-slate-250 rounded-lg text-xs font-semibold text-slate-800"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Mesleki Ünvanınız</label>
                    <input
                      type="text"
                      required
                      value={settingsTitle}
                      onChange={(e) => setSettingsTitle(e.target.value)}
                      className="bg-white px-3.5 h-10 border border-slate-250 rounded-lg text-xs font-semibold text-slate-800"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tıbbi Sicil Yaşınız</label>
                    <input
                      type="number"
                      required
                      min={25}
                      max={85}
                      value={doctorAge}
                      onChange={(e) => setDoctorAge(Number(e.target.value))}
                      className="bg-white px-3.5 h-10 border border-slate-250 rounded-lg text-xs font-semibold text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Hekim Fotoğraf Adresi (URL)</label>
                    <input
                      type="text"
                      value={doctorImageUrl}
                      onChange={(e) => setDoctorImageUrl(e.target.value)}
                      className="bg-white px-3.5 h-10 border border-slate-250 rounded-lg text-xs text-slate-600 font-mono"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-100 rounded-xl">
                    <Info className="w-5 h-5 text-blue-650 shrink-0" />
                    <p className="text-[10px] text-blue-800 font-semibold leading-relaxed">
                      Lütfen geçerli bir portre görsel URL girin, hastaların arama sonucunda görmesi için anında işlenerecektir.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Klinik Biyografiniz (Bölüm A)</label>
                  <textarea
                    rows={4}
                    required
                    value={settingsBio}
                    onChange={(e) => setSettingsBio(e.target.value)}
                    className="bg-white p-3 border border-slate-250 rounded-xl text-xs font-semibold text-slate-700 leading-relaxed"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSettingsOpen(false)}
                    className="py-2 px-4 rounded-xl border border-slate-205 text-slate-650 text-xs font-semibold"
                  >
                    Vazgeç
                  </button>
                  <button
                    type="submit"
                    className="py-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Hekim Kartımı Güncelle
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Appointments tracking Block (Module 2) */}
            <div className="col-span-1 border border-slate-200 rounded-3xl bg-slate-50 p-5 space-y-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5 font-mono">
                <Calendar className="w-4 h-4 text-blue-600" />
                RANDEVU ANALİZ PANORAMASI
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5 leading-normal">Onay almış takvim ön-görüşme talepleri ve tele-sağlık randevuları listeleniyor.</p>

              {appointments.length > 0 ? (
                <div className="space-y-3">
                  {appointments.map(app => (
                    <div key={app.id} className="bg-white border border-slate-200 p-4 rounded-xl space-y-2.5 text-xs text-left shadow-2xs relative">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                        <span className="font-extrabold text-slate-900 block truncate">{app.patientName}</span>
                        <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                          app.status === 'İptal Edildi'
                            ? 'bg-red-50 text-red-700 border border-red-100'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-100'
                        }`}>
                          {app.status}
                        </span>
                      </div>

                      <div className="space-y-1 text-[11px] text-slate-500 font-semibold font-mono">
                        <p className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {app.date} — {app.timeSlot}
                        </p>
                        <p className="flex items-center gap-1">
                          <Video className="w-3.5 h-3.5 text-blue-600" />
                          Mod: {app.consultationType}
                        </p>
                      </div>

                      {app.complaint && (
                        <div className="bg-slate-50/70 p-2 rounded-lg text-[10px] text-slate-600 border border-slate-100 italic leading-relaxed">
                          "Şikayet: {app.complaint}"
                        </div>
                      )}

                      {app.status !== 'İptal Edildi' && (
                        <button
                          onClick={() => handleCancelAppointment(app.id)}
                          className="w-full mt-2 py-1.5 rounded-lg border border-red-200 text-red-650 hover:bg-red-50 text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Randevuyu İptal Et
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-slate-200/60 p-6 rounded-2xl text-center text-slate-400 text-xs">
                  <Calendar className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                  Kayıtlı aktif randevunuz bulunmamaktadır.
                </div>
              )}
            </div>

            {/* Complete Doctor Review Replies Management Board (Module 6) */}
            <div className="col-span-2 space-y-6">
              
              {/* Public Feed Reviews and Replies Panel */}
              <div className="bg-white border border-slate-250 rounded-3xl p-6 sm:p-8">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  Hasta Geri Bildirimi Mülakat Defteri (Yorum Yönetimi)
                </h3>
                <p className="text-xs text-slate-500 mb-6">Hastalarınızdan gelen doğrulanmış tedavi mühürlerini süzün ve hastane adına resmi hekim yanıtlarınızı ekleyin.</p>

                {receivedReviews.length > 0 ? (
                  <div className="space-y-6">
                    {receivedReviews.map(rev => (
                      <div key={rev.id} className="p-5 border border-slate-205 rounded-2.5xl bg-slate-50/50 space-y-4 text-left">
                        
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-200/60 pb-2">
                          <div>
                            <span className="text-[10px] font-mono text-slate-400 font-bold block">{rev.patientIdCode}</span>
                            <span className="font-extrabold text-sm text-slate-900 mt-0.5 block">{rev.treatmentType}</span>
                          </div>
                          
                          <div className="flex items-center gap-1.5 self-start sm:self-center">
                            <span className="text-xs text-slate-400 font-bold">{rev.date}</span>
                            {rev.verifiedWithDocument && (
                              <span className="text-[9px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">ONAYLI BELGESİ</span>
                            )}
                          </div>
                        </div>

                        <div>
                          <p className="text-xs font-bold text-slate-800 italic">"{rev.summary}"</p>
                          <p className="text-xs text-slate-650 mt-1 leading-relaxed">{rev.text}</p>
                        </div>

                        {/* Existing Reply Display */}
                        {rev.replyText ? (
                          <div className="bg-blue-50 border border-blue-150 rounded-xl p-3 text-xs">
                            <p className="font-extrabold text-blue-900 mb-1 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Yayınlanan Hekim Yanıtı ({rev.replyDate}):
                            </p>
                            <p className="text-slate-700 italic">"{rev.replyText}"</p>
                          </div>
                        ) : (
                          /* Interactive Reply input box */
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Profesyonel Teşekkür veya Açıklama Yazın</label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Geçmiş olsun dileriz. Sonuçların iyi olmasına çok sevindik..."
                                value={replyInputs[rev.id] || ''}
                                onChange={(e) => setReplyInputs(prev => ({ ...prev, [rev.id]: e.target.value }))}
                                className="flex-1 h-9 px-3 bg-white border border-slate-250 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
                              />
                              <button
                                type="button"
                                onClick={() => handleDoctorReplySubmit(rev.id)}
                                disabled={!replyInputs[rev.id]?.trim()}
                                className="px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg disabled:opacity-40 transition-all flex items-center gap-1 cursor-pointer"
                              >
                                <Reply className="w-3.5 h-3.5" /> Cevabı Yayınla
                              </button>
                            </div>
                          </div>
                        )}

                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border border-dashed border-slate-250 rounded-2xl py-10 text-center text-slate-400 text-xs">
                    <MessageSquare className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    Henüz aldığınız doğrulanmış bir yorum bulunmamaktadır.
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* PATIENT PROFILE WORKSPACE */}
      {role === 'patient' && (
        <div className="space-y-8 mt-6">
           
           {/* Header block */}
           <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 relative overflow-hidden text-left">
             <div className="absolute top-0 right-0 p-8 opacity-5">
               <HeartPulse className="w-48 h-48" />
             </div>
             
             <div className="flex flex-col sm:flex-row gap-6 relative z-10 items-center sm:items-start text-center sm:text-left">
                <div className="h-16 w-16 rounded-full bg-slate-900 border-4 border-slate-100 flex items-center justify-center text-emerald-400 shrink-0">
                  <User className="w-7 h-7" />
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-950 tracking-tight leading-single">
                    Doğrulanmış Hasta: {profileData.displayUsername}
                  </h1>
                  <p className="text-xs text-slate-405 font-semibold mt-1 uppercase tracking-wide">CareTrust Akredite Hasta Hesabı</p>
                  
                  <div className="flex flex-wrap sm:flex-row items-center justify-center sm:justify-start gap-4 text-xs font-bold text-slate-500 mt-3">
                    <span className="flex items-center gap-1 bg-slate-100 border border-slate-150 px-2.5 py-1 rounded-full"><MapPin className="w-3.5 h-3.5 text-slate-400" /> BÖLGE: {profileData.city}</span>
                    <span className="flex items-center gap-1 bg-slate-100 border border-slate-150 px-2.5 py-1 rounded-full"><Target className="w-3.5 h-3.5 text-slate-400" /> YAŞ GRUBU: {profileData.ageGroup}</span>
                  </div>
                </div>
             </div>
           </div>

           {/* Appointments tracking list (Module 2 Patients board) */}
           <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 text-left">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                <Calendar className="w-5 h-5 text-blue-600 animate-pulse" />
                <div>
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Muayene ve Ön Görüşme Randevularım</h3>
                  <p className="text-[10px] text-slate-400 font-semibold font-mono mt-0.5 uppercase">Tesis takvimleriyle tam eşanlı mühürlü kayıtlardır</p>
                </div>
              </div>

              {appointments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {appointments.map(app => (
                    <div key={app.id} className="bg-slate-50 border border-slate-155 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-blue-200 transition-all text-left">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md tracking-wider border border-indigo-150 uppercase font-mono">
                            {app.doctorSpecialty}
                          </span>
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md border ${
                            app.status === 'İptal Edildi'
                              ? 'bg-red-50 text-red-700 border-red-100'
                              : 'bg-emerald-50 text-emerald-800 border-emerald-100'
                          }`}>
                            {app.status === 'İptal Edildi' ? '❌ İptal Edildi' : '🟢 Randevu Onaylandı'}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-extrabold text-slate-950 text-sm">{app.doctorName}</h4>
                          <span className="text-[10px] text-slate-400">CareTrust Portal Onaylı Uzman</span>
                        </div>

                        <div className="bg-white border border-slate-200 p-3 rounded-xl space-y-1.5 font-mono text-xs text-slate-600 font-semibold">
                          <p className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-450" />
                            Tarih: {app.date}
                          </p>
                          <p className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-450" />
                            Seçilen Saat: {app.timeSlot}
                          </p>
                          <p className="flex items-center gap-1">
                            <Video className="w-3.5 h-3.5 text-blue-600" />
                            Görüşme Tipi: {app.consultationType}
                          </p>
                        </div>

                        {app.complaint && (
                          <div className="text-slate-500 italic text-[11px] leading-relaxed bg-white border border-slate-100 p-2.5 rounded-lg">
                            "Müşteki Şikayet: {app.complaint}"
                          </div>
                        )}
                      </div>

                      {app.status !== 'İptal Edildi' && (
                        <button
                          onClick={() => handleCancelAppointment(app.id)}
                          className="mt-4 w-full py-2 border border-red-200 text-red-650 hover:bg-red-50 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                        >
                          <XCircle className="w-4 h-4" /> Randevuyu İptal Et
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border border-dashed border-slate-250 rounded-2xl py-12 text-center text-slate-400 text-xs">
                  <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  Kayıtlı aktif muayene veya ön görüşme rezervasyonunuz bulunmamaktadır.
                  <br />
                  <button
                    onClick={() => navigate('/')}
                    className="inline-flex items-center gap-1 bg-slate-905 hover:bg-slate-800 text-white font-bold text-[11px] py-1.5 px-3 rounded-lg mt-4 cursor-pointer"
                  >
                    Hekimleri İncele ve Randevu Al <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-3xl p-6">
                 <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-4">Medical Interests</h3>
                 <div className="flex flex-wrap gap-2">
                   {profileData.medicalInterests.map((s: string) => <span key={s} className="bg-white text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-bold">{s}</span>)}
                 </div>
              </div>
              <div className="bg-indigo-50/50 border border-indigo-100 rounded-3xl p-6">
                 <h3 className="text-xs font-bold text-indigo-800 uppercase tracking-widest mb-4">Experienced Symptoms</h3>
                 <div className="flex flex-wrap gap-2">
                   {profileData.experiencedSymptoms.map((s: string) => <span key={s} className="bg-white text-indigo-700 border border-indigo-200 px-3 py-1.5 rounded-lg text-xs font-bold">{s}</span>)}
                 </div>
              </div>
           </div>

           <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-8">
             <div>
               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2 font-mono">
                 <FileSignature className="w-4 h-4 text-blue-500" /> Sağlık Hikayem ve Yolculuğum
               </h3>
               <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 whitespace-pre-wrap">
                 {profileData.healthJourney}
               </p>
             </div>
             <div>
               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2 font-mono">
                 <Activity className="w-4 h-4 text-blue-500" /> Muayene Sonrası Hekim Ekibinden Beklentilerim
               </h3>
               <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 whitespace-pre-wrap">
                 {profileData.expectations}
               </p>
             </div>
           </div>
        </div>
      )}
    </div>
  );
}
