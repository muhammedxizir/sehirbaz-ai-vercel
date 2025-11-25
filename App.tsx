
import React, { useState } from 'react';
import Layout from './components/Layout';
import Playground from './components/Playground';
import Pricing from './components/Pricing';
import Payment from './components/Payment';
import Auth from './components/Auth';
import Profile from './components/Profile';
import { Language, ViewState, User, GeneratedContent } from './types';
import { TRANSLATIONS } from './constants';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(Language.GE);
  const [currentView, setView] = useState<ViewState>('home');
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const t = TRANSLATIONS[lang];

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
    setView('payment');
  };

  const handleLogin = (loggedInUser: User) => {
      // Ensure user has usage stats initialized
      const userWithUsage: User = {
          ...loggedInUser,
          usage: loggedInUser.usage || { video: 0, image: 0, audio: 0 },
          history: loggedInUser.history || []
      };
      setUser(userWithUsage);
      setView('home');
  };

  const handleLogout = () => {
      setUser(null);
      setView('home');
  };

  const handlePaymentSuccess = () => {
      // Upgrade user if logged in
      if (user) {
          setUser({ ...user, plan: selectedPlan || 'Pro' });
      }
      setView('home');
  };

  const handleContentGenerated = (content: GeneratedContent) => {
      if (user) {
          setUser(prev => {
              if (!prev) return null;
              return {
                  ...prev,
                  usage: {
                      ...prev.usage,
                      [content.type]: (prev.usage[content.type] || 0) + 1
                  },
                  history: [content, ...prev.history]
              };
          });
      }
  };

  // Expanded Mock data for the Gallery with specific visually appealing seeds
  const demoItems = [
    { id: 1, type: 'video', size: 'large', img: 'https://picsum.photos/seed/cyberpunk/800/800', category: 'City', title: 'Cyberpunk Metropolis' },
    { id: 2, type: 'image', size: 'tall', img: 'https://picsum.photos/seed/portrait/400/800', category: 'Portrait', title: 'Ethereal Queen' },
    { id: 3, type: 'image', size: 'standard', img: 'https://picsum.photos/seed/mountains/400/400', category: 'Nature', title: 'Mist Mountains' },
    { id: 4, type: 'video', size: 'standard', img: 'https://picsum.photos/seed/racecar/400/400', category: 'Creative', title: 'Neon Drift' },
    { id: 5, type: 'image', size: 'wide', img: 'https://picsum.photos/seed/fluid/800/400', category: 'Creative', title: 'Abstract Fluid' },
    { id: 6, type: 'image', size: 'standard', img: 'https://picsum.photos/seed/mech/400/400', category: 'Sci-Fi', title: 'Mech Warrior' },
    { id: 7, type: 'video', size: 'standard', img: 'https://picsum.photos/seed/underwater/400/400', category: 'Nature', title: 'Deep Ocean' },
    { id: 8, type: 'image', size: 'tall', img: 'https://picsum.photos/seed/model/400/800', category: 'Portrait', title: 'Future Fashion' },
    { id: 9, type: 'image', size: 'standard', img: 'https://picsum.photos/seed/spaceship/400/400', category: 'Sci-Fi', title: 'Orbital Station' },
    { id: 10, type: 'video', size: 'wide', img: 'https://picsum.photos/seed/jungle/800/400', category: 'Nature', title: 'Enchanted Forest' },
    { id: 11, type: 'image', size: 'standard', img: 'https://picsum.photos/seed/glass/400/400', category: 'City', title: 'Glass Architecture' },
    { id: 12, type: 'video', size: 'standard', img: 'https://picsum.photos/seed/particles/400/400', category: 'Creative', title: 'Fire Particles' },
    { id: 13, type: 'image', size: 'standard', img: 'https://picsum.photos/seed/dream/400/400', category: 'Creative', title: 'Surreal Dream' },
    { id: 14, type: 'video', size: 'tall', img: 'https://picsum.photos/seed/rain/400/800', category: 'City', title: 'Neon Rain' },
    { id: 15, type: 'image', size: 'wide', img: 'https://picsum.photos/seed/nebula/800/400', category: 'Sci-Fi', title: 'Cosmic Cloud' },
    { id: 16, type: 'video', size: 'standard', img: 'https://picsum.photos/seed/microchip/400/400', category: 'Sci-Fi', title: 'Quantum Core' },
  ];

  const englishCategories = ['All', 'Nature', 'City', 'Creative', 'Portrait', 'Sci-Fi'];
  const currentCategory = englishCategories[activeCategoryIndex];
  
  const filteredItems = currentCategory === 'All' 
      ? demoItems 
      : demoItems.filter(item => item.category === currentCategory);

  const renderContent = () => {
    switch (currentView) {
      case 'profile':
        if (!user) return <Auth t={t} mode="login" onAuthSuccess={handleLogin} onSwitchMode={(mode) => setView(mode)} />;
        return <Profile t={t} user={user} onLogout={handleLogout} />;
      
      case 'login':
        return <Auth t={t} mode="login" onAuthSuccess={handleLogin} onSwitchMode={(mode) => setView(mode)} />;
      
      case 'register':
        return <Auth t={t} mode="register" onAuthSuccess={handleLogin} onSwitchMode={(mode) => setView(mode)} />;

      case 'payment':
        return (
          <Payment 
            t={t} 
            selectedPlan={selectedPlan} 
            onBack={() => setView('pricing')}
            onSuccess={handlePaymentSuccess}
          />
        );
      case 'pricing':
        return <Pricing t={t} onPlanSelect={handlePlanSelect} />;
      case 'home':
      default:
        return (
          <>
            {/* Hero Section */}
            <section className="relative pt-24 pb-32 overflow-hidden">
               {/* Animated Background Elements */}
              <div className="absolute inset-0 -z-10">
                  {/* Subtle Grid Pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                  
                  {/* Moving Blobs - Large and Soft */}
                  <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
                  <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                  <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
              </div>

              <div className="container mx-auto px-4 text-center relative z-10">
                <div className="inline-block mb-4 px-4 py-1 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700 text-blue-400 text-sm font-semibold tracking-wide shadow-sm">
                  <i className="fas fa-sparkles mr-2"></i>{t.heroBadge}
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-slate-400 drop-shadow-sm">
                  {t.heroTitle}
                </h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                  {t.heroSubtitle}
                </p>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <button 
                    onClick={() => {
                        const element = document.getElementById('playground');
                        element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-1 hover:shadow-blue-500/50"
                  >
                    {t.ctaButton} <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
              </div>
            </section>

             {/* NEW: AI Creative Studio & Quick Actions Section */}
             <section className="py-20 bg-slate-900/50 relative z-20 border-y border-slate-800">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.magicToolTitle}</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">{t.magicToolDesc}</p>
                    </div>

                    {/* 1. Generative AI Suite */}
                    <div className="mb-16">
                        <h3 className="text-xl font-semibold text-slate-300 mb-6 flex items-center">
                            <i className="fas fa-wand-magic-sparkles mr-3 text-purple-400"></i>
                            {t.magicToolTitle}
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                             {[
                                 { icon: 'fa-video', color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'hover:border-blue-500/50', title: t.genTextToVideo },
                                 { icon: 'fa-film', color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'hover:border-orange-500/50', title: t.genImageToVideo },
                                 { icon: 'fa-music', color: 'text-green-500', bg: 'bg-green-500/10', border: 'hover:border-green-500/50', title: t.genMusic },
                                 { icon: 'fa-microphone', color: 'text-cyan-500', bg: 'bg-cyan-500/10', border: 'hover:border-cyan-500/50', title: t.genTextToSpeech },
                                 { icon: 'fa-wave-square', color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'hover:border-yellow-500/50', title: t.genSoundFx },
                                 { icon: 'fa-microphone-alt', color: 'text-red-400', bg: 'bg-red-500/10', border: 'hover:border-red-500/50', title: t.genVoiceToSfx },
                                 { icon: 'fa-user-circle', color: 'text-teal-500', bg: 'bg-teal-500/10', border: 'hover:border-teal-500/50', title: t.genAvatar },
                                 { icon: 'fa-image', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'hover:border-pink-500/50', title: t.genTextToImage },
                                 { icon: 'fa-fill-drip', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'hover:border-blue-500/50', title: t.genFill },
                                 { icon: 'fa-camera-retro', color: 'text-green-400', bg: 'bg-green-500/10', border: 'hover:border-green-500/50', title: t.genImageFromScene },
                                 { icon: 'fa-vector-square', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'hover:border-yellow-500/50', title: t.genTextToVector },
                                 { icon: 'fa-shapes', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'hover:border-purple-500/50', title: t.genLogo },
                                 { icon: 'fa-palette', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'hover:border-orange-500/50', title: t.genRecolor },
                                 { icon: 'fa-font', color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'hover:border-teal-500/50', title: t.genTextEffects },
                                 { icon: 'fa-layer-group', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'hover:border-indigo-500/50', title: t.genTemplate },
                             ].map((tool, idx) => (
                                 <div key={idx} className={`p-6 rounded-xl bg-slate-800 border border-slate-700 ${tool.border} transition-all hover:scale-105 cursor-pointer group`}>
                                     <div className={`w-12 h-12 rounded-lg ${tool.bg} flex items-center justify-center mb-4`}>
                                         <i className={`fas ${tool.icon} ${tool.color} text-xl`}></i>
                                     </div>
                                     <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">{tool.title}</h4>
                                 </div>
                             ))}
                        </div>
                    </div>

                    {/* 2. Quick Actions */}
                    <div>
                        <h3 className="text-xl font-semibold text-slate-300 mb-6 flex items-center">
                            <i className="fas fa-bolt mr-3 text-yellow-400"></i>
                            {t.qaTitle}
                        </h3>
                         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                             {[
                                 { icon: 'fa-language', title: t.qaTranslateVideo },
                                 { icon: 'fa-headphones-simple', title: t.qaTranslateAudio },
                                 { icon: 'fa-wand-magic', title: t.qaEnhanceSpeech },
                                 { icon: 'fa-eraser', title: t.qaRemoveBg },
                                 { icon: 'fa-crop-simple', title: t.qaCropImage },
                                 { icon: 'fa-object-group', title: t.qaMergeVideo },
                                 { icon: 'fa-closed-captioning', title: t.qaSubtitle },
                                 { icon: 'fa-qrcode', title: t.qaQrCode },
                                 { icon: 'fa-scissors', title: t.qaCropVideo },
                                 { icon: 'fa-compress', title: t.qaResizeVideo },
                                 { icon: 'fa-film', title: t.qaTrimVideo },
                                 { icon: 'fa-file-video', title: t.qaConvertMp4 },
                                 { icon: 'fa-expand', title: t.qaResizeImage },
                             ].map((action, idx) => (
                                 <button key={idx} className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:bg-slate-700 hover:border-slate-600 transition-all">
                                     <i className={`fas ${action.icon} text-slate-400 text-2xl mb-3`}></i>
                                     <span className="text-sm font-medium text-slate-300 text-center">{action.title}</span>
                                 </button>
                             ))}
                         </div>
                    </div>
                </div>
             </section>

             {/* Enhanced Demo Gallery - Masonry / Bento Grid */}
            <section id="showcase" className="py-24 bg-slate-900 overflow-hidden relative z-10">
               <div className="container mx-auto px-4">
                  <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                      <div className="mb-6 md:mb-0">
                          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">{t.demoTitle}</h2>
                          <div className="flex flex-wrap gap-2">
                              {t.demoCategories.map((cat, i) => (
                                  <button 
                                    key={i} 
                                    onClick={() => setActiveCategoryIndex(i)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${activeCategoryIndex === i ? 'bg-white text-slate-900 shadow-[0_0_15px_rgba(255,255,255,0.3)] transform scale-105' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'}`}
                                  >
                                      {cat}
                                  </button>
                              ))}
                          </div>
                      </div>
                      <button className="hidden md:flex items-center space-x-2 text-slate-400 hover:text-blue-400 transition-colors font-semibold group">
                          <span>{t.viewAll}</span>
                          <i className="fas fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
                      </button>
                  </div>
                  
                  {/* Masonry Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[240px] gap-4 min-h-[400px]">
                      {filteredItems.map((item) => {
                          // Determine grid spans based on 'size'
                          const spanClass = 
                              item.size === 'large' ? 'col-span-2 row-span-2' : 
                              item.size === 'tall' ? 'row-span-2' : 
                              item.size === 'wide' ? 'col-span-2' : 
                              'col-span-1';

                          return (
                              <div key={item.id} className={`${spanClass} relative group rounded-2xl overflow-hidden cursor-pointer bg-slate-800 animate-fade-in shadow-lg border border-slate-700/50`}>
                                  <img 
                                      src={item.img} 
                                      alt={item.title} 
                                      loading="lazy"
                                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-90 group-hover:brightness-100" 
                                  />
                                  
                                  {/* Overlay */}
                                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                          <div className="flex items-center justify-between mb-2">
                                              <span className="px-2 py-1 bg-white/20 backdrop-blur-md rounded-md text-[10px] uppercase font-bold text-white tracking-widest border border-white/10">
                                                  {item.category}
                                              </span>
                                              {item.type === 'video' && <i className="fas fa-video text-white text-xs"></i>}
                                              {item.type === 'image' && <i className="fas fa-image text-white text-xs"></i>}
                                          </div>
                                          <h4 className="text-white font-bold text-lg leading-tight shadow-black drop-shadow-md">{item.title}</h4>
                                      </div>
                                  </div>

                                  {/* Type Icon (Always visible but subtle, pops on hover) */}
                                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 border border-white/10 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                                      {item.type === 'video' ? <i className="fas fa-play text-xs pl-0.5"></i> : <i className="fas fa-search-plus text-xs"></i>}
                                  </div>
                              </div>
                          );
                      })}
                  </div>

                  <div className="mt-8 flex justify-center md:hidden">
                       <button className="px-6 py-3 rounded-full bg-slate-800 text-white font-medium hover:bg-slate-700 transition-colors w-full">
                          {t.viewAll}
                       </button>
                  </div>
               </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-slate-950 relative">
               <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
              <div className="container mx-auto px-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                      {/* Video Feature */}
                      <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 transition-all group backdrop-blur-sm">
                          <div className="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner border border-slate-700">
                              <i className="fas fa-video text-2xl text-blue-400"></i>
                          </div>
                          <h3 className="text-2xl font-bold mb-4">{t.videoTitle}</h3>
                          <p className="text-slate-400 mb-6">{t.videoDesc}</p>
                          <ul className="space-y-2">
                              {t.videoFeatures.map((f, i) => (
                                  <li key={i} className="flex items-center text-slate-300 text-sm">
                                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                                      {f}
                                  </li>
                              ))}
                          </ul>
                      </div>

                      {/* Image Feature */}
                      <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-pink-500/50 transition-all group backdrop-blur-sm">
                          <div className="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner border border-slate-700">
                              <i className="fas fa-image text-2xl text-pink-400"></i>
                          </div>
                          <h3 className="text-2xl font-bold mb-4">{t.imageTitle}</h3>
                          <p className="text-slate-400 mb-6">{t.imageDesc}</p>
                          <ul className="space-y-2">
                              {t.imageFeatures.map((f, i) => (
                                  <li key={i} className="flex items-center text-slate-300 text-sm">
                                      <div className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-3"></div>
                                      {f}
                                  </li>
                              ))}
                          </ul>
                      </div>

                       {/* Voice Feature */}
                       <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-green-500/50 transition-all group backdrop-blur-sm">
                          <div className="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner border border-slate-700">
                              <i className="fas fa-microphone-lines text-2xl text-green-400"></i>
                          </div>
                          <h3 className="text-2xl font-bold mb-4">{t.voiceTitle}</h3>
                          <p className="text-slate-400 mb-6">{t.voiceDesc}</p>
                          <ul className="space-y-2">
                              {t.voiceFeatures.map((f, i) => (
                                  <li key={i} className="flex items-center text-slate-300 text-sm">
                                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
                                      {f}
                                  </li>
                              ))}
                          </ul>
                      </div>
                  </div>
              </div>
            </section>

            {/* Playground / Generator */}
            <Playground 
                t={t} 
                user={user} 
                onContentGenerated={handleContentGenerated} 
                onUpgrade={() => setView('pricing')}
            />

            {/* Marketing Prompt CTA */}
            <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
               {/* Simple accent for CTA */}
               <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
               <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
               
               <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
                  <i className="fas fa-quote-left text-4xl text-slate-700 mb-6 block"></i>
                  <h3 className="text-2xl md:text-3xl font-medium leading-relaxed mb-8 text-slate-200">
                    “{t.marketingQuote}”
                  </h3>
                  <div className="flex justify-center">
                      <button 
                          onClick={() => setView('pricing')}
                          className="px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-slate-200 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                      >
                         {t.ctaButton}
                      </button>
                  </div>
               </div>
            </section>
          </>
        );
    }
  };

  return (
    <Layout lang={lang} setLang={setLang} currentView={currentView} setView={setView} user={user}>
      {renderContent()}
    </Layout>
  );
};

export default App;