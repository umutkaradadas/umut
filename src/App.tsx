import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { DOCTORS } from './data';
import { Doctor, Review } from './types';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { DoctorView } from './components/DoctorView';
import { SubmitExperienceForm } from './components/SubmitExperienceForm';
import { RegistrationFlow } from './components/RegistrationFlow';
import { DoctorProfileSetup } from './components/DoctorProfileSetup';
import { PatientProfileSetup } from './components/PatientProfileSetup';
import { ProfileSummary } from './components/ProfileSummary';
import { ShieldCheck } from 'lucide-react';
import { seedDatabase, submitReviewToFirestore } from './firebaseUtils';
import { db } from './firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { InfoModal } from './components/InfoModal';

function AppContent() {
  const [doctors, setDoctors] = useState<Doctor[]>(DOCTORS);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [infoTab, setInfoTab] = useState<'procedures' | 'standards' | 'kvkk' | 'support'>('procedures');
  const navigate = useNavigate();

  const handleOpenInfo = (tab: 'procedures' | 'standards' | 'kvkk' | 'support', e: React.MouseEvent) => {
    e.preventDefault();
    setInfoTab(tab);
    setIsInfoOpen(true);
  };

  // Expose seedDatabase to window for testing/admin purposes
  useEffect(() => {
    (window as any).seedDatabase = seedDatabase;
  }, []);

  // Listen to the doctors collection in Firestore in real-time
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'doctors'), (snapshot) => {
      if (snapshot.empty) {
        console.log("No doctors found in Firestore, seeding...");
        seedDatabase();
      } else {
        const loadedDoctors = snapshot.docs.map(doc => doc.data() as Doctor);
        
        // Auto-sync local DOCTORS definitions to Firestore if there are any mismatches in imageUrl or age
        import('firebase/firestore').then(({ doc: fsDoc, setDoc }) => {
          DOCTORS.forEach(localDoc => {
            const dbDoc = loadedDoctors.find(d => d.id === localDoc.id);
            // If the doctor is missing in Db, or has a different imageUrl, or has a different age
            if (!dbDoc || dbDoc.imageUrl !== localDoc.imageUrl || dbDoc.age !== localDoc.age) {
              console.log(`Syncing doctor ${localDoc.name} to Firestore...`);
              setDoc(fsDoc(db, 'doctors', localDoc.id), localDoc).catch(err => {
                console.error(`Failed to sync doctor ${localDoc.id}:`, err);
              });
            }
          });
        });

        // Sort doctors to preserve their original order or by ID
        loadedDoctors.sort((a, b) => a.id.localeCompare(b.id));
        setDoctors(loadedDoctors);
      }
    });

    return unsub;
  }, []);

  const handleAddReview = async (doctorId: string, review: Review) => {
    const docToUpdate = doctors.find(d => d.id === doctorId);
    if (!docToUpdate) return;

    const updatedReviews = [review, ...docToUpdate.reviews];
    const newVerifiedCount = docToUpdate.verifiedTreatments + 1;
    const newReviewsCount = docToUpdate.reviewsCount + 1;
    const currentCred = docToUpdate.credibilityRating;
    const newCred = Math.min(99, Math.round(currentCred + 0.2));

    const updatedDoc: Doctor = {
      ...docToUpdate,
      reviewsCount: newReviewsCount,
      verifiedTreatments: newVerifiedCount,
      credibilityRating: newCred,
      reviews: updatedReviews
    };

    try {
      await submitReviewToFirestore(doctorId, review, updatedDoc);
    } catch (err) {
      console.error("Failed to submit review to Firestore: ", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-800 selection:bg-blue-100 selection:text-blue-900">
      
      <Header />

      {/* Main Layout Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <Routes>
          <Route path="/" element={
            <HomeView 
              doctors={doctors} 
              onSelectDoctor={(doc) => navigate(`/doctor/${doc.id}`)} 
              onSubmitExperience={(doc) => navigate(`/submit?doctorId=${doc.id}`)} 
            />
          } />
          <Route path="/register" element={<RegistrationFlow />} />
          <Route path="/doctor-profile-form" element={<DoctorProfileSetup />} />
          <Route path="/patient-profile-form" element={<PatientProfileSetup />} />
          <Route path="/my-profile" element={<ProfileSummary />} />
          <Route path="/submit" element={
            <SubmitExperienceForm 
              doctors={doctors}
              onClose={() => navigate(-1)}
              onAddReview={handleAddReview}
              onNavigateToDoctor={(doc) => navigate(`/doctor/${doc.id}`)}
            />
          } />
          <Route path="/doctor/:id" element={
            <DoctorViewRenderer doctors={doctors} />
          } />
        </Routes>
      </main>

      <section className="bg-slate-900 text-slate-400 py-10 px-4 sm:px-6 lg:px-8 border-t border-slate-800 text-xs text-center border-b border-slate-800">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex justify-center items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-slate-200 uppercase tracking-widest text-[10px]">
              ULUSAL KLİNİK GÜVENİLİRLİK VE SAĞLIK SİCİL STANDARTLARIYLA UYUMLU
            </span>
          </div>
          <p className="max-w-2xl mx-auto leading-relaxed text-slate-450">
            CareTrust, bağımsız ve doğrulanabilir bir tedavi sonuçları portalıdır. Güvenilirlik skorları ve verileri, uzman hekimlerin klinik geçmişleri ile hastaların resmi tedavi tescil belgelerinin kriptografik doğrulamasına dayanır. Hasta kimlikleri, KVKK ve GDPR ilkelerine tam uyumlu olarak değiştirilemez biçimde maskelenmiştir.
          </p>
        </div>
      </section>

      <footer className="bg-slate-950 text-slate-500 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 text-xs">
          <button 
            onClick={(e) => handleOpenInfo('procedures', e)} 
            className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer text-left bg-transparent border-none p-0"
          >
            <div className="h-6 w-6 rounded bg-gradient-to-tr from-cyan-600 to-blue-700 flex items-center justify-center text-white">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="font-semibold text-slate-400">CareTrust Paneli</span>
          </button>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <button onClick={(e) => handleOpenInfo('procedures', e)} className="hover:text-slate-305 hover:underline transition-all cursor-pointer bg-transparent border-none text-left p-0 font-medium">Doğrulama Prosedürleri</button>
            <button onClick={(e) => handleOpenInfo('standards', e)} className="hover:text-slate-305 hover:underline transition-all cursor-pointer bg-transparent border-none text-left p-0 font-medium">Veri Teyit Standartları</button>
            <button onClick={(e) => handleOpenInfo('kvkk', e)} className="hover:text-slate-305 hover:underline transition-all cursor-pointer bg-transparent border-none text-left p-0 font-medium">KVKK Hasta Gizliliği Sınırları</button>
            <button onClick={(e) => handleOpenInfo('support', e)} className="hover:text-slate-305 hover:underline transition-all cursor-pointer bg-transparent border-none text-left p-0 font-medium">Hekim Destek ve İrtibat</button>
          </div>
          <p className="text-slate-600 font-mono">
            &copy; {new Date().getFullYear()} CareTrust. Tüm tedavi geçmişleri ve güven skorları mühürlü olarak korunmaktadır.
          </p>
        </div>
      </footer>

      {/* Interactive trust specs modal overlay */}
      <InfoModal 
        isOpen={isInfoOpen} 
        onClose={() => setIsInfoOpen(false)} 
        initialTab={infoTab}
      />
    </div>
  );
}

// Wrapper to parse params for DoctorView
import { useParams } from 'react-router-dom';
function DoctorViewRenderer({ doctors }: { doctors: Doctor[] }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const doc = doctors.find(d => d.id === id);
  if (!doc) return <div className="text-center py-20 text-slate-500">Doctor not found</div>;
  return (
    <DoctorView 
      doctor={doc} 
      onBack={() => navigate('/')} 
      onSubmitReview={() => navigate(`/submit?doctorId=${doc.id}`)} 
    />
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
