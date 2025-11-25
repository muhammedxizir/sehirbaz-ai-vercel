
import React, { useState, useMemo } from 'react';
import { Translation, GeneratedContent, User } from '../types';
import { generateImage, generateVideo, generateSpeech, checkKey, promptSelectKey } from '../services/geminiService';
import { PLAN_LIMITS } from '../constants';

interface PlaygroundProps {
  t: Translation;
  user: User | null;
  onContentGenerated: (content: GeneratedContent) => void;
  onUpgrade: () => void;
}

type GenerationType = 'video' | 'image' | 'audio';

const Playground: React.FC<PlaygroundProps> = ({ t, user, onContentGenerated, onUpgrade }) => {
  const [activeTab, setActiveTab] = useState<GenerationType>('video');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [result, setResult] = useState<GeneratedContent | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Voice Settings
  const [selectedVoice, setSelectedVoice] = useState<string>('Kore');
  const voices = ['Puck', 'Charon', 'Kore', 'Fenrir', 'Zephyr'];

  // Calculate usage and limits
  const usageStats = useMemo(() => {
    // If no user, treat as 'Free' plan guest with local tracking simulation or just 0
    // For this implementation, we assume if user is null, they are on 'Free' tier but we might not persist properly without login.
    // Let's use the 'Free' tier limits for null users.
    const plan = user?.plan && PLAN_LIMITS[user.plan] ? user.plan : 'Free';
    const limit = PLAN_LIMITS[plan][activeTab];
    const used = user?.usage?.[activeTab] || 0;
    const remaining = Math.max(0, limit - used);
    const percentage = Math.min(100, (used / limit) * 100);
    const isLimitReached = used >= limit;

    return { plan, limit, used, remaining, percentage, isLimitReached };
  }, [user, activeTab]);

  const handleGenerate = async () => {
    setError(null);
    setResult(null);

    // Check usage limits
    if (usageStats.isLimitReached) {
        setError(t.usageLimitReached);
        return;
    }

    setIsLoading(true);

    try {
      const hasKey = await checkKey();
      if (!hasKey) {
        await promptSelectKey();
        // Double check after dialog
        const hasKeyAfter = await checkKey();
        if (!hasKeyAfter) {
            throw new Error("KEY_REQUIRED");
        }
      }

      let url = '';
      if (activeTab === 'video') {
        url = await generateVideo(prompt);
      } else if (activeTab === 'image') {
        url = await generateImage(prompt);
      } else {
        url = await generateSpeech(prompt, selectedVoice);
      }

      const newContent: GeneratedContent = {
        type: activeTab,
        url,
        prompt,
        timestamp: Date.now()
      };

      setResult(newContent);
      
      // Update usage stats and history via parent
      onContentGenerated(newContent);

    } catch (e: any) {
      console.error("GenAI Error:", e);
      const msg = e.message || '';

      if (msg === "KEY_REQUIRED" || msg.includes("API_KEY_MISSING")) {
         setError(t.loginRequired);
      } else if (msg.includes('429') || msg.includes('quota') || msg.includes('Too Many Requests')) {
         setError(t.errorRateLimit);
      } else if (msg.includes('400') && (msg.includes('API key') || msg.includes('invalid'))) {
         setError(t.errorInvalidKey);
      } else if (msg.includes('SAFETY') || msg.includes('blocked') || msg.includes('policy')) {
         setError(t.errorContentPolicy);
      } else if (msg.includes('fetch') || msg.includes('network') || msg.includes('Failed to fetch')) {
         setError(t.errorNetwork);
      } else {
         setError(t.errorGeneric);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePreviewVoice = async () => {
    if (!prompt.trim()) return;
    
    setIsPreviewing(true);
    setError(null);
    try {
        const hasKey = await checkKey();
        if (!hasKey) {
            await promptSelectKey();
             const hasKeyAfter = await checkKey();
             if (!hasKeyAfter) throw new Error("KEY_REQUIRED");
        }
        
        // Take just the first chunk of text for a quick preview
        const previewText = prompt.slice(0, 50) + "...";
        const url = await generateSpeech(previewText, selectedVoice);
        
        const audio = new Audio(url);
        audio.play();
        
        audio.onended = () => setIsPreviewing(false);
        audio.onerror = () => setIsPreviewing(false);
    } catch (e: any) {
        console.error("Preview Error", e);
        setIsPreviewing(false);
        setError(t.errorGeneric);
    }
  };

  const getTabLabel = (type: GenerationType) => {
      switch(type) {
          case 'video': return t.tabVideo;
          case 'image': return t.tabImage;
          case 'audio': return t.tabAudio;
      }
  }

  return (
    <section id="playground" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Blobs with screen blend for glow - Large and Soft */}
        <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/3 w-[500px] h-[500px] bg-indigo-600/20 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.playgroundTitle}</h2>
          <p className="text-slate-400 max-w-xl mx-auto">{t.playgroundDesc}</p>
        </div>

        <div className="max-w-4xl mx-auto bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden ring-1 ring-white/5">
            {/* Tabs */}
            <div className="flex border-b border-slate-700/50">
                {(['video', 'image', 'audio'] as GenerationType[]).map((type) => (
                    <button
                        key={type}
                        onClick={() => {
                            setActiveTab(type);
                            setError(null);
                        }}
                        className={`flex-1 py-4 text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 relative overflow-hidden
                        ${activeTab === type ? 'text-blue-400 bg-slate-700/30' : 'text-slate-400 hover:text-white hover:bg-slate-700/20'}`}
                    >
                        <i className={`fas fa-${type === 'video' ? 'video' : type === 'image' ? 'image' : 'microphone'} relative z-10`}></i>
                        <span className="capitalize relative z-10">{getTabLabel(type)}</span>
                        {activeTab === type && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.7)]"></div>
                        )}
                    </button>
                ))}
            </div>

            <div className="p-6 md:p-8">
                {/* Usage Limit Bar */}
                <div className="mb-6 bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                    <div className="flex justify-between items-center mb-2 text-xs font-medium text-slate-400">
                        <span>{t.usageStats}: {activeTab.toUpperCase()}</span>
                        <span>{usageStats.remaining} {t.usageRemaining}</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                        <div 
                            className={`h-full rounded-full transition-all duration-500 ${usageStats.isLimitReached ? 'bg-red-500' : 'bg-gradient-to-r from-blue-400 to-purple-500'}`}
                            style={{ width: `${usageStats.percentage}%` }}
                        ></div>
                    </div>
                    {usageStats.isLimitReached && (
                        <div className="mt-2 text-center text-xs text-red-400 font-bold animate-pulse">
                            {t.usageLimitReached}
                        </div>
                    )}
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="mb-6 p-4 bg-red-900/30 border border-red-500/30 rounded-lg text-red-200 flex flex-col md:flex-row items-center justify-between text-sm gap-4">
                       <span className="flex items-center"><i className="fas fa-exclamation-circle mr-2"></i> {error}</span>
                       <div className="flex gap-2">
                           {error === t.loginRequired && (
                               <button onClick={promptSelectKey} className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-xs font-bold uppercase tracking-wider shadow-sm transition-colors">
                                   {t.selectKey}
                               </button>
                           )}
                           {error === t.usageLimitReached && (
                               <button onClick={onUpgrade} className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded text-xs font-bold uppercase tracking-wider shadow-sm transition-colors">
                                   {t.upgradePlan}
                               </button>
                           )}
                       </div>
                    </div>
                )}

                {/* Controls Area */}
                <div className="mb-6 relative">
                    <div className="flex justify-between items-end mb-2">
                        <label className="block text-sm font-medium text-slate-300">
                            {activeTab === 'audio' ? t.labelTts : t.labelPrompt}
                        </label>
                        
                        {/* Audio Specific Controls */}
                        {activeTab === 'audio' && (
                            <div className="flex items-center space-x-2">
                                <label className="text-xs text-slate-400 mr-1">{t.labelVoice}:</label>
                                <select 
                                    value={selectedVoice}
                                    onChange={(e) => setSelectedVoice(e.target.value)}
                                    className="bg-slate-900 border border-slate-600 rounded px-2 py-1 text-xs text-white outline-none focus:border-blue-500"
                                >
                                    {voices.map(v => (
                                        <option key={v} value={v}>{v}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                    
                    <div className="relative">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder={t.promptPlaceholder}
                            disabled={usageStats.isLimitReached}
                            className={`w-full h-32 bg-slate-900/50 border rounded-xl p-4 text-white placeholder-slate-500 transition-all resize-none backdrop-blur-sm
                            ${usageStats.isLimitReached ? 'border-red-900/50 opacity-50 cursor-not-allowed' : 'border-slate-600/50 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50'}`}
                        ></textarea>
                        
                        {/* Preview Button for Audio */}
                        {activeTab === 'audio' && (
                            <button
                                onClick={handlePreviewVoice}
                                disabled={isPreviewing || !prompt.trim() || usageStats.isLimitReached}
                                className="absolute bottom-3 right-3 px-3 py-1.5 bg-slate-700/80 hover:bg-blue-600 text-xs font-bold rounded-lg text-white transition-colors flex items-center space-x-1 backdrop-blur-md border border-white/10 disabled:opacity-50"
                            >
                                {isPreviewing ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin"></i>
                                        <span>{t.previewing}</span>
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-play"></i>
                                        <span>{t.btnPreview}</span>
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading || !prompt.trim() || usageStats.isLimitReached}
                        className={`px-8 py-3 rounded-lg font-bold text-white shadow-lg flex items-center space-x-2 transition-all transform 
                            ${isLoading || !prompt.trim() || usageStats.isLimitReached ? 'bg-slate-700/50 cursor-not-allowed text-slate-500' : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-blue-500/25 hover:-translate-y-0.5'}`}
                    >
                        {isLoading ? (
                            <>
                                <i className="fas fa-circle-notch fa-spin"></i>
                                <span>{t.generating}</span>
                            </>
                        ) : (
                            <>
                                <i className="fas fa-wand-magic-sparkles"></i>
                                <span>{t.generateBtn}</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Result Display */}
                {result && (
                    <div className="mt-8 pt-8 border-t border-slate-700/50 animate-fade-in">
                        <div className="bg-slate-900 rounded-xl p-2 md:p-4 border border-slate-700 shadow-xl">
                             {result.type === 'video' && (
                                 <video controls autoPlay loop className="w-full rounded-lg shadow-lg bg-black">
                                     <source src={result.url} type="video/mp4" />
                                     {t.browserVideoSupport}
                                 </video>
                             )}
                             {result.type === 'image' && (
                                 <img src={result.url} alt={t.altGenerated} className="w-full h-auto rounded-lg shadow-lg" />
                             )}
                             {result.type === 'audio' && (
                                 <div className="p-12 flex flex-col items-center justify-center space-y-6 bg-slate-800/50 rounded-lg">
                                     <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center animate-pulse ring-1 ring-white/10">
                                         <i className="fas fa-wave-square text-4xl text-blue-400"></i>
                                     </div>
                                     <audio controls className="w-full max-w-md" src={result.url}></audio>
                                 </div>
                             )}
                             
                             <div className="mt-4 flex justify-end">
                                 <a 
                                    href={result.url} 
                                    download={`generated-${Date.now()}.${result.type === 'video' ? 'mp4' : result.type === 'image' ? 'png' : 'wav'}`}
                                    className="text-sm text-slate-400 hover:text-white flex items-center space-x-2 px-3 py-2 rounded hover:bg-slate-800 transition-colors"
                                 >
                                     <i className="fas fa-download"></i>
                                     <span>{t.download}</span>
                                 </a>
                             </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Playground;