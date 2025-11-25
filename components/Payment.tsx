
import React, { useState, useEffect } from 'react';
import { Translation } from '../types';

interface PaymentProps {
  t: Translation;
  selectedPlan: string;
  onBack: () => void;
  onSuccess: () => void;
}

const Payment: React.FC<PaymentProps> = ({ t, selectedPlan, onBack, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const [credits, setCredits] = useState<number>(0);

  // Initialize amount based on selected plan if any
  useEffect(() => {
    if (selectedPlan === t.planStarter || selectedPlan === 'Starter') setAmount(9);
    else if (selectedPlan === t.planPro || selectedPlan === 'Pro') setAmount(29);
    else if (selectedPlan === t.planEnterprise || selectedPlan === 'Enterprise') setAmount(99);
    else setAmount(10); // Default for custom
  }, [selectedPlan, t]);

  // Auto calculate credits: 1 AZN = 10 Credits (Example ratio)
  useEffect(() => {
    setCredits(amount * 10);
  }, [amount]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-24 flex items-center justify-center">
        <div className="bg-slate-800 rounded-2xl p-8 md:p-12 max-w-lg w-full text-center border border-slate-700 shadow-2xl animate-fade-in">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-check text-4xl text-green-500"></i>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">{t.paymentSuccess}</h2>
          <p className="text-slate-400 mb-8">{t.paymentSuccessDesc}</p>
          <div className="bg-slate-900 p-4 rounded-xl mb-6">
              <span className="text-slate-500 text-sm">Added to Balance</span>
              <div className="text-2xl font-bold text-white">{credits} Credits</div>
          </div>
          <button 
            onClick={onSuccess}
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all"
          >
            {t.backToHome}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl">
           <div className="flex justify-between items-center mb-8">
               <h2 className="text-2xl font-bold text-white">{t.paymentTitle}</h2>
               <button onClick={onBack} className="text-slate-400 hover:text-white">
                  <i className="fas fa-times"></i>
               </button>
           </div>
           
           <p className="text-slate-400 mb-6 text-sm">{t.paymentDesc}</p>

           <form onSubmit={handleSubmit} className="space-y-6">
             
             {/* Amount Input with Auto Calculator */}
             <div className="bg-slate-900/50 p-6 rounded-2xl border border-blue-500/30">
                <label className="block text-sm font-bold text-blue-400 mb-2 uppercase tracking-wider">{t.enterAmount}</label>
                <div className="relative flex items-center">
                    <span className="text-2xl text-white font-bold mr-2">₼</span>
                    <input 
                        type="number" 
                        min="1"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full bg-transparent text-3xl font-bold text-white outline-none placeholder-slate-600"
                        placeholder="0" 
                    />
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                    <span className="text-sm text-slate-400">{t.creditsReceived}:</span>
                    <span className="text-xl font-bold text-green-400">{credits} CR</span>
                </div>
             </div>
             
             {/* Simple Card Fields */}
             <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">{t.cardNumber}</label>
                <div className="relative">
                    <input required type="text" maxLength={19} placeholder="0000 0000 0000 0000" className="w-full bg-slate-900 border border-slate-600 rounded-xl p-4 pl-12 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-mono text-lg" />
                    <i className="fas fa-credit-card absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg"></i>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">{t.expiry}</label>
                  <input required type="text" placeholder="MM/YY" maxLength={5} className="w-full bg-slate-900 border border-slate-600 rounded-xl p-4 text-center text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-mono text-lg" />
               </div>
               <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">{t.cvc}</label>
                  <input required type="text" placeholder="123" maxLength={3} className="w-full bg-slate-900 border border-slate-600 rounded-xl p-4 text-center text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-mono text-lg" />
               </div>
             </div>

             <button 
                type="submit" 
                disabled={isProcessing || amount <= 0}
                className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold shadow-lg shadow-green-500/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center text-lg"
             >
                {isProcessing ? (
                  <i className="fas fa-circle-notch fa-spin"></i>
                ) : (
                  <>
                    {t.payNow} {amount} ₼
                  </>
                )}
             </button>
           </form>
           
           <div className="mt-6 text-center">
               <p className="text-xs text-slate-500"><i className="fas fa-lock mr-1"></i> Secured by Stripe SSL</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
