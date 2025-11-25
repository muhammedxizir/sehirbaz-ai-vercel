
import React, { useState } from 'react';
import { Translation, User } from '../types';

interface ProfileProps {
  t: Translation;
  user: User;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ t, user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'settings'>('overview');
  const [settingsForm, setSettingsForm] = useState({ name: user.name, email: user.email });
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [showAllHistory, setShowAllHistory] = useState(false);

  const INITIAL_HISTORY_LIMIT = 6;
  const displayedHistory = showAllHistory ? user.history : user.history.slice(0, INITIAL_HISTORY_LIMIT);

  const handleSettingsSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">{t.profileTitle}</h2>
            <button 
              onClick={onLogout}
              className="mt-4 md:mt-0 px-4 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors flex items-center space-x-2 text-sm font-medium"
            >
              <i className="fas fa-sign-out-alt"></i>
              <span>{t.logout}</span>
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Sidebar / User Info Card */}
          <div className="md:col-span-1">
             <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-lg text-center h-fit sticky top-24">
                <div className="w-24 h-24 mx-auto mb-4 relative">
                   <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-full border-4 border-slate-700 shadow-xl" />
                   <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-slate-800"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{user.name}</h3>
                <p className="text-slate-400 text-sm mb-6">{user.email}</p>
                
                <div className="space-y-2">
                    <button 
                        onClick={() => setActiveTab('overview')}
                        className={`w-full py-2 px-4 rounded-lg text-left transition-colors flex items-center ${activeTab === 'overview' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'hover:bg-slate-700 text-slate-300'}`}
                    >
                        <i className="fas fa-chart-pie w-6"></i> {t.tabOverview}
                    </button>
                    <button 
                        onClick={() => setActiveTab('history')}
                        className={`w-full py-2 px-4 rounded-lg text-left transition-colors flex items-center ${activeTab === 'history' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'hover:bg-slate-700 text-slate-300'}`}
                    >
                        <i className="fas fa-history w-6"></i> {t.tabHistory}
                    </button>
                    <button 
                        onClick={() => setActiveTab('settings')}
                        className={`w-full py-2 px-4 rounded-lg text-left transition-colors flex items-center ${activeTab === 'settings' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'hover:bg-slate-700 text-slate-300'}`}
                    >
                        <i className="fas fa-cog w-6"></i> {t.tabSettings}
                    </button>
                </div>
             </div>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-3">
             {/* OVERVIEW TAB */}
             {activeTab === 'overview' && (
                 <div className="space-y-6 animate-fade-in">
                     {/* Plan Status */}
                     <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-2xl p-6 border border-blue-500/30 flex justify-between items-center">
                         <div>
                             <p className="text-slate-400 text-sm uppercase tracking-wider mb-1">{t.currentPlan}</p>
                             <h3 className="text-3xl font-bold text-white">{user.plan}</h3>
                         </div>
                         <button className="px-5 py-2 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-200 transition-colors">
                             {t.upgradePlan}
                         </button>
                     </div>

                     {/* Usage Stats */}
                     <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-lg">
                        <h4 className="text-lg font-bold text-white mb-6 flex items-center">
                            <i className="fas fa-chart-bar text-blue-500 mr-2"></i> {t.usageStats}
                        </h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                                <div className="flex justify-between items-start mb-2">
                                   <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400">
                                       <i className="fas fa-image"></i>
                                   </div>
                                   <span className="text-2xl font-bold text-white">{user.usage.image}</span>
                                </div>
                                <p className="text-slate-400 text-sm">{t.imagesGenerated}</p>
                            </div>

                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                                <div className="flex justify-between items-start mb-2">
                                   <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                                       <i className="fas fa-video"></i>
                                   </div>
                                   <span className="text-2xl font-bold text-white">{user.usage.video}</span>
                                </div>
                                <p className="text-slate-400 text-sm">{t.videosGenerated}</p>
                            </div>

                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                                <div className="flex justify-between items-start mb-2">
                                   <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400">
                                       <i className="fas fa-microphone-lines"></i>
                                   </div>
                                   <span className="text-2xl font-bold text-white">{user.usage.audio}</span>
                                </div>
                                <p className="text-slate-400 text-sm">{t.tabAudio}</p>
                            </div>
                        </div>
                     </div>
                 </div>
             )}

             {/* HISTORY TAB */}
             {activeTab === 'history' && (
                 <div className="animate-fade-in">
                     <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-lg min-h-[400px]">
                        <h4 className="text-lg font-bold text-white mb-6 flex items-center">
                            <i className="fas fa-history text-blue-500 mr-2"></i> {t.tabHistory}
                        </h4>

                        {user.history && user.history.length > 0 ? (
                            <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {displayedHistory.map((item, index) => (
                                    <div key={index} className="group relative bg-slate-900 rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-colors">
                                        <div className="aspect-video bg-black flex items-center justify-center overflow-hidden">
                                            {item.type === 'video' ? (
                                                <video src={item.url} className="w-full h-full object-cover" muted playsInline />
                                            ) : item.type === 'image' ? (
                                                <img src={item.url} alt="History" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="flex flex-col items-center justify-center text-slate-500 w-full h-full bg-slate-900">
                                                    <i className="fas fa-wave-square text-3xl mb-2 text-green-400"></i>
                                                    <span className="text-xs">Audio</span>
                                                </div>
                                            )}
                                            
                                            {/* Hover Actions */}
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                                                 <a href={item.url} download target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-slate-900 rounded-full hover:bg-blue-400 hover:text-white transition-colors">
                                                     <i className="fas fa-download"></i>
                                                 </a>
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                                                    item.type === 'video' ? 'bg-blue-500/20 text-blue-400' :
                                                    item.type === 'image' ? 'bg-pink-500/20 text-pink-400' :
                                                    'bg-green-500/20 text-green-400'
                                                }`}>
                                                    {item.type}
                                                </span>
                                                <span className="text-[10px] text-slate-500">
                                                    {item.timestamp ? new Date(item.timestamp).toLocaleDateString() : 'Recent'}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-300 line-clamp-2" title={item.prompt}>{item.prompt}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {/* View All / Show Less Toggle */}
                            {user.history.length > INITIAL_HISTORY_LIMIT && (
                                <div className="mt-8 text-center border-t border-slate-700 pt-6">
                                    <button 
                                        onClick={() => setShowAllHistory(!showAllHistory)}
                                        className="px-6 py-2 rounded-full border border-slate-600 hover:border-blue-400 text-slate-300 hover:text-white hover:bg-slate-700 transition-all text-sm font-medium"
                                    >
                                        {showAllHistory ? (
                                            <>
                                                <span>{t.showLess}</span>
                                                <i className="fas fa-chevron-up ml-2"></i>
                                            </>
                                        ) : (
                                            <>
                                                <span>{t.showMore}</span>
                                                <i className="fas fa-chevron-down ml-2"></i>
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                                <i className="far fa-folder-open text-5xl mb-4 opacity-50"></i>
                                <p>{t.noHistory}</p>
                            </div>
                        )}
                     </div>
                 </div>
             )}

             {/* SETTINGS TAB */}
             {activeTab === 'settings' && (
                 <div className="animate-fade-in">
                     <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-lg">
                        <h4 className="text-lg font-bold text-white mb-6 flex items-center">
                            <i className="fas fa-user-cog text-blue-500 mr-2"></i> {t.tabSettings}
                        </h4>
                        
                        <form onSubmit={handleSettingsSave} className="space-y-6 max-w-xl">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">{t.nameLabel}</label>
                                <input 
                                    type="text" 
                                    value={settingsForm.name}
                                    onChange={(e) => setSettingsForm({...settingsForm, name: e.target.value})}
                                    className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">{t.emailLabel}</label>
                                <input 
                                    type="email" 
                                    value={settingsForm.email}
                                    onChange={(e) => setSettingsForm({...settingsForm, email: e.target.value})}
                                    className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                                />
                            </div>
                            
                            <div className="pt-4 border-t border-slate-700">
                                <button 
                                    type="submit" 
                                    className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-lg shadow-blue-500/20"
                                >
                                    {t.saveChanges}
                                </button>
                                {settingsSaved && (
                                    <span className="ml-4 text-green-400 text-sm font-medium animate-fade-in">
                                        <i className="fas fa-check-circle mr-1"></i> {t.settingsSaved}
                                    </span>
                                )}
                            </div>
                        </form>
                     </div>
                 </div>
             )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
