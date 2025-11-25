
import React, { useState } from 'react';
import { Language, ViewState, User } from '../types';
import { TRANSLATIONS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  lang: Language;
  setLang: (lang: Language) => void;
  currentView: ViewState;
  setView: (view: ViewState) => void;
  user: User | null;
}

// Custom Unique Logo Component
const SehirbazLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
       <linearGradient id="magicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
         <stop offset="0%" stopColor="#d946ef" /> {/* Fuchsia */}
         <stop offset="50%" stopColor="#8b5cf6" /> {/* Violet */}
         <stop offset="100%" stopColor="#3b82f6" /> {/* Blue */}
       </linearGradient>
       <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
           <feGaussianBlur stdDeviation="3" result="blur"/>
           <feComposite in="SourceGraphic" in2="blur" operator="over"/>
       </filter>
    </defs>
    
    {/* Image/Viewfinder Frame Corners - Subtle */}
    <path d="M20 30 L20 20 L30 20" stroke="url(#magicGrad)" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
    <path d="M80 70 L80 80 L70 80" stroke="url(#magicGrad)" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
    <path d="M80 30 L80 20 L70 20" stroke="url(#magicGrad)" strokeWidth="6" strokeLinecap="round" opacity="0.3" />
    <path d="M20 70 L20 80 L30 80" stroke="url(#magicGrad)" strokeWidth="6" strokeLinecap="round" opacity="0.3" />

    {/* Video Play Triangle (The Hat Cone) */}
    <path d="M50 25 L70 60 L30 60 Z" fill="url(#magicGrad)" opacity="0.9" />
    
    {/* Inner Play Button Accent */}
    <path d="M45 40 L58 50 L45 60 Z" fill="white" opacity="0.9" />

    {/* Voice/Audio Wave (The Hat Brim) */}
    <path d="M25 65 Q50 85 75 65" stroke="url(#magicGrad)" strokeWidth="5" strokeLinecap="round" />
    
    {/* Magic Sparkle (The Tip) */}
    <path d="M50 10 L54 22 L66 26 L54 30 L50 42 L46 30 L34 26 L46 22 Z" fill="white" filter="url(#glow)" />
  </svg>
);

const Layout: React.FC<LayoutProps> = ({ children, lang, setLang, currentView, setView, user }) => {
  const t = TRANSLATIONS[lang];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation Data Structure
  const navItems = [
      {
          key: 'video',
          label: t.navVideoTools,
          icon: 'fa-video',
          items: [
              { label: t.genTextToVideo, icon: 'fa-file-video' },
              { label: t.genImageToVideo, icon: 'fa-image' },
              { label: t.qaMergeVideo, icon: 'fa-object-group' },
              { label: t.qaCropVideo, icon: 'fa-scissors' },
              { label: t.qaResizeVideo, icon: 'fa-compress' },
              { label: t.qaTranslateVideo, icon: 'fa-language' },
          ]
      },
      {
          key: 'image',
          label: t.navImageTools,
          icon: 'fa-image',
          items: [
              { label: t.genTextToImage, icon: 'fa-pen-fancy' },
              { label: t.genLogo, icon: 'fa-shapes' },
              { label: t.genFill, icon: 'fa-fill-drip' },
              { label: t.qaRemoveBg, icon: 'fa-eraser' },
              { label: t.genRecolor, icon: 'fa-palette' },
              { label: t.qaCropImage, icon: 'fa-crop-simple' },
              { label: t.qaQrCode, icon: 'fa-qrcode' },
          ]
      },
      {
          key: 'audio',
          label: t.navAudioTools,
          icon: 'fa-microphone',
          items: [
              { label: t.genTextToSpeech, icon: 'fa-comment-dots' },
              { label: t.genMusic, icon: 'fa-music' },
              { label: t.genSoundFx, icon: 'fa-wave-square' },
              { label: t.qaEnhanceSpeech, icon: 'fa-wand-magic' },
              { label: t.qaTranslateAudio, icon: 'fa-headphones' },
          ]
      }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-white font-inter">
      {/* Beta Disclaimer Banner */}
      <div className="bg-yellow-600/20 border-b border-yellow-500/20 text-yellow-100 px-4 py-2 text-xs md:text-sm text-center font-medium backdrop-blur-sm relative z-[60]">
         <i className="fas fa-exclamation-triangle mr-2 text-yellow-400"></i>
         {t.betaDisclaimer}
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 shadow-2xl">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          
          {/* Logo Section */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setView('home')}>
            <div className="w-12 h-12 bg-slate-800/50 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.15)] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300 border border-white/10 group-hover:bg-slate-800">
               <SehirbazLogo className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-purple-200 group-hover:to-white transition-all hidden sm:block">
              Sehirbaz AI
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            <button 
                onClick={() => setView('home')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${currentView === 'home' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              {t.navHome}
            </button>

            {/* Dynamic Dropdowns */}
            {navItems.map((category) => (
                <div key={category.key} className="relative group">
                    <button className="flex items-center px-4 py-2 rounded-full text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all group-hover:text-blue-400">
                        <i className={`fas ${category.icon} mr-2 text-xs opacity-70`}></i>
                        {category.label}
                        <i className="fas fa-chevron-down ml-1 text-[10px] opacity-50 group-hover:rotate-180 transition-transform duration-300"></i>
                    </button>
                    
                    {/* Dropdown Content */}
                    <div className="absolute top-full left-0 w-64 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 pointer-events-none group-hover:pointer-events-auto">
                        <div className="bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden p-2">
                            {category.items.map((item, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => {
                                        // Scroll to playground or set specific view
                                        const el = document.getElementById('playground');
                                        el?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="w-full flex items-center p-3 rounded-xl hover:bg-white/5 transition-colors text-left group/item"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 flex items-center justify-center mr-3 group-hover/item:border-blue-500/50 group-hover/item:from-blue-500/20 group-hover/item:to-purple-500/20 transition-all">
                                        <i className={`fas ${item.icon} text-slate-400 group-hover/item:text-blue-400 text-xs`}></i>
                                    </div>
                                    <span className="text-sm text-slate-300 group-hover/item:text-white font-medium">{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            ))}

            <button 
                onClick={() => setView('pricing')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${currentView === 'pricing' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              {t.navPricing}
            </button>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
             
            {/* Payment / Top Up Button (VISIBLE ALWAYS) */}
            <button 
                onClick={() => setView('payment')}
                className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-full bg-green-600/20 text-green-400 border border-green-500/30 hover:bg-green-600 hover:text-white transition-all text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(34,197,94,0.2)] hover:shadow-[0_0_25px_rgba(34,197,94,0.4)]"
            >
                <i className="fas fa-plus-circle"></i>
                <span>{t.topUpBtn}</span>
            </button>

             {/* Language */}
            <div className="relative group z-50">
                <button className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 text-slate-300 hover:text-white text-xs font-medium transition-all">
                    {lang === Language.AZ && <img src="https://flagcdn.com/w40/az.png" className="w-4 h-auto rounded-sm shadow-sm" alt="AZ" />}
                    {lang === Language.EN && <img src="https://flagcdn.com/w40/gb.png" className="w-4 h-auto rounded-sm shadow-sm" alt="EN" />}
                    {lang === Language.RU && <img src="https://flagcdn.com/w40/ru.png" className="w-4 h-auto rounded-sm shadow-sm" alt="RU" />}
                    {lang === Language.GE && <img src="https://flagcdn.com/w40/ge.png" className="w-4 h-auto rounded-sm shadow-sm" alt="GE" />}
                    <span>{lang}</span>
                </button>
                <div className="absolute right-0 mt-2 w-32 bg-slate-900 border border-white/10 rounded-xl shadow-xl py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {(Object.keys(Language) as Language[]).map((l) => (
                        <button
                            key={l}
                            onClick={() => setLang(l)}
                            className={`block w-full text-left px-4 py-2 text-xs hover:bg-white/5 flex items-center space-x-2 ${lang === l ? 'text-blue-400 bg-white/5' : 'text-slate-300'}`}
                        >
                             {l === 'AZ' && <img src="https://flagcdn.com/w40/az.png" className="w-4 h-auto rounded-sm" alt="AZ" />}
                             {l === 'EN' && <img src="https://flagcdn.com/w40/gb.png" className="w-4 h-auto rounded-sm" alt="EN" />}
                             {l === 'RU' && <img src="https://flagcdn.com/w40/ru.png" className="w-4 h-auto rounded-sm" alt="RU" />}
                             {l === 'GE' && <img src="https://flagcdn.com/w40/ge.png" className="w-4 h-auto rounded-sm" alt="GE" />}
                             <span>{l === 'AZ' ? 'Azərbaycan' : l === 'EN' ? 'English' : l === 'RU' ? 'Русский' : 'ქართული'}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-slate-300 hover:text-white"
            >
                <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>

            {/* Auth Buttons (Desktop) */}
            <div className="hidden lg:block pl-3 border-l border-white/10">
                {user ? (
                    <button 
                        onClick={() => setView('profile')}
                        className={`flex items-center space-x-2 text-sm font-medium transition-colors ${currentView === 'profile' ? 'text-blue-400' : 'text-slate-300 hover:text-white'}`}
                    >
                        <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden border border-slate-600 ring-2 ring-transparent hover:ring-blue-500/50 transition-all">
                             {user.avatar ? (
                                 <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                             ) : (
                                 <div className="w-full h-full flex items-center justify-center text-xs">{user.name.charAt(0)}</div>
                             )}
                        </div>
                    </button>
                ) : (
                    <button 
                        onClick={() => setView('login')}
                        className="px-5 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all transform hover:-translate-y-0.5"
                    >
                        {t.navLogin}
                    </button>
                )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-white/10 shadow-2xl animate-fade-in">
                <div className="p-4 space-y-4 max-h-[80vh] overflow-y-auto">
                    <button onClick={() => { setView('home'); setIsMobileMenuOpen(false); }} className="w-full text-left py-3 px-4 rounded-xl hover:bg-white/5 text-slate-300 font-medium">
                        {t.navHome}
                    </button>

                    {/* Mobile Payment Button */}
                    <button 
                        onClick={() => { setView('payment'); setIsMobileMenuOpen(false); }}
                        className="w-full flex items-center py-3 px-4 rounded-xl bg-green-900/20 text-green-400 border border-green-500/20 hover:bg-green-900/40"
                    >
                        <i className="fas fa-plus-circle mr-3"></i>
                        {t.topUpBtn}
                    </button>
                    
                    {navItems.map((category) => (
                        <div key={category.key} className="border-t border-white/5 pt-2">
                             <div className="px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center">
                                <i className={`fas ${category.icon} mr-2`}></i> {category.label}
                             </div>
                             <div className="grid grid-cols-2 gap-2 px-2">
                                {category.items.map((item, idx) => (
                                    <button 
                                        key={idx}
                                        onClick={() => { setIsMobileMenuOpen(false); const el = document.getElementById('playground'); el?.scrollIntoView({ behavior: 'smooth' }); }}
                                        className="text-left p-2 rounded-lg hover:bg-white/5 text-xs text-slate-300 truncate"
                                    >
                                        {item.label}
                                    </button>
                                ))}
                             </div>
                        </div>
                    ))}

                    <button onClick={() => { setView('pricing'); setIsMobileMenuOpen(false); }} className="w-full text-left py-3 px-4 rounded-xl hover:bg-white/5 text-slate-300 font-medium border-t border-white/5">
                        {t.navPricing}
                    </button>

                    <div className="pt-4 border-t border-white/5">
                        {user ? (
                            <button onClick={() => { setView('profile'); setIsMobileMenuOpen(false); }} className="w-full py-3 bg-slate-800 rounded-xl text-center text-white font-bold">
                                {t.navProfile}
                            </button>
                        ) : (
                            <button onClick={() => { setView('login'); setIsMobileMenuOpen(false); }} className="w-full py-3 bg-blue-600 rounded-xl text-center text-white font-bold">
                                {t.navLogin}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/50 py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
             <div className="flex items-center space-x-3 mb-4 md:mb-0 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 group">
                <SehirbazLogo className="w-8 h-8 group-hover:rotate-12 transition-transform" />
                <span className="text-xl font-bold text-white">Sehirbaz AI</span>
             </div>
             <div className="flex space-x-6">
                 <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500 transition-all">
                     <i className="fab fa-twitter"></i>
                 </a>
                 <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-pink-500 transition-all">
                     <i className="fab fa-instagram"></i>
                 </a>
                 <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-600 transition-all">
                     <i className="fab fa-linkedin"></i>
                 </a>
             </div>
          </div>
          <div className="border-t border-white/5 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between text-sm text-slate-500">
             <p>{t.footerCopyright}</p>
             <div className="space-x-6 mt-4 md:mt-0">
                 <a href="#" className="hover:text-white transition-colors">{t.termsText.replace('Mən qəbul edirəm ', '')}</a>
                 <a href="#" className="hover:text-white transition-colors">{t.privacyText.replace('Mən qəbul edirəm ', '')}</a>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;