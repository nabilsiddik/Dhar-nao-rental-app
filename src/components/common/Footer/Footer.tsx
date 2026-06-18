// import { FacebookIcon, Github, Linkedin, Mail } from "lucide-react";
// import Link from "next/link";
// import React from "react";
// import { LuHouse } from "react-icons/lu";
// import { SlLocationPin } from "react-icons/sl";
// import { IoCallOutline } from "react-icons/io5";
// import { CiMail } from "react-icons/ci";
// import { CiFacebook } from "react-icons/ci";
// import { FaInstagram } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";
// import { CiYoutube } from "react-icons/ci";

// const footerLinks = {
//   product: [
//     { name: "Features", href: "/features" },
//     { name: "Pricing", href: "/pricing" },
//     { name: "Documentation", href: "/docs" },
//     { name: "API", href: "/api" },
//   ],
//   company: [
//     { name: "About Us", href: "/about" },
//     { name: "Contact Us", href: "/contact" },
//     { name: "Terms of Service", href: "/terms" },
//     { name: "Privacy Policy", href: "/privacy" },
//     { name: "FAQ", href: "/faq" },
//   ],
//   legal: [
//     { name: "List Your Apartment", href: "/privacy" },
//     { name: "List Your Car", href: "/terms" },
//   ],
// };

// const socialLinks = [
//   { name: "Facebook", href: "#", icon: <CiFacebook /> },
//   { name: "Instagram", href: "#", icon: <FaInstagram /> },
//   { name: "Twitter", href: "#", icon: <FaXTwitter /> },
//   { name: "YouTube", href: "#", icon: <CiYoutube /> },
// ];

// export const Footer = () => {
//   return (
//     // Footer Component
//     <footer className="border-t bg-background w-full mx-auto">
//       {/* Main Div */}
//       <div className="max-w-7xl mx-auto py-12 md-py-16 px-6">
//         {/* Logo and description */}
//         <div className="grid grid-cols-1 md:grid-cols-2 space-around gap-8">
//           <div className="col-span-3 md:col-span-1">
//             <Link href="/" className="text-2xl  flex items-center gap-2">
//               <p className="bg-[#A446FF] text-white p-2 rounded-lg">
//                 {" "}
//                 <LuHouse />
//               </p>
//               <span
//                 className="flex items-center"
//                 style={{ fontFamily: "Instrument Sans, sans-serif" }}
//               >
//                 <span className="font-bold">Rent</span>Hub
//               </span>
//             </Link>
//             <p className="mt-4 text-sm text-muted-foreground max-w-sm">
//               Your trusted platform for car and apartment rentals across
//               Algeria. We connect travelers with quality vehicles and
//               comfortable accommodations for memorable experiences.{" "}
//             </p>
//             {/* Social Links */}
//             <div>
//               <div className="flex items-center gap-4 mt-4">
//                 <SlLocationPin />
//                 <p className="text-sm text-muted-foreground">
//                   Algiers, Algeria
//                 </p>
//               </div>
//               <div className="flex items-center gap-4 mt-4">
//                 <IoCallOutline />
//                 <p className="text-sm text-muted-foreground">
//                   +213 555 123 456
//                 </p>
//               </div>
//               <div className="flex items-center gap-4 mt-4">
//                 <CiMail />
//                 <p className="text-sm text-muted-foreground">
//                   support@renthub.com
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="col-span-3 md:col-span-1 grid grid-cols-1 sm:grid-cols-2 gap-8">
//             {/* Company Links */}
//             <div>
//               <h3 className="font-semibold mb-4">Company</h3>
//               <ul className="space-y-3">
//                 {footerLinks.company.map((companyLink) => (
//                   <li key={companyLink.name}>
//                     <Link
//                       href={companyLink.href}
//                       className="text-sm text-muted-foreground hover:text-primary transition-colors"
//                     >
//                       {companyLink.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             {/* Legal Links */}
//             <div>
//               <h3 className="font-semibold mb-4">Become a Host</h3>
//               <ul className="space-y-3">
//                 {footerLinks.legal.map((legalLink) => (
//                   <li key={legalLink.name}>
//                     <Link
//                       href={legalLink.href}
//                       className="text-sm text-muted-foreground hover:text-primary transition-colors"
//                     >
//                       {legalLink.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* copyright  */}
//         <div className="mt-12 pt-4 border-t flex flex-col md:flex-row items-center justify-between">
//           <p className="text-sm ">
//             © {new Date().getFullYear()} RentHub. All rights reserved.
//           </p>
//           <div className="flex items-center gap-4 mt-4">
//             {socialLinks.map((social, indx) => (
//               <Link key={indx} href={social.href}>
//                 {social.icon}
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

"use client";
import React from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { LuHouse } from "react-icons/lu";
import { SlLocationPin } from "react-icons/sl";
import { IoCallOutline } from "react-icons/io5";
import { CiMail, CiFacebook, CiYoutube } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const Footer = () => {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const companyLinks = [
    { name: t("links.about"), href: "/about" },
    { name: t("links.contact"), href: "/contact" },
    { name: t("links.terms"), href: "/terms" },
    { name: t("links.privacy"), href: "/privacy" },
    { name: t("links.faq"), href: "/faq" },
  ];

  const hostLinks = [
    { name: t("links.listApartment"), href: "/" },
    { name: t("links.listCar"), href: "/" },
  ];

  const socialLinks = [
    { name: "Facebook", href: "#", icon: <CiFacebook size={20} /> },
    { name: "Instagram", href: "#", icon: <FaInstagram size={18} /> },
    { name: "Twitter", href: "#", icon: <FaXTwitter size={18} /> },
    { name: "YouTube", href: "#", icon: <CiYoutube size={20} /> },
  ];

  return (
    <footer
      className="border-t bg-background w-full mx-auto"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto py-12 md:py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Logo and description */}
          <div className="flex flex-col items-start">
            <Link href="/" className="text-2xl flex items-center gap-2">
              <div className="bg-[#A446FF] text-white p-2 rounded-lg">
                <LuHouse />
              </div>

              {isRtl ? (
                <span className="flex items-center font-instrument">
                  <span className="font-bold">Hub</span>Rent
                </span>
              ) : (
                <span className="flex items-center font-instrument">
                  <span className="font-bold">Rent</span>Hub
                </span>
              )}
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
              {t("description")}
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-4">
                <SlLocationPin className="text-[#A446FF]" />
                <p className="text-sm text-muted-foreground">{t("location")}</p>
              </div>
              <div className="flex items-center gap-4">
                <IoCallOutline className="text-[#A446FF]" />
                <p className="text-sm text-muted-foreground" dir="ltr">
                  +213 555 123 456
                </p>
              </div>
              <div className="flex items-center gap-4">
                <CiMail className="text-[#A446FF]" />
                <p className="text-sm text-muted-foreground">
                  support@renthub.com
                </p>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="grid grid-cols-2 gap-8">
            {/* Company Links */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4">{t("company")}</h3>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-[#A446FF] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Become a Host Links */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4">
                {t("becomeHost")}
              </h3>
              <ul className="space-y-3">
                {hostLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-[#A446FF] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} RentHub. {t("copyright")}
          </p>

          <div className="flex items-center gap-5">
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#A446FF] hover:text-white transition-all text-gray-600"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
