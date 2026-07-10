// "use client";

// import React, { useState } from "react";
// import { ArrowLeft, Mail, Phone, Clock, MessageCircle } from "lucide-react";
// import { toast } from "sonner";
// import FormInput from "@/components/booking/FormInput";
// import Link from "next/link";
// import { useSendInquiryMutation } from "@/redux/features/inquiry/inquiryApi";

// const ContactClient = () => {
//   const [sendInquiry, { isLoading }] = useSendInquiryMutation();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >,
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Basic Validation
//     if (!formData.name || !formData.email || !formData.message) {
//       return toast.error("Please fill in all required fields.");
//     }

//     const toastId = toast.loading("Sending your message to RentHub...");

//     try {
//       // Call the RTK Mutation and unwrap it
//       const res = await sendInquiry(formData).unwrap();

//       if (res?.success) {
//         toast.success(res?.message || "Message sent successfully!", { id: toastId });
//         // Reset form
//         setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });
//       }
//     } catch (error: any) {
//       // Handle Backend Errors
//       const errorMsg = error?.data?.message || "Failed to send message. Please try again.";
//       toast.error(errorMsg, { id: toastId });
//       console.error("Inquiry Error:", error);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-12">
//       {/* Back Button */}
//       <button
//         onClick={() => window.history.back()}
//         className="mb-6 hover:bg-gray-100 p-2 rounded-full transition"
//       >
//         <ArrowLeft size={28} />
//       </button>

//       {/* Header */}
//       <div className="text-center mb-16 space-y-4">
//         <h1 className="text-4xl font-bold text-gray-900">Get in Touch</h1>
//         <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
//           Have a question or need assistance? We're here to help. Send us a
//           message and we'll respond as soon as possible.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
//         {/* LEFT: FORM */}
//         <div className="lg:col-span-8 bg-[#F3F4F6]/50 border border-gray-200 rounded-[2.5rem] p-10">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <FormInput
//               label="Name"
//               name="name"
//               placeholder="Your full name"
//               required
//               value={formData.name}
//               onChange={handleInputChange}
//             />
//             <FormInput
//               label="Email"
//               name="email"
//               type="email"
//               placeholder="your@email.com"
//               required
//               value={formData.email}
//               onChange={handleInputChange}
//             />

//             {/* Custom Select for Subject */}
//             <div className="flex flex-col gap-2 w-full">
//               <label className="text-sm font-bold text-gray-900">
//                 Subject *
//               </label>
//               <select
//                 name="subject"
//                 value={formData.subject}
//                 onChange={handleInputChange}
//                 className="w-full bg-[#E5E7EB]/50 border border-transparent focus:border-primary px-4 py-4 rounded-xl outline-none transition-all text-gray-700 appearance-none"
//               >
//                 <option value="">Select a subject...</option>
//                 <option value="Booking Issue">Booking Issue</option>
//                 <option value="Payment Problem">Payment Problem</option>
//                 <option value="General Inquiry">General Inquiry</option>
//                 <option value="Partnership">Partnership</option>
//               </select>
//             </div>

//             <FormInput
//               label="Message"
//               name="message"
//               placeholder="Tell us how we can help..."
//               isTextArea
//               required
//               value={formData.message}
//               onChange={handleInputChange}
//             />

//             <button
//               type="submit"
//               className="w-full bg-primary text-white py-5 rounded-3xl font-bold text-base hover:opacity-90 transition-opacity cursor-pointer"
//             >
//               Send Message
//             </button>
//           </form>
//         </div>

//         {/* RIGHT: CONTACT INFO & QUICK RESPONSE */}
//         <div className="lg:col-span-4 space-y-6">
//           {/* Info Card */}
//           <div className="bg-[#F3F4F6]/50 border border-gray-200 rounded-[2.5rem] p-10 space-y-10">
//             {/* Email */}
//             <div className="flex items-start gap-4">
//               <div className="p-3 bg-red-50 text-red-500 rounded-xl">
//                 <Mail size={24} />
//               </div>
//               <div>
//                 <h4 className="font-bold text-gray-900 text-lg">Email</h4>
//                 <p className="text-gray-500 text-sm font-medium">
//                   support@renthub.com
//                 </p>
//               </div>
//             </div>

//             {/* WhatsApp */}
//             <div className="flex items-start gap-4">
//               <div className="p-3 bg-green-50 text-green-500 rounded-xl">
//                 <MessageCircle size={24} />
//               </div>
//               <div className="flex-1">
//                 <h4 className="font-bold text-gray-900 text-lg">WhatsApp</h4>
//                 <p className="text-gray-500 text-sm font-medium mb-4">
//                   +213 555 123 456
//                 </p>
//                 <Link target="_blank" href={"https://wa.me/1957282230"}>
//                   <button className="bg-[#25D366] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:opacity-90 transition-opacity cursor-pointer">
//                     Chat Now
//                   </button>
//                 </Link>
//               </div>
//             </div>

//             {/* Business Hours */}
//             <div className="flex items-start gap-4">
//               <div className="p-3 bg-red-50 text-red-500 rounded-xl">
//                 <Clock size={24} />
//               </div>
//               <div>
//                 <h4 className="font-bold text-gray-900 text-lg">
//                   Business Hours
//                 </h4>
//                 <p className="text-gray-500 text-sm font-medium mt-1">
//                   Monday - Friday
//                 </p>
//                 <p className="text-gray-500 text-sm font-medium">
//                   9:00 AM - 6:00 PM
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Quick Response Card */}
//           <div className="bg-[#F3F4F6]/50 border border-gray-200 rounded-[2.5rem] p-10">
//             <h4 className="font-bold text-gray-900 text-lg mb-4">
//               Quick Response
//             </h4>
//             <p className="text-gray-500 text-sm leading-relaxed font-medium">
//               We typically respond to all inquiries within 24 hours during
//               business days.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactClient;

"use client";

import React, { useState } from "react";
import { ArrowLeft, Mail, Phone, Clock, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import FormInput from "@/components/booking/FormInput";
import Link from "next/link";
import { useSendInquiryMutation } from "@/redux/features/inquiry/inquiryApi";
import { useTranslations, useLocale } from "next-intl";

const ContactClient = () => {
  const t = useTranslations("Contact");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const [sendInquiry, { isLoading }] = useSendInquiryMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.name || !formData.email || !formData.message) {
      return toast.error(t("toasts.required"));
    }

    const toastId = toast.loading(t("toasts.sending"));

    try {
      const res = await sendInquiry(formData).unwrap();

      if (res?.success) {
        toast.success(res?.message || t("toasts.success"), { id: toastId });
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (error: any) {
      const errorMsg = error?.data?.message || t("toasts.error");
      toast.error(errorMsg, { id: toastId });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12" dir={isRtl ? "rtl" : "ltr"}>
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className={`mb-6 hover:bg-gray-100 p-2 rounded-full transition ${isRtl ? "rotate-180" : ""}`}
      >
        <ArrowLeft size={28} />
      </button>

      {/* Header */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">{t("title")}</h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
          {t("description")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: FORM */}
        <div className="lg:col-span-8 bg-[#F3F4F6]/50 border border-gray-200 rounded-[2.5rem] p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              label={t("form.name")}
              name="name"
              placeholder={t("form.namePlaceholder")}
              required
              value={formData.name}
              onChange={handleInputChange}
            />
            <FormInput
              label={t("form.email")}
              name="email"
              type="email"
              placeholder={t("form.emailPlaceholder")}
              required
              value={formData.email}
              onChange={handleInputChange}
            />

            {/* Custom Select for Subject */}
            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm font-bold text-gray-900">
                {t("form.subject")} *
              </label>
              <div className="relative">
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full bg-[#E5E7EB]/50 border border-transparent focus:border-primary px-4 py-4 rounded-xl outline-none transition-all text-gray-700 appearance-none"
                >
                  <option value="">{t("form.subjectPlaceholder")}</option>
                  <option value="Booking Issue">
                    {t("form.subjects.booking")}
                  </option>
                  <option value="Payment Problem">
                    {t("form.subjects.payment")}
                  </option>
                  <option value="General Inquiry">
                    {t("form.subjects.general")}
                  </option>
                  <option value="Partnership">
                    {t("form.subjects.partnership")}
                  </option>
                </select>
                {/* Custom arrow logic for appearance-none */}
                <div
                  className={`absolute top-1/2 -translate-y-1/2 pointer-events-none ${isRtl ? "left-4" : "right-4"}`}
                >
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L6 6L11 1"
                      stroke="#6B7280"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <FormInput
              label={t("form.message")}
              name="message"
              placeholder={t("form.messagePlaceholder")}
              isTextArea
              required
              value={formData.message}
              onChange={handleInputChange}
            />

            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-primary text-white py-5 rounded-3xl font-bold text-base hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
            >
              {t("form.submit")}
            </button>
          </form>
        </div>

        {/* RIGHT: CONTACT INFO & QUICK RESPONSE */}
        <div className="lg:col-span-4 space-y-6">
          {/* Info Card */}
          <div className="bg-[#F3F4F6]/50 border border-gray-200 rounded-[2.5rem] p-10 space-y-10">
            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-50 text-red-500 rounded-xl">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">
                  {t("info.email")}
                </h4>
                <p className="text-gray-500 text-sm font-medium">
                  support@renthub.com
                </p>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-50 text-green-500 rounded-xl">
                <MessageCircle size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-lg">
                  {t("info.whatsapp")}
                </h4>
                <p className="text-gray-500 text-sm font-medium mb-4" dir="ltr">
                  +8801957282230
                </p>
                <Link target="_blank" href={"https://wa.me/+8801957282230"}>
                  <button className="bg-[#25D366] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:opacity-90 transition-opacity cursor-pointer">
                    {t("info.chatNow")}
                  </button>
                </Link>
              </div>
            </div>

            {/* Business Hours */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-50 text-red-500 rounded-xl">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">
                  {t("info.hours")}
                </h4>
                <p className="text-gray-500 text-sm font-medium mt-1">
                  {t("info.days")}
                </p>
                <p className="text-gray-500 text-sm font-medium">
                  {t("info.time")}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Response Card */}
          <div className="bg-[#F3F4F6]/50 border border-gray-200 rounded-[2.5rem] p-10">
            <h4 className="font-bold text-gray-900 text-lg mb-4">
              {t("info.quickTitle")}
            </h4>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              {t("info.quickDesc")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactClient;
