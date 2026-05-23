import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth, handleFirestoreError, OperationType } from '../firebase';
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';
import { Stethoscope, CheckCircle2, ChevronRight, Activity } from 'lucide-react';

interface RefData {
  id: string;
  label: string;
  isActive: boolean;
}

export function DoctorProfileSetup() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  // Form Fields
  const [currentTitle, setCurrentTitle] = useState('');
  const [hospitalClinicAffiliation, setHospitalClinicAffiliation] = useState('');
  const [graduationYear, setGraduationYear] = useState<number>(2010);
  
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>([]);
  const [selectedProcedures, setSelectedProcedures] = useState<string[]>([]);
  
  const [patientCapacityStatus, setPatientCapacityStatus] = useState('Accepting New Patients');
  const [preferredCommunicationMode, setPreferredCommunicationMode] = useState('In-Clinic');
  
  const [biography, setBiography] = useState('');
  
  // Reference Data
  const [specialties, setSpecialties] = useState<RefData[]>([]);
  const [focusAreas, setFocusAreas] = useState<RefData[]>([]);
  const [procedures, setProcedures] = useState<RefData[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Redirect if not logged in
    const unsubscribeAuth = auth.onAuthStateChanged(user => {
      if (!user) navigate('/register');
      else setCurrentUser(user);
    });

    const unsubSpecs = onSnapshot(collection(db, 'specialties'), (snap) => {
      setSpecialties(snap.docs.map(d => d.data() as RefData));
    }, err => handleFirestoreError(err, OperationType.LIST, 'specialties'));
    
    const unsubFocus = onSnapshot(collection(db, 'focusAreas'), (snap) => {
      setFocusAreas(snap.docs.map(d => d.data() as RefData));
    }, err => handleFirestoreError(err, OperationType.LIST, 'focusAreas'));

    const unsubProc = onSnapshot(collection(db, 'procedures'), (snap) => {
      setProcedures(snap.docs.map(d => d.data() as RefData));
    }, err => handleFirestoreError(err, OperationType.LIST, 'procedures'));

    return () => {
      unsubscribeAuth();
      unsubSpecs();
      unsubFocus();
      unsubProc();
    };
  }, [navigate]);

  const toggleSelection = (item: string, currentSelected: string[], max: number, setter: (val: string[]) => void) => {
    if (currentSelected.includes(item)) {
      setter(currentSelected.filter(i => i !== item));
    } else if (currentSelected.length < max) {
      setter([...currentSelected, item]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setLoading(true);
    try {
      const docRef = doc(db, 'doctorProfiles', currentUser.uid);
      await setDoc(docRef, {
        uid: currentUser.uid,
        currentTitle,
        hospitalClinicAffiliation,
        graduationYear,
        medicalSpecialty: selectedSpecialties,
        focusAreas: selectedFocusAreas,
        procedures: selectedProcedures,
        patientCapacityStatus,
        preferredCommunicationMode,
        biography,
        pending_verification: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }, { merge: true });

      navigate('/my-profile');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'doctorProfiles');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl p-8 sm:p-10">
        
        <div className="flex items-center gap-4 border-b border-slate-100 pb-6 mb-8">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Professional Medical Profile</h2>
            <p className="text-sm text-slate-500 mt-1">Complete your clinical verification dossier to establish credibility.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Current Title</label>
              <input
                type="text" required
                value={currentTitle}
                onChange={e => setCurrentTitle(e.target.value)}
                placeholder="e.g. Prof. Dr., Assoc. Prof., MD"
                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500/20 text-sm font-medium"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Hospital / Clinic Affiliation</label>
              <input
                type="text" required
                value={hospitalClinicAffiliation}
                onChange={e => setHospitalClinicAffiliation(e.target.value)}
                placeholder="Where you currently practice"
                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500/20 text-sm font-medium"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex justify-between">
              <span>Medical Graduation Year</span>
              <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-mono">{graduationYear}</span>
            </label>
            <input
              type="range" min="1970" max="2026" step="1"
              value={graduationYear}
              onChange={e => setGraduationYear(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-2"
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Medical Specialty <span className="text-slate-400 normal-case ml-1">(Max 2)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {specialties.map(spec => (
                <button
                  key={spec.id} type="button"
                  onClick={() => toggleSelection(spec.label, selectedSpecialties, 2, setSelectedSpecialties)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    selectedSpecialties.includes(spec.label)
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-200'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  {spec.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Focus Areas <span className="text-slate-400 normal-case ml-1">(Max 5)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {focusAreas.map(focus => (
                <button
                  key={focus.id} type="button"
                  onClick={() => toggleSelection(focus.label, selectedFocusAreas, 5, setSelectedFocusAreas)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    selectedFocusAreas.includes(focus.label)
                      ? 'bg-amber-500 text-white border-amber-500 shadow-sm shadow-amber-200'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:bg-amber-50'
                  }`}
                >
                  {focus.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Clinical Procedures <span className="text-slate-400 normal-case ml-1">(Max 8)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {procedures.map(proc => (
                <button
                  key={proc.id} type="button"
                  onClick={() => toggleSelection(proc.label, selectedProcedures, 8, setSelectedProcedures)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    selectedProcedures.includes(proc.label)
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-200'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50'
                  }`}
                >
                  {proc.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Patient Capacity Status</label>
              <div className="flex flex-col gap-2">
                {['Accepting New Patients', 'Consultations Only', 'Not Accepting'].map(status => (
                  <label key={status} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                    <input
                      type="radio" name="capacity" value={status}
                      checked={patientCapacityStatus === status}
                      onChange={e => setPatientCapacityStatus(e.target.value)}
                      className="w-4 h-4 text-blue-600 accent-blue-600"
                    />
                    <span className="text-sm font-semibold text-slate-800">{status}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Communication Mode</label>
              <div className="flex flex-col gap-2">
                {['In-Clinic', 'Online Video Consultation', 'Both'].map(mode => (
                  <label key={mode} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                    <input
                      type="radio" name="communication" value={mode}
                      checked={preferredCommunicationMode === mode}
                      onChange={e => setPreferredCommunicationMode(e.target.value)}
                      className="w-4 h-4 text-blue-600 accent-blue-600"
                    />
                    <span className="text-sm font-semibold text-slate-800">{mode}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 pt-4 border-t border-slate-100">
            <div className="flex justify-between items-end">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Professional Biography</label>
              <span className={`text-[10px] font-mono font-bold ${biography.length > 400 ? 'text-red-500' : 'text-slate-400'}`}>
                {biography.length} / 400
              </span>
            </div>
            <textarea
              required rows={4} maxLength={400}
              value={biography}
              onChange={e => setBiography(e.target.value)}
              placeholder="Provide a brief overview of your professional philosophy and experience..."
              className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500/20 text-sm"
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit" disabled={loading}
              className="py-3 px-8 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-slate-200"
            >
              {loading ? 'Saving Profile...' : 'Submit Profile for Verification'}
              {!loading && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
