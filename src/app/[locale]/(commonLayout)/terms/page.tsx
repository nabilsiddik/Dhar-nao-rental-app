// import React from "react";

// export default function TermsPage() {
//   return (
//     <div className="min-h-screen bg-white">
//       <div className=" mx-auto px-6 py-12">
//         <div className="text-center mb-8">
//           <span className="text-red-500 font-semibold uppercase tracking-widest text-xs">
//             Terms of Service
//           </span>
//           <h1 className="text-3xl md:text-4xl font-bold mt-3 mb-1">
//             Terms of Service
//           </h1>
//           <p className="text-sm text-gray-500">
//             Last updated: January 1, 2025 • Effective: January 1, 2025
//           </p>
//         </div>

//         <p className="text-gray-600 mb-6 max-w-7xl mx-auto">
//           By accessing or using RentHub, you agree to be bound by the following
//           terms and conditions. Please read them carefully before making any
//           bookings or using any features of the platform.
//         </p>

//         <ol className="space-y-6 list-decimal list-inside text-gray-700 max-w-7xl mx-auto">
//           <li>
//             <h3 className="font-semibold inline text-black">
//               Acceptance of Terms
//             </h3>
//             <p className="text-sm text-gray-600 mt-2">
//               By accessing RentHub, you confirm that you are at least 18 years
//               of age and agree to these Terms. If you do not agree, you must not
//               use the platform.
//             </p>
//           </li>

//           <li>
//             <h3 className="font-semibold inline text-black">
//               Use of the Platform
//             </h3>
//             <p className="text-sm text-gray-600 mt-2">
//               RentHub grants you a limited, non-exclusive, non-transferable
//               license to access the platform for personal, non-commercial use.
//               You may not scrape, copy, or reproduce content without written
//               permission.
//             </p>
//           </li>

//           <li>
//             <h3 className="font-semibold inline text-black">User Accounts</h3>
//             <p className="text-sm text-gray-600 mt-2">
//               You are responsible for maintaining the confidentiality of your
//               account credentials. You agree to notify us immediately of any
//               unauthorized use of your account.
//             </p>
//           </li>

//           <li>
//             <h3 className="font-semibold inline text-black">
//               Bookings &amp; Payments
//             </h3>
//             <p className="text-sm text-gray-600 mt-2">
//               All bookings are subject to availability confirmation. Payment is
//               processed securely through Stripe. RentHub applies a service fee
//               on each transaction, the rate of which is displayed at checkout.
//             </p>
//             <div className="mt-3 p-4 bg-yellow-50 border border-yellow-100 rounded-lg text-sm text-yellow-800">
//               Bookings are only confirmed once payment is successfully
//               processed. Pending bookings do not guarantee availability.
//             </div>
//           </li>

//           <li>
//             <h3 className="font-semibold inline text-black">
//               Cancellation Policy
//             </h3>
//             <p className="text-sm text-gray-600 mt-2">
//               Cancellation terms vary per listing. The applicable policy is
//               displayed on each listing page and at the booking confirmation
//               step. RentHub&apos;s service fee is non-refundable unless
//               otherwise stated.
//             </p>
//           </li>

//           <li>
//             <h3 className="font-semibold inline text-black">
//               Host Responsibilities
//             </h3>
//             <p className="text-sm text-gray-600 mt-2">
//               Hosts (listing managers) are responsible for the accuracy of their
//               listings, the condition of the property or vehicle, and compliance
//               with all local laws and regulations.
//             </p>
//           </li>

//           <li>
//             <h3 className="font-semibold inline text-black">
//               Prohibited Conduct
//             </h3>
//             <div className="text-sm text-gray-600 mt-2">
//               <p className="mb-3">Users must not:</p>
//               <ul className="pl-4 space-y-2">
//                 <li className="flex items-start">
//                   <span
//                     className="w-2 h-2 bg-red-500 inline-block mr-3 mt-2 rounded-sm"
//                     aria-hidden="true"
//                   />
//                   <span>Submit false or misleading information</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span
//                     className="w-2 h-2 bg-red-500 inline-block mr-3 mt-2 rounded-sm"
//                     aria-hidden="true"
//                   />
//                   <span>Use the platform for any unlawful purpose</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span
//                     className="w-2 h-2 bg-red-500 inline-block mr-3 mt-2 rounded-sm"
//                     aria-hidden="true"
//                   />
//                   <span>
//                     Attempt to circumvent the platform to book directly and
//                     avoid fees
//                   </span>
//                 </li>
//                 <li className="flex items-start">
//                   <span
//                     className="w-2 h-2 bg-red-500 inline-block mr-3 mt-2 rounded-sm"
//                     aria-hidden="true"
//                   />
//                   <span>Harass or threaten other users or hosts</span>
//                 </li>
//               </ul>
//             </div>
//           </li>
//           <li>
//             <h3 className="font-semibold inline text-black">
//               Intellectual Property
//             </h3>
//             <p className="text-sm text-gray-600 mt-2">
//               All content on RentHub, including logos, copy, and design, is the
//               property of RentHub. You may not reproduce or distribute any
//               content without written consent.
//             </p>
//           </li>

//           <li>
//             <h3 className="font-semibold inline text-black">
//               Limitation of Liability
//             </h3>
//             <p className="text-sm text-gray-600 mt-2">
//               RentHub is a marketplace platform and is not liable for the
//               actions of hosts, the condition of listings, or any damages
//               arising from bookings made through the platform.
//             </p>
//           </li>

//           <li>
//             <h3 className="font-semibold inline text-black">
//               Privacy &amp; Data
//             </h3>
//             <p className="text-sm text-gray-600 mt-2">
//               Your use of the platform is also governed by our Privacy Policy.
//               By using RentHub, you consent to the collection and use of your
//               data as described therein.
//             </p>
//           </li>

//           <li>
//             <h3 className="font-semibold inline text-black">
//               Changes to Terms
//             </h3>
//             <p className="text-sm text-gray-600 mt-2">
//               RentHub reserves the right to update these Terms at any time.
//               Continued use of the platform after changes constitutes your
//               acceptance of the updated Terms.
//             </p>
//           </li>

//           <li>
//             <h3 className="font-semibold inline text-black">
//               Contact &amp; Disputes
//             </h3>
//             <p className="text-sm text-gray-600 mt-2">
//               For any questions regarding these Terms, please contact us at
//               legal@renthub.com. Disputes will be resolved under the laws of
//               Algeria.
//             </p>
//           </li>
//         </ol>
//       </div>
//     </div>
//   );
// }

"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";

export default function TermsPage() {
  const t = useTranslations("Terms");
  const locale = useLocale();
  const isRtl = locale === "ar";

  // Helper function to render specific red-square bullet lists
  const renderRedBulletList = (listKey: string) => {
    const list = t.raw(listKey) as string[];
    return (
      <ul className="ps-4 space-y-2 mt-2">
        {list.map((item, idx) => (
          <li key={idx} className="flex items-start">
            <span
              className={`w-2 h-2 bg-red-500 inline-block mt-2 rounded-sm ${
                isRtl ? "ml-3" : "mr-3"
              }`}
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="min-h-screen bg-white" dir={isRtl ? "rtl" : "ltr"}>
      <div className="mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-8">
          <span className="text-red-500 font-semibold uppercase tracking-widest text-xs">
            {t("badge")}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mt-3 mb-1">
            {t("title")}
          </h1>
          <p className="text-sm text-gray-500">{t("updated")}</p>
        </div>

        {/* Intro Paragraph */}
        <p className="text-gray-600 mb-6 max-w-7xl mx-auto">{t("intro")}</p>

        {/* Terms List */}
        <ol className="space-y-6 list-decimal list-inside text-gray-700 max-w-7xl mx-auto">
          {/* Section 1 - 3 */}
          {[1, 2, 3].map((num) => (
            <li key={num}>
              <h3 className="font-semibold inline text-black">
                {t(`sections.s${num}.title`)}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                {t(`sections.s${num}.content`)}
              </p>
            </li>
          ))}

          {/* Section 4 (Bookings with Note) */}
          <li>
            <h3 className="font-semibold inline text-black">
              {t("sections.s4.title")}
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              {t("sections.s4.content")}
            </p>
            <div className="mt-3 p-4 bg-yellow-50 border border-yellow-100 rounded-lg text-sm text-yellow-800">
              {t("sections.s4.note")}
            </div>
          </li>

          {/* Section 5 - 6 */}
          {[5, 6].map((num) => (
            <li key={num}>
              <h3 className="font-semibold inline text-black">
                {t(`sections.s${num}.title`)}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                {t(`sections.s${num}.content`)}
              </p>
            </li>
          ))}

          {/* Section 7 (Prohibited Conduct with List) */}
          <li>
            <h3 className="font-semibold inline text-black">
              {t("sections.s7.title")}
            </h3>
            <div className="text-sm text-gray-600 mt-2">
              <p className="mb-3">{t("sections.s7.content")}</p>
              {renderRedBulletList("sections.s7.list")}
            </div>
          </li>

          {/* Section 8 - 12 */}
          {[8, 9, 10, 11, 12].map((num) => (
            <li key={num}>
              <h3 className="font-semibold inline text-black">
                {t(`sections.s${num}.title`)}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                {t(`sections.s${num}.content`)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
