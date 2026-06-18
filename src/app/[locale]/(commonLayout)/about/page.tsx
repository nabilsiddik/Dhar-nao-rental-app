"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("About");
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <div className="bg-[#f8f9fb] min-h-full w-full" dir={isRtl ? "rtl" : "ltr"}>
      {/* Hero Section with full background image */}
      <section
        className="w-full min-h-[600px] relative bg-gray-100"
        style={{
          backgroundImage: "url(/about-hero.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/10" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col items-start justify-center h-full relative">
          <h2 className="text-white text-xs font-semibold uppercase mb-2 tracking-widest">
            {t("hero.badge")}
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-white drop-shadow max-w-2xl">
            {t("hero.title")}
          </h1>
          <p className="text-lg text-gray-100 mb-6 max-w-xl drop-shadow">
            {t("hero.description")}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 justify-between gap-8">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-[#A446FF]">500+</span>
            <span className="text-gray-500 text-sm mt-1">
              {t("stats.listings")}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-[#A446FF]">12,000+</span>
            <span className="text-gray-500 text-sm mt-1">
              {t("stats.guests")}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-[#A446FF]">98%</span>
            <span className="text-gray-500 text-sm mt-1">
              {t("stats.satisfaction")}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-[#A446FF]">24/7</span>
            <span className="text-gray-500 text-sm mt-1">
              {t("stats.support")}
            </span>
          </div>
        </div>
      </section>

      {/* What we stand for */}
      <section className="w-full py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-center text-2xl font-semibold mb-10">
            {t("values.title")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white px-12 py-8 rounded-xl shadow-sm flex flex-col items-center text-center border border-gray-100">
              <span className="text-[#A446FF] text-3xl mb-3">🔍</span>
              <h4 className="font-semibold mb-2">
                {t("values.verified.title")}
              </h4>
              <p className="text-gray-500 text-sm">
                {t("values.verified.desc")}
              </p>
            </div>
            <div className="bg-white px-12 py-8 rounded-xl shadow-sm flex flex-col items-center text-center border border-gray-100">
              <span className="text-[#A446FF] text-3xl mb-3">⏱️</span>
              <h4 className="font-semibold mb-2">
                {t("values.booking.title")}
              </h4>
              <p className="text-gray-500 text-sm">
                {t("values.booking.desc")}
              </p>
            </div>
            <div className="bg-white px-12 py-8 rounded-xl shadow-sm flex flex-col items-center text-center border border-gray-100">
              <span className="text-[#A446FF] text-3xl mb-3">🤝</span>
              <h4 className="font-semibold mb-2">
                {t("values.support.title")}
              </h4>
              <p className="text-gray-500 text-sm">
                {t("values.support.desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Story */}
      <section className="w-full py-12">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center min-h-[500px]">
          <div className={isRtl ? "text-right" : "text-left"}>
            <h4 className="text-[#A446FF] text-xs font-semibold uppercase mb-2 tracking-widest">
              {t("history.badge")}
            </h4>
            <h2 className="text-2xl font-bold mb-3">{t("history.title")}</h2>
            <p className="text-gray-500 mb-4">{t("history.para1")}</p>
            <p className="text-gray-500 mb-4">{t("history.para2")}</p>
            <p className="text-gray-500">{t("history.para3")}</p>
          </div>
          <div className="flex justify-center">
            <Image
              src="/about-team.png"
              alt="RentHub Team"
              width={540}
              height={360}
              className="rounded-xl object-cover w-full"
            />
          </div>
        </div>
      </section>

      {/* Call to Action with background image */}
      <section
        className="w-full py-16 border-t relative min-h-[600px] flex items-center justify-center"
        style={{
          backgroundImage: "url(/cta-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
        <div className="relative max-w-3xl mx-auto flex flex-col items-center z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-white drop-shadow">
            {t("cta.title")}
          </h2>
          <p className="text-gray-100 mb-8 text-center drop-shadow">
            {t("cta.desc")}
          </p>
          <Link
            href="/"
            className="bg-white hover:bg-[#8e36d1] hover:text-white text-black font-semibold rounded-full px-8 py-3 transition-colors"
          >
            {t("cta.button")}
          </Link>
        </div>
      </section>
    </div>
  );
}
