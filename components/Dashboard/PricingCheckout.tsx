
import React from 'react';
import { Check, ShieldCheck, Zap, ArrowLeft, CreditCard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const PricingCheckout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto pb-20 pt-8 animate-in fade-in duration-500">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-gray-900 font-bold mb-8 transition">
        <ArrowLeft size={18} />
        <span>Back to Pricing</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Plan Summary */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">Upgrade to Pro</h1>
            <p className="text-gray-500 font-medium text-lg">Unleash the full power of AI for your business.</p>
          </div>

          <div className="bg-gray-900 text-white p-8 rounded-[3rem] shadow-2xl shadow-indigo-100 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-black uppercase tracking-widest text-red-500">Selected Plan</span>
              <div className="bg-white/10 px-3 py-1 rounded-lg text-[10px] font-black uppercase">Annual</div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-black">$19</span>
              <span className="text-gray-400 text-xl">/mo</span>
            </div>
            <div className="space-y-4 pt-4 border-t border-white/10">
              {[
                'Unlimited 2K AI Generations',
                'All Creative Styles (Cinematic, Art)',
                'No Watermarks on Exports',
                'Priority Processing Speed',
                'Commercial Usage License'
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
                    <Check size={12} />
                  </div>
                  <span className="font-bold">{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 bg-green-50 rounded-3xl border border-green-100">
            <ShieldCheck className="text-green-600" size={32} />
            <div>
              <p className="text-green-900 font-bold">100% Satisfaction Guarantee</p>
              <p className="text-green-700 text-xs font-medium">Cancel anytime. No questions asked.</p>
            </div>
          </div>
        </div>

        {/* Right: Dummy Payment Form */}
        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 space-y-8 h-fit">
          <div className="flex items-center gap-2 text-gray-900">
            <CreditCard size={20} className="text-red-600" />
            <h2 className="text-xl font-black uppercase tracking-tight">Payment Method</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Card Number</label>
              <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-mono" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Expiry Date</label>
                <input type="text" placeholder="MM/YY" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1">CVV</label>
                <input type="text" placeholder="XXX" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none" />
              </div>
            </div>
          </div>

          <button className="w-full py-5 bg-red-600 text-white rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-red-50 hover:bg-red-700 transition transform hover:-translate-y-1">
            <Zap size={20} className="fill-white" />
            Subscribe Now
          </button>

          <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
            By subscribing, you agree to our Terms & Conditions. Secure 256-bit SSL encrypted payment.
          </p>

          <div className="flex justify-center gap-6 opacity-30 grayscale pt-2">
            <img src="https://www.svgrepo.com/show/328112/visa.svg" className="h-6" alt="Visa" />
            <img src="https://www.svgrepo.com/show/362002/mastercard.svg" className="h-6" alt="Mastercard" />
            <img src="https://www.svgrepo.com/show/361304/paypal.svg" className="h-6" alt="Paypal" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCheckout;
