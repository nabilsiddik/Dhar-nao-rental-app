/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { logout as logoutAction } from "@/redux/features/auth/authSlice";
import {
  Menu,
  Globe,
  Bell,
  User,
  LogIn,
  UserPlus,
  Heart,
  MessageSquare,
  BellOff,
  LogOut,
  LogOutIcon,
  LayoutDashboard,
  UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  useGetAllNotificationsQuery,
  useReadNotiMutation,
} from "@/redux/features/userApis/userApis";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useLogOutMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { removeAuthToken } from "@/lib/cookies";
import { useRouter } from "next/navigation";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslations, useLocale } from "next-intl";

const NavbarActions = () => {
  const t = useTranslations("Navbar");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notiOpen, setNotiOpen] = useState(false);
  const dispatch = useDispatch();
  const [logout, { isLoading }] = useLogOutMutation();

  const userMenuRef = useRef<HTMLDivElement>(null);
  const notiRef = useRef<HTMLDivElement>(null);

  const user: any = useSelector(selectCurrentUser);
  const { data: notifications } = useGetAllNotificationsQuery(undefined);

  const [readNoti] = useReadNotiMutation();

  const notifList: any[] = notifications?.data ?? [];
  const hasUnread = notifList.some((n) => !n.read);

  const router = useRouter();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
      if (notiRef.current && !notiRef.current.contains(event.target as Node)) {
        setNotiOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleBellClick = async () => {
    const opening = !notiOpen;
    setNotiOpen(opening);
    // Call readNoti when opening the dropdown
    if (opening && hasUnread) {
      try {
        await readNoti({ read: true });
      } catch (err) {
        console.error("Failed to mark notifications as read", err);
      }
    }
  };

  const currentUser = useSelector(selectCurrentUser);

  const handleSignOut = async () => {
    const isAdmin = (currentUser as any)?.role === "ADMIN";

    try {
      await logout().unwrap();
    } catch (error: any) {
      // Even if the server logout fails, clear local auth state and cookie.
      console.error("Logout failed:", error);
    } finally {
      removeAuthToken();
      dispatch(logoutAction());
      toast.success("Signed out successfully!");
      if (isAdmin) {
        router.push("/auth/signin");
      } else {
        router.push("/");
      }
    }
  };

  const formatTime = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  const menuLinks = [
    ...(user?.role === "ADMIN"
      ? [
          {
            label: t("Actions.dashboard"),
            href: "/admin/dashboard/overview",
            icon: LayoutDashboard,
          },
        ]
      : []),
    ...(user
      ? [
          {
            label: t("Actions.profile"),
            href: "/profile",
            icon: User,
            separator: true,
          },
          { label: t("Actions.wishlist"), href: "/wishlist", icon: Heart },
          {
            label: t("Actions.contact"),
            href: "/contact",
            icon: MessageSquare,
          },
        ]
      : [
          { label: "Log in", href: "/auth/signin", icon: LogIn, bold: true },
          { label: "Sign Up", href: "/auth/signup", icon: UserPlus },
          { label: "Contact", href: "/contact", icon: MessageSquare },
        ]),
  ];

  return (
    <div className="flex items-center gap-2 md:gap-4">
      {/* DESKTOP ACTIONS */}
      <div className="hidden md:flex items-center gap-3">
        {/* Language Switcher */}
        {/* <button className="p-3 bg-white hover:bg-gray-50 border border-gray-100 rounded-full shadow-sm transition-all text-gray-600">
          <Globe size={20} />
        </button> */}
        <div className="flex items-center gap-2">
          <Globe />
          <LanguageSwitcher />
        </div>

        {/* Notifications */}
        <div className="relative" ref={notiRef}>
          <button
            onClick={handleBellClick}
            className="relative p-3 bg-white hover:bg-gray-50 border border-gray-100 rounded-full shadow-sm transition-all text-gray-600"
          >
            <Bell size={20} />
            {hasUnread && (
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white" />
            )}
          </button>

          {/* Notification Dropdown */}
          {notiOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              {/* Header */}
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h4 className="font-bold text-gray-900 text-sm">
                  Notifications
                </h4>
                {notifList.length > 0 && (
                  <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    {notifList.length}
                  </span>
                )}
              </div>

              {/* List */}
              <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
                {notifList.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-gray-400 gap-2">
                    <BellOff size={28} className="text-gray-300" />
                    <p className="text-sm font-medium">No notifications yet</p>
                  </div>
                ) : (
                  notifList.map((notif: any) => (
                    <div
                      key={notif.id}
                      className={`px-5 py-4 transition-colors hover:bg-gray-50 ${
                        !notif.read ? "bg-primary/[0.03]" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Unread dot */}
                        <div className="mt-1.5 shrink-0">
                          {!notif.read ? (
                            <span className="w-2 h-2 rounded-full bg-primary block" />
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-gray-200 block" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 leading-snug">
                            {notif.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                            {notif.body}
                          </p>
                          <p className="text-[11px] text-gray-400 mt-1.5 font-medium">
                            {formatTime(notif.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-3 p-1.5 pl-4 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95"
          >
            <Menu size={20} className="text-gray-500" />
            <Avatar className="w-8 h-8">
              <AvatarImage src={user?.profileImage} className="grayscale" />
              <AvatarFallback>
                <UserIcon />
              </AvatarFallback>
            </Avatar>
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 py-3 animate-in fade-in zoom-in-95 duration-200">
              {menuLinks.map((link, i) => (
                <React.Fragment key={i}>
                  {link.separator && (
                    <div className="h-[1px] bg-gray-50 my-2" />
                  )}
                  <Link
                    href={link.href}
                    onClick={() => setUserMenuOpen(false)}
                    className={`flex items-center gap-3 px-5 py-3 text-sm transition-colors hover:bg-gray-50 ${
                      link.bold
                        ? "font-bold text-gray-900"
                        : "text-gray-600 font-medium"
                    }`}
                  >
                    <link.icon
                      size={18}
                      className={link.bold ? "text-primary" : "text-gray-400"}
                    />
                    {link.label}
                  </Link>
                </React.Fragment>
              ))}
              {/* <Button className="mx-5 mt-2">Logout</Button> */}

              {user && (
                <Button
                  onClick={handleSignOut}
                  className="ml-5 mt-2 cursor-pointer"
                >
                  <LogOutIcon /> {t("Actions.logout")}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white border border-gray-100 shadow-sm"
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[85%] sm:w-[380px] rounded-l-[2rem] p-0 overflow-hidden"
          >
            {/* Mobile Header */}
            <div className="bg-primary p-8 text-white">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-16 h-16 border-2 border-white/20">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-lg">Welcome to RentHub</h3>
                  <p className="text-white/70 text-sm">
                    Find your next journey
                  </p>
                </div>
              </div>
            </div>

            <nav className="p-6 space-y-2">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-4">
                Account & Settings
              </p>
              {menuLinks.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="flex items-center gap-4 px-4 py-4 rounded-2xl hover:bg-primary hover:text-white text-gray-700 font-bold transition-all active:scale-95"
                >
                  <div className="p-2 bg-gray-50 rounded-xl text-primary">
                    <link.icon size={20} />
                  </div>
                  <span className="text-base">{link.label}</span>
                </Link>
              ))}

              <div className="h-[1px] bg-gray-100 my-6 mx-4" />

              {/* Extra Mobile Actions */}
              <div className="flex items-center justify-between px-4">
                <div className="flex items-center gap-3 text-gray-600 font-medium">
                  <Globe size={20} /> English
                </div>
                <button
                  onClick={handleBellClick}
                  className="flex items-center gap-3 text-gray-600 font-medium relative"
                >
                  <Bell size={20} /> Notifications
                  {hasUnread && (
                    <span className="w-2 h-2 bg-primary rounded-full" />
                  )}
                </button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default NavbarActions;
