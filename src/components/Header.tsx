import { ShieldCheck, Activity, PenTool, Sparkles, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';

export function Header() {
  const [user, setUser] = useState(auth.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => setUser(u));
    return unsub;
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
      {/* Secure Gate Banner */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-2 px-4 flex items-center justify-between font-mono">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="truncate">
            <strong className="text-white mr-1">Güven Zinciri Aktif:</strong> 
            248,193 doğrulanmış tedavi deneyimi kriptografik olarak imzalandı. KVKK uyumlu sıfır-bilgi kanıtları devrede.
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Logo Branding */}
        <Link 
          to="/" 
          className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
        >
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-700 flex items-center justify-center text-white shadow-md shadow-blue-100 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5.5 h-5.5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 leading-tight tracking-tight text-base sm:text-lg">
              Care<span className="text-blue-600">Trust</span>
            </h1>
            <p className="text-[11px] text-slate-500 font-medium">Doktor Güvenilirlik Portalı</p>
          </div>
        </Link>

        {/* Navigation Items */}
        <nav className="flex items-center gap-1.5 sm:gap-4">
          <Link
            to="/"
            className="px-3 py-2 rounded-lg text-sm font-medium transition-colors text-slate-600 hover:text-slate-900 hover:bg-slate-50"
          >
            Güvenilir Hekim Bul
          </Link>

          {!user ? (
            <Link
              to="/register"
              className="px-3 py-2 rounded-lg text-sm font-bold text-blue-600 hover:bg-blue-50 transition-colors"
            >
              Sign Up / Login
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/my-profile"
                className="px-3 py-2 rounded-lg text-sm font-bold text-emerald-600 hover:bg-emerald-50 transition-colors flex items-center gap-1.5"
              >
                <User className="w-4 h-4" /> My Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-lg text-sm font-bold text-slate-500 hover:bg-slate-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

          <Link
            to="/submit"
            className="px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-xs bg-emerald-600 hover:bg-emerald-700 text-white hover:scale-102"
          >
            <PenTool className="w-4 h-4" />
            <span className="hidden sm:inline">Deneyimini Paylaş</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
