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
      <div className="max-w-7xl mx-auto px-10 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Logo and description */}
          <div className="flex flex-col items-start">
            <Link href="/" className="text-2xl flex items-center gap-2">
              <div className="bg-primary text-white p-2 rounded-lg">
                <LuHouse />
              </div>

              {isRtl ? (
                <span className="flex items-center font-instrument">
                  <span className="font-bold">Hub</span>Rent
                </span>
              ) : (
                <div className="flex flex-col -space-y-1">
                  <span className="text-4xl font-black tracking-tighter text-gray-900">
                    Dhar<span className="text-primary">Nao</span>
                  </span>
                  <span className="text-[14px] mt-1 font-bold tracking-[0.2em] text-gray-400 uppercase">Rental Platform</span>
                </div>
              )}
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
              {t("description")}
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-4">
                <SlLocationPin className="text-primary" />
                <p className="text-sm text-muted-foreground">{t("location")}</p>
              </div>
              <div className="flex items-center gap-4">
                <IoCallOutline className="text-primary" />
                <p className="text-sm text-muted-foreground" dir="ltr">
                  +8801968111111
                </p>
              </div>
              <div className="flex items-center gap-4">
                <CiMail className="text-primary" />
                <p className="text-sm text-muted-foreground">
                  support@dharnao.com
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
            © {new Date().getFullYear()} Dhar Nao. {t("copyright")}
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
