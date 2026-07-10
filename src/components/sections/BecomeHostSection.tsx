import { motion } from 'framer-motion';

export default function BecomeHostCTA() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden bg-slate-900 rounded-[40px] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between">
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/20 blur-[100px] -mr-48 -mt-48" />
          
          <div className="relative z-10 max-w-xl text-center md:text-left mb-8 md:mb-0">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Earn money by sharing your <span className="text-orange-500">Space or Car</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Join thousands of hosts in Bangladesh. List your property or vehicle on DharNao and start earning extra income today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-orange-600/20">
                List Your Property
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-8 py-4 rounded-2xl font-bold transition-all">
                Learn How it Works
              </button>
            </div>
          </div>

          <div className="relative z-10 hidden lg:block">
            <div className="grid grid-cols-2 gap-4 w-[400px]">
              <div className="space-y-4 pt-12">
                <img src="/api/placeholder/200/250" className="rounded-3xl object-cover shadow-2xl border-4 border-white/10" alt="Apartment" />
                <img src="/api/placeholder/200/180" className="rounded-3xl object-cover shadow-2xl border-4 border-white/10" alt="Car Interior" />
              </div>
              <div className="space-y-4">
                <img src="/api/placeholder/200/180" className="rounded-3xl object-cover shadow-2xl border-4 border-white/10" alt="Car" />
                <img src="/api/placeholder/200/250" className="rounded-3xl object-cover shadow-2xl border-4 border-white/10" alt="Modern Living" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}