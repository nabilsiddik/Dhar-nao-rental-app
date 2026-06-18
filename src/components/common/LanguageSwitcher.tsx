// "use client";

// import { Globe } from "lucide-react";
// import { useLocale } from "next-intl";
// import { usePathname, useRouter } from "@/i18n/navigation";

// const languages = [
//   {
//     value: "en",
//     label: "English",
//   },
//   {
//     value: "fr",
//     label: "Français",
//   },
//   {
//     value: "ar",
//     label: "العربية",
//   },
// ];

// export default function LanguageSwitcher() {
//   const locale = useLocale();

//   const pathname = usePathname();

//   const router = useRouter();

//   const handleChange = (newLocale: string) => {
//     router.replace(pathname, {
//       locale: newLocale,
//     });
//   };

//   return (
//     <div className="flex items-center gap-2">
//       <Globe className="h-4 w-4" />

//       <select
//         value={locale}
//         onChange={(e) => handleChange(e.target.value)}
//         className="border rounded-md px-2 py-1 bg-background"
//       >
//         {languages.map((language) => (
//           <option key={language.value} value={language.value}>
//             {language.label}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

// "use client";

// import { useLocale } from "next-intl";
// import { usePathname, useRouter } from "@/i18n/navigation";

// const locales = ["en", "fr", "ar"];

// export default function LanguageSwitcher() {
//   const locale = useLocale();
//   const router = useRouter();
//   const pathname = usePathname();

//   const handleChange = (nextLocale: string) => {
//     // remove current locale from path
//     const segments = pathname.split("/").filter(Boolean);

//     if (locales.includes(segments[0])) {
//       segments.shift();
//     }

//     const cleanPath = "/" + segments.join("/");

//     router.replace(cleanPath || "/", {
//       locale: nextLocale,
//     });
//   };

//   return (
//     <select value={locale} onChange={(e) => handleChange(e.target.value)}>
//       <option value="en">English</option>
//       <option value="fr">French</option>
//       <option value="ar">Arabic</option>
//     </select>
//   );
// }

"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
const locales = ["en", "fr", "ar"];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // const handleChange = (nextLocale: string) => {
  //   // split path
  //   const segments = pathname.split("/").filter(Boolean);

  //   // remove existing locale if present
  //   if (locales.includes(segments[0])) {
  //     segments.shift();
  //   }

  //   // rebuild clean path (WITHOUT locale)
  //   const cleanPath = "/" + segments.join("/");

  //   router.replace(cleanPath || "/", {
  //     locale: nextLocale,
  //   });
  // };

  const handleChange = (nextLocale: string) => {
    // Convert searchParams to a plain object
    const currentParams = Object.fromEntries(searchParams.entries());

    // router.replace can take an object with pathname and query
    router.replace(
      {
        pathname,
        query: currentParams, // This preserves the listingId
      },
      { locale: nextLocale },
    );
  };

  return (
    <select value={locale} onChange={(e) => handleChange(e.target.value)}>
      <option value="en">English</option>
      <option value="fr">French</option>
      <option value="ar">Arabic</option>
    </select>
  );
}
