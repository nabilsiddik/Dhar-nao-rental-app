import Loading from "@/components/Others/Loader/Loading";
import {
  bitcount,
  gravitas,
  lobster,
  openSans,
  playfair,
  roboto,
  rowdies,
} from "@/fonts/Fonts";
import ReduxProvider from "@/redux/Provider";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Toaster } from "sonner";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: {
    default: "Dhar Nao | Premium Car & Apartment Rentals",
    template: "%s | RentHub",
  },
  description:
    "Find the perfect car or apartment for your next adventure in Algeria.",
  keywords: ["Rental", "Car Hire", "Apartment Rental", "RentHub"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://renthub.com",
    siteName: "RentHub",
    images: [
      {
        url: "/home.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // Next.js 15 uses Promise for params
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${playfair.variable} ${bitcount.variable} ${lobster.variable} ${roboto.variable} ${gravitas.variable} ${rowdies.variable} antialiased`}
      >
        <Suspense fallback={<Loading />}>
          <ReduxProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
              {children}
            </NextIntlClientProvider>
            <Toaster richColors position="top-right" />
          </ReduxProvider>
        </Suspense>
      </body>
    </html>
  );
}
