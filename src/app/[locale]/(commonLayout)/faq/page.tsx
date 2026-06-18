// import React from "react";

// const faqs = [
//   {
//     question: "How do I make a booking on RentHub?",
//     answer: "To make a booking, browse our listings, select your preferred property or car, and follow the booking instructions."
//   },
//   {
//     question: "Can I book without creating an account?",
//     answer: "No, you need to create an account to book and manage your reservations."
//   },
//   {
//     question: "How do I know my booking is confirmed?",
//     answer: "You will receive a confirmation email and can view your booking in your account dashboard."
//   },
//   {
//     question: "Can I book for someone else?",
//     answer: "Yes, you can book for someone else. Please provide their details during the booking process."
//   },
//   {
//     question: "What payment methods are accepted?",
//     answer: "We accept major credit cards, debit cards, and other secure payment methods."
//   },
//   {
//     question: "Is my payment information safe?",
//     answer: "Yes, we use industry-standard encryption to protect your payment information."
//   },
//   {
//     question: "When is my card charged?",
//     answer: "Your card is charged at the time of booking."
//   },
//   {
//     question: "Will I receive a receipt?",
//     answer: "Yes, a receipt will be sent to your email after payment is processed."
//   },
//   {
//     question: "How do I cancel a booking?",
//     answer: "Go to your account dashboard, select the booking, and click 'Cancel'."
//   },
//   {
//     question: "What is the cancellation policy?",
//     answer: "Our cancellation policy varies by listing. Please check the listing details for specifics."
//   },
//   {
//     question: "How long does a refund take?",
//     answer: "Refunds are processed within 5-7 business days after cancellation."
//   },
//   {
//     question: "What if the host cancels my booking?",
//     answer: "You will receive a full refund and assistance in finding a new place."
//   },
//   {
//     question: "What documents do I need to rent a car?",
//     answer: "A valid driver's license and a credit card are required."
//   },
//   {
//     question: "Is insurance included in the car rental price?",
//     answer: "Insurance details are provided in each car listing. Please review before booking."
//   },
//   {
//     question: "Can I pick up and drop off at different locations?",
//     answer: "Some listings allow this. Check the listing or contact support for details."
//   },
//   {
//     question: "What happens if I return the car late?",
//     answer: "Late returns may incur additional charges. Please check the rental agreement."
//   },
//   {
//     question: "Is check-in always on the listed date?",
//     answer: "Yes, check-in is on the date specified in your booking."
//   },
//   {
//     question: "Are utilities included in the apartment price?",
//     answer: "Most apartments include utilities. Check the listing for details."
//   },
//   {
//     question: "What if the apartment doesn't match the listing description?",
//     answer: "Contact support immediately. We will help resolve the issue."
//   },
//   {
//     question: "Can I extend my stay?",
//     answer: "Yes, you can request an extension through your account dashboard."
//   },
//   {
//     question: "How do I change my password?",
//     answer: "Go to account settings and select 'Change Password'."
//   },
//   {
//     question: "Can I delete my account?",
//     answer: "Yes, contact support to request account deletion."
//   },
//   {
//     question: "How do I update my profile photo?",
//     answer: "Go to your profile and click 'Edit' to upload a new photo."
//   },
//   {
//     question: "How does RentHub prevent fraud?",
//     answer: "We verify listings and use secure payment systems to protect users."
//   },
//   {
//     question: "What should I do if I feel unsafe?",
//     answer: "Contact our support team immediately for assistance."
//   }
// ];

// export default function FAQPage() {
//   return (
//     <div className="min-h-screen bg-white flex flex-col">
//       <header className="py-8 border-b">
//         <div className="max-w-7xl mx-auto text-center">
//           <span className="text-red-500 font-semibold uppercase tracking-widest text-xs">Help Center</span>
//           <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-2">Frequently Asked Questions</h1>
//           <p className="text-gray-500 mb-6">Find quick answers to the most common questions about bookings, payments, cancellations, and more.</p>
//           {/* <div className="flex justify-center mb-4">
//             <input
//               type="text"
//               placeholder="Search questions..."
//               className="w-full max-w-md px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#A446FF]"
//               disabled
//             />
//           </div> */}
//         </div>
//       </header>
//       <main className="flex-1 max-w-5xl mx-auto w-full px-2 md:px-0 py-8">
//         <div className="space-y-3">
//           {faqs.map((faq, idx) => (
//             <details key={idx} className="border rounded-lg bg-[#faf9fd]">
//               <summary className="px-4 py-3 cursor-pointer font-medium select-none outline-none focus:ring-2 focus:ring-[#A446FF]">{faq.question}</summary>
//               <div className="px-4 pb-4 pt-2 text-gray-600 text-sm">{faq.answer}</div>
//             </details>
//           ))}
//         </div>
//       </main>
//       <footer className="w-full py-16 mt-12 flex items-center justify-center">
//         <div className="max-w-7xl w-full px-6">
//           <div className="bg-gradient-to-r from-[#FDE7D7] via-[#F6F0FF] to-[#E9DAFF] rounded-2xl p-8 md:p-12 shadow-sm">
//             <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
//               <div className="w-16 h-16 rounded-full bg-white/60 flex items-center justify-center mb-4">
//                 {/* Headset SVG icon */}
//                 <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-[#6b21a8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13a9 9 0 1118 0v3a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a4 4 0 00-8 0v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3z" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold mb-2">Still have questions?</h3>
//               <p className="text-gray-600 mb-6">Our support team is available every day. We&apos;re happy to help.</p>
//               <div className="flex flex-col sm:flex-row items-center gap-4">
//                 <a href="/contact" className="inline-flex items-center justify-center bg-[#A446FF] hover:bg-[#8e36d1] text-white font-semibold rounded-full px-6 py-3 transition-colors shadow">Contact Us</a>
//                 <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border-2 border-[#A446FF] text-[#6b21a8] font-semibold rounded-full px-6 py-3 transition-colors bg-white">
//                   {/* WhatsApp SVG (simple circle icon) */}
//                   <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3 9 9 0 0121 12.79z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.5 15.5c-.3.8-1.6 1.6-2.1 1.7-.6.2-1.4.3-4.2-1.3-2.7-1.6-4.4-4.3-4.5-4.5-.1-.2-.9-1.6-.9-3 0-1.4.9-2.1 1.2-2.4.3-.3.7-.4 1-.3.2.1.7.1 1 .1.3 0 .6-.1.9.1.3.2 1.1.8 1.2.9.1.1.2.3.1.6-.1.3-.1.7 0 1 .1.3.5.8.8 1 .3.2.6.4.9.6.3.2.5.2.8.1.3-.1 1.1-.4 1.9-.7.8-.3 1.5-.4 1.7-.3.3.1.8.6 1.1 1.3.3.7.3 1.4.1 1.9z" />
//                   </svg>
//                   <span>WhatsApp Chat</span>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

export default function FAQPage() {
  const t = useTranslations("FAQ");
  const locale = useLocale();
  const isRtl = locale === "ar";

  // next-intl pattern to handle arrays in JSON
  const faqsKeys = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24,
  ];

  return (
    <div
      className="min-h-screen bg-white flex flex-col"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <header className="py-8 border-b">
        <div className="max-w-7xl mx-auto text-center px-4">
          <span className="text-red-500 font-semibold uppercase tracking-widest text-xs">
            {t("badge")}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-2">
            {t("title")}
          </h1>
          <p className="text-gray-500 mb-6 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 md:px-0 py-8">
        <div className="space-y-3">
          {faqsKeys.map((key) => (
            <details key={key} className="border rounded-lg bg-[#faf9fd] group">
              <summary className="px-4 py-4 cursor-pointer font-medium select-none outline-none focus:ring-2 focus:ring-[#A446FF] flex justify-between items-center list-none">
                <span>{t(`items.${key}.q`)}</span>
                <span
                  className={`transition-transform duration-200 text-gray-400 ${isRtl ? "rotate-180" : ""}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>
              <div className="px-4 pb-4 pt-2 text-gray-600 text-sm leading-relaxed border-t border-gray-100/50">
                {t(`items.${key}.a`)}
              </div>
            </details>
          ))}
        </div>
      </main>

      <footer className="w-full py-16 mt-12 flex items-center justify-center">
        <div className="max-w-7xl w-full px-6">
          <div className="bg-gradient-to-r from-[#FDE7D7] via-[#F6F0FF] to-[#E9DAFF] rounded-2xl p-8 md:p-12 shadow-sm">
            <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-white/60 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 text-[#6b21a8]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 13a9 9 0 1118 0v3a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a4 4 0 00-8 0v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">{t("cta.title")}</h3>
              <p className="text-gray-600 mb-6">{t("cta.desc")}</p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-[#A446FF] hover:bg-[#8e36d1] text-white font-semibold rounded-full px-8 py-3 transition-colors shadow min-w-[160px]"
                >
                  {t("cta.contact")}
                </Link>
                <a
                  href="https://wa.me/213555123456"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#A446FF] text-[#6b21a8] font-semibold rounded-full px-8 py-3 transition-colors bg-white min-w-[160px]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12.79A9 9 0 1111.21 3 9 9 0 0121 12.79z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.5 15.5c-.3.8-1.6 1.6-2.1 1.7-.6.2-1.4.3-4.2-1.3-2.7-1.6-4.4-4.3-4.5-4.5-.1-.2-.9-1.6-.9-3 0-1.4.9-2.1 1.2-2.4.3-.3.7-.4 1-.3.2.1.7.1 1 .1.3 0 .6-.1.9.1.3.2 1.1.8 1.2.9.1.1.2.3.1.6-.1.3-.1.7 0 1 .1.3.5.8.8 1 .3.2.6.4.9.6.3.2.5.2.8.1.3-.1 1.1-.4 1.9-.7.8-.3 1.5-.4 1.7-.3.3.1.8.6 1.1 1.3.3.7.3 1.4.1 1.9z"
                    />
                  </svg>
                  <span>{t("cta.whatsapp")}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
