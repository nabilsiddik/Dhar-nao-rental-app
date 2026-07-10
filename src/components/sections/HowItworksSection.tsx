import { Search, CalendarCheck, MapPin } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      title: "Find your perfect match",
      desc: "Browse our extensive collection of premium cars and luxury apartments tailored to your needs.",
      icon: <Search className="w-8 h-8 text-orange-600" />,
    },
    {
      title: "Book with confidence",
      desc: "Confirm your rental dates and complete your booking with our secure payment system.",
      icon: <CalendarCheck className="w-8 h-8 text-orange-600" />,
    },
    {
      title: "Enjoy your experience",
      desc: "Pick up your keys or your car and enjoy a seamless, comfortable stay or drive.",
      icon: <MapPin className="w-8 h-8 text-orange-600" />,
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Rental simple as it should be</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Experience a hassle-free booking process designed to save you time and provide maximum comfort.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300">
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}