/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { LuHouse } from "react-icons/lu";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import MyFormInput from "@/components/form/MyFormInput";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/auth/authSlice";
import { setAuthToken } from "@/lib/cookies";
import { useTranslations, useLocale } from "next-intl";

export default function SignInPage() {
  const t = useTranslations("Auth");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const [userLogin, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleLogin = async (data: any) => {
    const { email, password } = data;

    const signInData = { email, password };

    const toastId = toast.loading(t("toasts.signingIn"));
    try {
      const res = await userLogin(signInData).unwrap();
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

  // Demo admin login
  const handleDemoLogin = async () => {
    const email = 'demoadmin@gmail.com'
    const password = '12345678'

    const toastId = toast.loading(t("toasts.signingIn"));
    try {
      const res = await userLogin({email, password}).unwrap();
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
          <span className="bg-primary rounded-lg p-4 mb-4 flex items-center justify-center">
            <LuHouse className="text-white w-8 h-8" />
          </span>
          <h2 className="text-2xl font-bold mb-1">{t("signin.title")}</h2>
          <p className="text-gray-500 text-sm">{t("signin.subtitle")}</p>
        </div>
        <MyFormWrapper onSubmit={handleLogin} className="w-full space-y-4">
          <MyFormInput
            name="email"
            label={t("signin.email")}
            placeholder={t("common.emailPlaceholder")}
            type="email"
            required
            inputClassName="bg-gray-100"
          />
          <MyFormInput
            name="password"
            label={t("signin.password")}
            placeholder={t("signin.passPlaceholder")}
            type="password"
            required
            inputClassName="bg-gray-100"
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary text-white rounded-full py-3 font-semibold cursor-pointer"
          >
            {t("signin.loginBtn")}
          </Button>
          <Button
            onClick={handleDemoLogin}
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary text-white rounded-full py-3 font-semibold cursor-pointer"
          >
            Demo Login
          </Button>
        </MyFormWrapper>
        <div className="flex items-center w-full my-4">
          <div className="grow border-t border-gray-200" />
          <span className="mx-2 text-gray-400 text-xs">{t("common.or")}</span>
          <div className="grow border-t border-gray-200" />
        </div>
        <p className="text-center text-gray-400 text-sm">
          {t("signin.noAccount")}{" "}
          <Link
            href="/auth/signup"
            className="text-black font-semibold hover:underline"
          >
            {t("signin.signup")}
          </Link>
        </p>
      </div>
    </div>
  );
}
