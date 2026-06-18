"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  List,
  CalendarCheck,
  Users,
  BarChart3,
  Star,
  MessageSquare,
  Bell,
  Settings,
  Menu,
  Search,
  Globe,
  BellOff,
} from "lucide-react";
import NavbarProfileDropdown from "@/components/Dashboard/NavbarProfileDropdown";
import { useReadNotiMutation } from "@/redux/features/userApis/userApis";
import { useAllNotificationsQuery } from "@/redux/features/notification/notification.api";
import { useTranslations, useLocale } from "next-intl";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

// const SIDEBAR_ITEMS = [
//   {
//     label: "Overview",
//     items: [
//       {
//         name: "Dashboard",
//         href: "/admin/dashboard/overview",
//         icon: LayoutDashboard,
//       },
//     ],
//   },
//   {
//     label: "Listings",
//     items: [
//       { name: "All Listings", href: "/admin/dashboard/listings", icon: List },
//     ],
//   },
//   {
//     label: "Bookings",
//     items: [
//       {
//         name: "All Bookings",
//         href: "/admin/dashboard/bookings",
//         icon: CalendarCheck,
//       },
//     ],
//   },
//   {
//     label: "Users",
//     items: [{ name: "All Users", href: "/admin/dashboard/users", icon: Users }],
//   },
//   {
//     label: "Revenue",
//     items: [
//       { name: "Overview", href: "/admin/dashboard/revenue", icon: BarChart3 },
//       {
//         name: "Transactions",
//         href: "/admin/dashboard/transactions",
//         icon: Globe,
//       },
//     ],
//   },
//   {
//     label: "Reviews",
//     items: [
//       { name: "All Reviews", href: "/admin/dashboard/reviews", icon: Star },
//     ],
//   },
//   {
//     label: "Contact & Inquiries",
//     items: [
//       {
//         name: "All Messages",
//         href: "/admin/dashboard/messages",
//         icon: MessageSquare,
//       },
//     ],
//   },
//   {
//     label: "Notifications",
//     items: [
//       {
//         name: "All Notifications",
//         href: "/admin/dashboard/notifications",
//         icon: Bell,
//       },
//     ],
//   },
//   {
//     label: "Settings",
//     items: [
//       {
//         name: "Commission Settings",
//         href: "/admin/dashboard/commission",
//         icon: Settings,
//       },
//     ],
//   },
// ];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("AdminSidebar");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notiOpen, setNotiOpen] = useState(false);
  const pathname = usePathname();
  const notiRef = useRef<HTMLDivElement>(null);

  const { data: notifications } = useAllNotificationsQuery(undefined);

  const [readNoti] = useReadNotiMutation();

  const notifList: any[] = notifications?.data ?? [];
  const hasUnread = notifList.some((n) => !n.read);

  const handleBellClick = async () => {
    const opening = !notiOpen;
    setNotiOpen(opening);
    if (opening && hasUnread) {
      try {
        await readNoti({ read: true });
      } catch (err) {
        console.error("Failed to mark notifications as read", err);
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

  const SIDEBAR_ITEMS = [
    {
      label: t("groups.overview"),
      items: [
        {
          name: t("items.dashboard"),
          href: `/${locale}/admin/dashboard/overview`,
          icon: LayoutDashboard,
        },
      ],
    },
    {
      label: t("groups.listings"),
      items: [
        {
          name: t("items.allListings"),
          href: `/${locale}/admin/dashboard/listings`,
          icon: List,
        },
      ],
    },
    {
      label: t("groups.bookings"),
      items: [
        {
          name: t("items.allBookings"),
          href: `/${locale}/admin/dashboard/bookings`,
          icon: CalendarCheck,
        },
      ],
    },
    {
      label: t("groups.users"),
      items: [
        {
          name: t("items.allUsers"),
          href: `/${locale}/admin/dashboard/users`,
          icon: Users,
        },
      ],
    },
    {
      label: t("groups.revenue"),
      items: [
        {
          name: t("items.revenueOverview"),
          href: `/${locale}/admin/dashboard/revenue`,
          icon: BarChart3,
        },
        {
          name: t("items.transactions"),
          href: `/${locale}/admin/dashboard/transactions`,
          icon: Globe,
        },
      ],
    },
    {
      label: t("groups.reviews"),
      items: [
        {
          name: t("items.allReviews"),
          href: `/${locale}/admin/dashboard/reviews`,
          icon: Star,
        },
      ],
    },
    {
      label: t("groups.contact"),
      items: [
        {
          name: t("items.allMessages"),
          href: `/${locale}/admin/dashboard/messages`,
          icon: MessageSquare,
        },
      ],
    },
    {
      label: t("groups.notifications"),
      items: [
        {
          name: t("items.allNotifications"),
          href: `/${locale}/admin/dashboard/notifications`,
          icon: Bell,
        },
      ],
    },
    {
      label: t("groups.settings"),
      items: [
        {
          name: t("items.commission"),
          href: `/${locale}/admin/dashboard/commission`,
          icon: Settings,
        },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F9FAFB] relative">
      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed max-h-screen overflow-y-auto lg:sticky top-0 h-screen inset-y-0 left-0 w-72 bg-white border-r border-gray-200 z-50 transition-transform duration-300 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="p-6">
          <Link target="_blank" href={"/"}>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                R
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                RentHub
              </span>
            </div>
          </Link>

          <nav className="lg:space-y-2">
            {SIDEBAR_ITEMS.map((section) => (
              <div key={section.label}>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                  {section.label}
                </p>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${isActive ? "bg-primary/10 text-primary" : "text-gray-500 hover:bg-gray-50"}`}
                      >
                        <item.icon size={20} />
                        <span className="text-sm">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* HEADER */}
        <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between gap-10 sticky top-0 z-30">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 text-gray-500"
          >
            <Menu />
          </button>

          <div className="flex items-center gap-2">
            <Globe />
            <LanguageSwitcher />
          </div>
          <div className="max-w-md w-full relative hidden md:block"></div>
          {/* <div className="max-w-md w-full relative hidden md:block">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search listings, bookings, users..."
              className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 pl-12 pr-4 outline-none focus:border-primary transition-all text-sm"
            />
          </div> */}

          <div className="flex items-center gap-6">
            {/* Notifications */}
            <div className="relative" ref={notiRef}>
              <button
                onClick={handleBellClick}
                className="cursor-pointer relative p-2 text-gray-500 hover:bg-gray-50 rounded-full"
              >
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
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
                        <p className="text-sm font-medium">
                          No notifications yet
                        </p>
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

            <NavbarProfileDropdown />
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="p-3 sm:p-5 lg:p-8 flex-1 bg-[#F6F6F6]">
          {children}
        </main>
      </div>
    </div>
  );
}
