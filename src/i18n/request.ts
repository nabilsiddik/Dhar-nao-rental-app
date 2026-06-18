// import { getRequestConfig } from "next-intl/server";

// export default getRequestConfig(async () => {
//   // Static for now, we'll change this later
//   const locale = "fr";

//   return {
//     locale,
//     messages: (await import(`../../messages/${locale}.json`)).default,
//   };
// });

import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }: any) => {
  const locale = await requestLocale;

  return {
    locale: routing.locales.includes(locale as any)
      ? locale
      : routing.defaultLocale,
    messages: (await import(`../../messages/${locale || "en"}.json`)).default,
  };
});
