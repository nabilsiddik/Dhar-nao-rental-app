// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import { LuHouse } from "react-icons/lu";
// import MyFormWrapper from "@/components/form/MyFormWrapper";
// import MyFormInput from "@/components/form/MyFormInput";
// import MyFormCheckbox from "@/components/form/MyFormCheckbox";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { toast } from "sonner";
// import { useRegisterMutation } from "@/redux/features/auth/authApi";
// import { useDispatch } from "react-redux";
// import { setUser } from "@/redux/features/auth/authSlice";
// import { setAuthToken } from "@/lib/cookies";

// export default function SignUpPage() {
//   const [signUp, { isLoading }] = useRegisterMutation();
//   const dispatch = useDispatch();

//   const handelData = async (data: any) => {
//     console.log("Form Data:", data);
//     const { fullName, email, password, confirmPassword, terms } = data;

//     // Basic validation
//     if (!fullName || !email || !password || !confirmPassword) {
//       toast.error("Please fill in all required fields.");
//       return;
//     }

//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match.");
//       return;
//     }

//     const signUpData = {
//       fullName,
//       email,
//       password,
//       isAggreedToTerms: terms || false,
//     };

//     const toastId = toast.loading("Signing up...");
//     try {
//       const res = await signUp(signUpData).unwrap();
//       const user = res?.data;
//       console.log(user, "my user sign up");
//       if (res?.success) {
//         const token = res?.data?.token;
//         console.log(token, "my token");
//         dispatch(setUser({ user, token }));
//         setAuthToken(token);
//         toast.success("Logged in successfully!", { id: toastId });
//         if (user?.role === "ADMIN") {
//           window.location.href = "/admin/dashboard/overview";
//         } else {
//           window.location.href = "/";
//         }
//       } else {
//         toast.error(res?.message || "Failed to log in.", {
//           id: toastId,
//         });
//       }
//     } catch (error: any) {
//       const errorMsg = error?.data?.message || "Something went wrong";
//       toast.error(errorMsg, { id: toastId });
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#fafbfc]">
//       <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md flex flex-col items-center border border-gray-200">
//         <div className="flex flex-col items-center mb-6">
//           <span className="bg-[#A446FF] rounded-lg p-4 mb-4 flex items-center justify-center">
//             <LuHouse className="text-white w-8 h-8" />
//           </span>
//           <h2 className="text-2xl font-bold mb-1">Create your account</h2>
//           <p className="text-gray-500 text-sm">Join RentHub today</p>
//         </div>
//         <MyFormWrapper onSubmit={handelData} className="w-full space-y-2">
//           <MyFormInput
//             // onValueChange={(value) => {}}
//             name="fullName"
//             label="Full Name *"
//             placeholder="your@email.com"
//             required
//             inputClassName="bg-gray-100"
//           />
//           <MyFormInput
//             name="email"
//             label="Email *"
//             placeholder="your@email.com"
//             type="email"
//             required
//             inputClassName="bg-gray-100"
//           />
//           <MyFormInput
//             name="password"
//             label="Password *"
//             placeholder="create password"
//             type="password"
//             required
//             inputClassName="bg-gray-100"
//           />
//           <MyFormInput
//             name="confirmPassword"
//             label="Confirm Password *"
//             placeholder="re-type password"
//             type="password"
//             required
//             inputClassName="bg-gray-100"
//           />
//           <MyFormCheckbox
//             name="terms"
//             consentText={
//               'I agree to the <a target="_blank" href="http://localhost:3000/terms" class="text-[#A446FF] underline">Terms of Service</a> and <a target="_blank" href="http://localhost:3000/privacy" class="text-[#A446FF] underline">Privacy Policy</a>'
//             }
//             required
//             className="mb-2"
//           />
//           <Button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-[#A446FF] hover:bg-[#8e36d1] text-white rounded-full py-3 font-semibold"
//           >
//             Sign Up
//           </Button>
//         </MyFormWrapper>
//         <div className="flex items-center w-full my-4">
//           <div className="grow border-t border-gray-200" />
//           <span className="mx-2 text-gray-400 text-xs">or</span>
//           <div className="grow border-t border-gray-200" />
//         </div>
//         <p className="text-center text-gray-400 text-sm">
//           Already have an account?{" "}
//           <Link
//             href="/auth/signin"
//             className="text-black font-semibold hover:underline"
//           >
//             Log in
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { LuHouse } from "react-icons/lu";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import MyFormInput from "@/components/form/MyFormInput";
import MyFormCheckbox from "@/components/form/MyFormCheckbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/auth/authSlice";
import { setAuthToken } from "@/lib/cookies";
import { useTranslations, useLocale } from "next-intl";

export default function SignUpPage() {
  const t = useTranslations("Auth");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const [signUp, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();

  const handelData = async (data: any) => {
    const { fullName, email, password, confirmPassword, terms } = data;

    if (!fullName || !email || !password || !confirmPassword) {
      toast.error(t("toasts.fillRequired"));
      return;
    }

    if (password !== confirmPassword) {
      toast.error(t("toasts.passMismatch"));
      return;
    }

    const signUpData = {
      fullName,
      email,
      password,
      isAggreedToTerms: terms || false,
    };

    const toastId = toast.loading(t("toasts.signingUp"));
    try {
      const res = await signUp(signUpData).unwrap();
      const user = res?.data;
      if (res?.success) {
        const token = res?.data?.token;
        dispatch(setUser({ user, token }));
        setAuthToken(token);
        toast.success(t("toasts.loginSuccess"), { id: toastId });
        if (user?.role === "ADMIN") {
          window.location.href = `/${locale}/admin/dashboard/overview`;
        } else {
          window.location.href = `/${locale}`;
        }
      } else {
        toast.error(res?.message || t("toasts.loginFailed"), {
          id: toastId,
        });
      }
    } catch (error: any) {
      const errorMsg = error?.data?.message || t("toasts.error");
      toast.error(errorMsg, { id: toastId });
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#fafbfc]"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md flex flex-col items-center border border-gray-200">
        <div className="flex flex-col items-center mb-6">
          <span className="bg-[#A446FF] rounded-lg p-4 mb-4 flex items-center justify-center">
            <LuHouse className="text-white w-8 h-8" />
          </span>
          <h2 className="text-2xl font-bold mb-1">{t("signup.title")}</h2>
          <p className="text-gray-500 text-sm">{t("signup.subtitle")}</p>
        </div>
        <MyFormWrapper onSubmit={handelData} className="w-full space-y-2">
          <MyFormInput
            name="fullName"
            label={t("signup.fullName")}
            placeholder={t("signup.namePlaceholder")}
            required
            inputClassName="bg-gray-100"
          />
          <MyFormInput
            name="email"
            label={t("signup.email")}
            placeholder={t("common.emailPlaceholder")}
            type="email"
            required
            inputClassName="bg-gray-100"
          />
          <MyFormInput
            name="password"
            label={t("signup.password")}
            placeholder={t("signup.passPlaceholder")}
            type="password"
            required
            inputClassName="bg-gray-100"
          />
          <MyFormInput
            name="confirmPassword"
            label={t("signup.confirmPassword")}
            placeholder={t("signup.confirmPlaceholder")}
            type="password"
            required
            inputClassName="bg-gray-100"
          />
          <MyFormCheckbox
            name="terms"
            consentText={`${t("signup.termsPrefix")} <a target="_blank" href="/terms" class="text-[#A446FF] underline">${t("signup.termsLink")}</a> ${t("signup.and")} <a target="_blank" href="/privacy" class="text-[#A446FF] underline">${t("signup.privacyLink")}</a>`}
            required
            className="mb-2"
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#A446FF] hover:bg-[#8e36d1] text-white rounded-full py-3 font-semibold cursor-pointer"
          >
            {t("signup.signupBtn")}
          </Button>
        </MyFormWrapper>
        <div className="flex items-center w-full my-4">
          <div className="grow border-t border-gray-200" />
          <span className="mx-2 text-gray-400 text-xs">{t("common.or")}</span>
          <div className="grow border-t border-gray-200" />
        </div>
        <p className="text-center text-gray-400 text-sm">
          {t("signup.haveAccount")}{" "}
          <Link
            href="/auth/signin"
            className="text-black font-semibold hover:underline"
          >
            {t("signup.login")}
          </Link>
        </p>
      </div>
    </div>
  );
}
