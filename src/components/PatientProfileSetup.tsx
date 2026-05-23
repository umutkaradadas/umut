import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth, handleFirestoreError, OperationType } from '../firebase';
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';
import { HeartPulse, ChevronRight } from 'lucide-react';

interface RefData {
  id: string;
  label: string;
  isActive: boolean;
}

export function PatientProfileSetup() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  // Form Fields
  const [displayUsername, setDisplayUsername] = useState('');
  const [city, setCity] = useState('Istanbul');
  const [ageGroup, setAgeGroup] = useState('25-34');
  
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  
  const [healthJourney, setHealthJourney] = useState('');
  const [expectations, setExpectations] = useState('');
  
  // Reference Data
  const [specialties, setSpecialties] = useState<RefData[]>([]);
  const [focusAreas, setFocusAreas] = useState<RefData[]>([]);

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

    return () => {
      unsubscribeAuth();
      unsubSpecs();
      unsubFocus();
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
      const docRef = doc(db, 'patientProfiles', currentUser.uid);
      await setDoc(docRef, {
        uid: currentUser.uid,
        displayUsername,
        city,
        ageGroup,
        medicalInterests: selectedInterests,
        experiencedSymptoms: selectedSymptoms,
        healthJourney,
        expectations,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }, { merge: true });

      navigate('/my-profile');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'patientProfiles');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl p-8 sm:p-10">
        
        <div className="flex items-center gap-4 border-b border-slate-100 pb-6 mb-8">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Patient Identity Setup</h2>
            <p className="text-sm text-slate-500 mt-1">Configure your privacy preferences and health goals.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Display Username</label>
              <input
                type="text" required
                value={displayUsername}
                onChange={e => setDisplayUsername(e.target.value)}
                placeholder="Alias allowed for privacy"
                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">City</label>
                <select
                  value={city} onChange={e => setCity(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium"
                >
                  <option value="Istanbul">Istanbul</option>
                  <option value="Ankara">Ankara</option>
                  <option value="Izmir">Izmir</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Age Group</label>
                <select
                  value={ageGroup} onChange={e => setAgeGroup(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium"
                >
                  <option value="18-24">18-24</option>
                  <option value="25-34">25-34</option>
                  <option value="35-44">35-44</option>
                  <option value="45-54">45-54</option>
                  <option value="55+">55+</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Areas of Medical Interest <span className="text-slate-400 normal-case ml-1">(Max 3)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {specialties.map(spec => (
                <button
                  key={spec.id} type="button"
                  onClick={() => toggleSelection(spec.label, selectedInterests, 3, setSelectedInterests)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    selectedInterests.includes(spec.label)
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-200'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50'
                  }`}
                >
                  {spec.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Experienced Symptoms / Topics <span className="text-slate-400 normal-case ml-1">(Max 5)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {focusAreas.map(focus => (
                <button
                  key={focus.id} type="button"
                  onClick={() => toggleSelection(focus.label, selectedSymptoms, 5, setSelectedSymptoms)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    selectedSymptoms.includes(focus.label)
                      ? 'bg-indigo-500 text-white border-indigo-500 shadow-sm shadow-indigo-200'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50'
                  }`}
                >
                  {focus.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5 pt-4 border-t border-slate-100">
            <div className="flex justify-between items-end">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">My Health Journey / Goals</label>
              <span className={`text-[10px] font-mono font-bold ${healthJourney.length > 400 ? 'text-red-500' : 'text-slate-400'}`}>
                {healthJourney.length} / 400
              </span>
            </div>
            <textarea
              required rows={3} maxLength={400}
              value={healthJourney}
              onChange={e => setHealthJourney(e.target.value)}
              placeholder="What answers or experiences are you seeking on the platform?"
              className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-emerald-500/20 text-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-end">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Expectations from Doctor Reviews</label>
              <span className={`text-[10px] font-mono font-bold ${expectations.length > 400 ? 'text-red-500' : 'text-slate-400'}`}>
                {expectations.length} / 400
              </span>
            </div>
            <textarea
              required rows={3} maxLength={400}
              value={expectations}
              onChange={e => setExpectations(e.target.value)}
              placeholder="e.g., Looking for clear explanations, bedside manners, treatment success..."
              className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-emerald-500/20 text-sm"
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit" disabled={loading}
              className="py-3 px-8 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-slate-200"
            >
              {loading ? 'Saving Setup...' : 'Complete Registration'}
              {!loading && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
