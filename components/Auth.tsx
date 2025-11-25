
import React, { useState } from 'react';
import { Translation, User } from '../types';

interface AuthProps {
  t: Translation;
  mode: 'login' | 'register';
  onAuthSuccess: (user: User) => void;
  onSwitchMode: (mode: 'login' | 'register') => void;
}

const Auth: React.FC<AuthProps> = ({ t, mode, onAuthSuccess, onSwitchMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'register') {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        if (!termsAccepted || !privacyAccepted) {
            alert("Please accept terms and privacy policy");
            return;
        }
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Mock user data
      const mockUser: User = {
        name: name || 'User',
        email: email,
        plan: 'Free',
        avatar: 'https://ui-avatars.com/api/?name=' + (name || 'User') + '&background=0D8ABC&color=fff',
        usage: {
          video: 0,
          image: 0,
          audio: 0
        },
        history: []
      };
      onAuthSuccess(mockUser);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[85vh]">
      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/50 rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row animate-fade-in relative z-10">
        
        {/* Left Side (Form) */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                {mode === 'login' ? t.loginTitle : t.registerTitle}
            </h2>
            <p className="text-slate-400 mb-8 text-sm">
                {mode === 'login' ? t.welcomeBack : t.authSubtitle}
            </p>

            {mode === 'register' && (
                <div className="mb-6 inline-flex items-center px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold w-fit">
                    <i className="fas fa-gift mr-2"></i> {t.freeTrialBadge}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'register' && (
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">{t.nameLabel}</label>
                    <input 
                        type="text" 
                        required 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none" 
                        placeholder={t.nameLabel}
                    />
                </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">{t.emailLabel}</label>
                    <input 
                        type="email" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none" 
                        placeholder="sizin@email.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">{t.passwordLabel}</label>
                    <input 
                        type="password" 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none" 
                        placeholder="••••••••"
                    />
                </div>

                {mode === 'register' && (
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">{t.confirmPasswordLabel}</label>
                        <input 
                            type="password" 
                            required 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none" 
                            placeholder="••••••••"
                        />
                    </div>
                )}

                {mode === 'register' && (
                    <div className="space-y-3 pt-2">
                        <label className="flex items-center space-x-3 cursor-pointer group">
                            <input 
                                type="checkbox" 
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                className="w-4 h-4 rounded border-slate-600 text-blue-500 focus:ring-blue-500 bg-slate-900/50" 
                            />
                            <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">{t.termsText}</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer group">
                            <input 
                                type="checkbox" 
                                checked={privacyAccepted}
                                onChange={(e) => setPrivacyAccepted(e.target.checked)}
                                className="w-4 h-4 rounded border-slate-600 text-blue-500 focus:ring-blue-500 bg-slate-900/50" 
                            />
                            <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">{t.privacyText}</span>
                        </label>
                    </div>
                )}

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 mt-4 flex justify-center items-center"
                >
                    {loading ? <i className="fas fa-circle-notch fa-spin"></i> : (mode === 'login' ? t.signInBtn : t.signUpBtn)}
                </button>
            </form>

            <div className="mt-8 text-center border-t border-slate-700/50 pt-6">
                <p className="text-slate-400 text-sm">
                    {mode === 'login' ? t.noAccount : t.haveAccount}{' '}
                    <button 
                        onClick={() => onSwitchMode(mode === 'login' ? 'register' : 'login')}
                        className="text-blue-400 hover:text-blue-300 font-bold ml-1 transition-colors"
                    >
                        {mode === 'login' ? t.signUpBtn : t.signInBtn}
                    </button>
                </p>
            </div>
        </div>

        {/* Right Side (Marketing) - Hidden on mobile, visible on tablet+ */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-12 lg:p-16 flex-col justify-center text-white relative overflow-hidden">
             {/* Decorative circles */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
             
             <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 shadow-inner border border-white/20">
                     <i className="fas fa-magic text-3xl"></i>
                </div>
                
                <h3 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                    {t.heroTitle.split('–')[0]}
                </h3>
                <p className="text-blue-100 text-lg mb-10 leading-relaxed opacity-90">
                    {t.heroSubtitle}
                </p>

                <ul className="space-y-5">
                    <li className="flex items-center space-x-4">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                             <i className="fas fa-bolt text-sm"></i>
                        </div>
                        <span className="font-medium text-lg">{t.authFeatureInstant}</span>
                    </li>
                    <li className="flex items-center space-x-4">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                             <i className="fas fa-video text-sm"></i>
                        </div>
                        <span className="font-medium text-lg">{t.authFeatureHD}</span>
                    </li>
                    <li className="flex items-center space-x-4">
                         <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                             <i className="fas fa-shield-alt text-sm"></i>
                        </div>
                        <span className="font-medium text-lg">{t.authFeatureSecure}</span>
                    </li>
                </ul>
             </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
