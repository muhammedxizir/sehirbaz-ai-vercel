import React from 'react';
import { Translation } from '../types';

interface PricingProps {
  t: Translation;
  onPlanSelect: (plan: string) => void;
}

const Pricing: React.FC<PricingProps> = ({ t, onPlanSelect }) => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            {t.pricingTitle}
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            {t.pricingSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Starter Plan */}
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 flex flex-col hover:border-blue-500 transition-colors duration-300">
            <h3 className="text-xl font-semibold text-white mb-2">{t.planStarter}</h3>
            <div className="text-4xl font-bold text-white mb-6">$9<span className="text-lg text-slate-500 font-normal">{t.perMonth}</span></div>
            <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center text-slate-300"><i className="fas fa-check text-green-400 mr-3"></i> {t.feat50Images}</li>
                <li className="flex items-center text-slate-300"><i className="fas fa-check text-green-400 mr-3"></i> {t.feat5MinsVideo}</li>
                <li className="flex items-center text-slate-300"><i className="fas fa-check text-green-400 mr-3"></i> {t.featStandardSpeed}</li>
            </ul>
            <button 
                onClick={() => onPlanSelect(t.planStarter)}
                className="w-full py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold transition-all"
            >
                {t.btnChooseStarter}
            </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-slate-800 rounded-2xl p-8 border-2 border-blue-500 flex flex-col relative transform scale-105 shadow-2xl shadow-blue-900/20">
            <div className="absolute top-0 right-0 bg-blue-500 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">{t.planPopular}</div>
            <h3 className="text-xl font-semibold text-white mb-2">{t.planPro}</h3>
            <div className="text-4xl font-bold text-white mb-6">$29<span className="text-lg text-slate-500 font-normal">{t.perMonth}</span></div>
            <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center text-white"><i className="fas fa-check text-blue-400 mr-3"></i> {t.pricingFeatures[0]}</li>
                <li className="flex items-center text-white"><i className="fas fa-check text-blue-400 mr-3"></i> {t.feat30MinsVideo}</li>
                <li className="flex items-center text-white"><i className="fas fa-check text-blue-400 mr-3"></i> {t.pricingFeatures[2]}</li>
                <li className="flex items-center text-white"><i className="fas fa-check text-blue-400 mr-3"></i> {t.featVoiceCloning}</li>
            </ul>
            <button 
                onClick={() => onPlanSelect(t.planPro)}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold transition-all shadow-lg"
            >
                {t.btnGoPro}
            </button>
        </div>

        {/* Enterprise Plan */}
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 flex flex-col hover:border-purple-500 transition-colors duration-300">
            <h3 className="text-xl font-semibold text-white mb-2">{t.planEnterprise}</h3>
            <div className="text-4xl font-bold text-white mb-6">$99<span className="text-lg text-slate-500 font-normal">{t.perMonth}</span></div>
            <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center text-slate-300"><i className="fas fa-check text-purple-400 mr-3"></i> {t.featUnlimited}</li>
                <li className="flex items-center text-slate-300"><i className="fas fa-check text-purple-400 mr-3"></i> {t.featPrioritySupport}</li>
                <li className="flex items-center text-slate-300"><i className="fas fa-check text-purple-400 mr-3"></i> {t.featApiAccess}</li>
                <li className="flex items-center text-slate-300"><i className="fas fa-check text-purple-400 mr-3"></i> {t.pricingFeatures[3]}</li>
            </ul>
            <button 
                onClick={() => onPlanSelect(t.planEnterprise)}
                className="w-full py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold transition-all"
            >
                {t.btnContactSales}
            </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;