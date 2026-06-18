import { Metadata } from "next";
import AccountClient from "./AccountClient";

export const metadata: Metadata = {
  title: "My Profile",
  description: "Manage your RentHub account settings.",
};

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-white">
      <AccountClient />
    </main>
  );
}
