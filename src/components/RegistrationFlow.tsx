import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { Activity, AlertCircle, ShieldCheck, HeartPulse } from 'lucide-react';

export function RegistrationFlow() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Check if user already exists
      const userDocRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userDocRef);
      
      if (userSnap.exists()) {
        const userData = userSnap.data();
        if (userData.role === 'doctor') {
          navigate('/my-profile');
        } else {
          navigate('/my-profile');
        }
      } else {
        // New user, move to role selection
        setStep(2);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign in.');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelection = async (selectedRole: 'doctor' | 'patient') => {
    if (!auth.currentUser) return;
    setLoading(true);
    setError('');
    
    try {
      const user = auth.currentUser;
      const userDocRef = doc(db, 'users', user.uid);
      
      await setDoc(userDocRef, {
        uid: user.uid,
        fullName: user.displayName || 'Unknown User',
        email: user.email,
        role: selectedRole,
        createdAt: new Date().toISOString()
      });

      if (selectedRole === 'doctor') {
        navigate('/doctor-profile-form');
      } else {
        navigate('/patient-profile-form');
      }

    } catch (err: any) {
      setError(err.message || 'An error occurred setting up your profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-lg p-6 sm:p-10">
        
        {step === 1 && (
          <div className="space-y-6 text-center">
            <div className="mb-8">
              <div className="h-14 w-14 rounded-2xl bg-slate-900 flex items-center justify-center text-white mx-auto mb-4">
                <ShieldCheck className="w-7 h-7 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Access CareTrust</h2>
              <p className="text-sm text-slate-500 mt-2">Join the verified clinical transparency network.</p>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4" /> {error}
              </div>
            )}

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-4 rounded-xl border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 font-bold text-slate-700 text-sm transition-all flex items-center justify-center gap-3"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              {loading ? 'Authenticating...' : 'Continue with Google'}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in text-center">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">How will you use CareTrust?</h2>
            <p className="text-sm text-slate-500 mb-8">Select your primary identity on the platform to set up your profile.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Patient Card */}
              <button
                onClick={() => handleRoleSelection('patient')}
                disabled={loading}
                className="flex flex-col items-center text-center p-6 border-2 border-slate-200 rounded-2xl hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
              >
                <div className="h-16 w-16 rounded-full bg-slate-100 group-hover:bg-emerald-100 flex items-center justify-center text-slate-500 group-hover:text-emerald-600 mb-4 transition-colors">
                  <HeartPulse className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">I am a Patient / Reviewer</h3>
                <p className="text-xs text-slate-500">I want to share my treatment experiences securely and view verified doctor data.</p>
              </button>

              {/* Doctor Card */}
              <button
                onClick={() => handleRoleSelection('doctor')}
                disabled={loading}
                className="flex flex-col items-center text-center p-6 border-2 border-slate-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50/30 transition-all group"
              >
                <div className="h-16 w-16 rounded-full bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center text-slate-500 group-hover:text-blue-600 mb-4 transition-colors">
                  <Activity className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">I am a Medical Professional</h3>
                <p className="text-xs text-slate-500">I want to claim my profile, verify my credibility metrics, and manage my outcomes.</p>
              </button>

            </div>

            {loading && (
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                <p className="font-mono text-xs text-slate-500 font-bold animate-pulse tracking-widest uppercase">
                  Creating Secure Profile...
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
