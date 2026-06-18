/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { LogOut, User, Shield } from "lucide-react";
import { useState } from "react";
import {
  logout as logoutAction,
  selectCurrentUser,
} from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import { useLogOutMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { removeAuthToken } from "@/lib/cookies";

const NavbarProfileDropdown = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [logout] = useLogOutMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const currentUser = useSelector(selectCurrentUser);
  console.log("Current User in NavbarProfileDropdown:", currentUser);
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

  return (
    <div className="relative">
      <button
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className="flex items-center gap-3 pl-6 border-l cursor-pointer border-gray-100 group"
      >
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">
            Admin User
          </p>
          <p className="text-[11px] text-primary font-bold uppercase">
            Super Admin
          </p>
        </div>
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-black">
          A
        </div>
      </button>

      {/* DROPDOWN MENU */}
      {isProfileOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsProfileOpen(false)}
          />
          <div className="absolute right-0 mt-4 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl z-20 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
            <hr className="my-2 border-gray-50" />
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors font-bold cursor-pointer"
            >
              <LogOut size={18} /> Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NavbarProfileDropdown;
