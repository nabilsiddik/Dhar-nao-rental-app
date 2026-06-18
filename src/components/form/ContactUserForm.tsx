"use client";

import React, { useState } from "react";
import FormInput from "@/components/booking/FormInput";
import { Send, Loader2 } from "lucide-react";

interface ContactUserFormProps {
  emailTo: string;
  onSubmit: (data: { subject: string; message: string }) => Promise<void>;
  isLoading: boolean;
}

const ContactUserForm = ({
  emailTo,
  onSubmit,
  isLoading,
}: ContactUserFormProps) => {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 block">
          Recipient
        </label>
        <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm font-bold text-gray-500">
          {emailTo}
        </div>
      </div>

      <FormInput
        label="Subject"
        name="subject"
        placeholder="Enter email subject"
        required
        value={formData.subject}
        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
      />

      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold text-gray-900">Message *</label>
        <textarea
          required
          rows={5}
          placeholder="Write your message here..."
          className="w-full bg-[#E5E7EB]/50 border border-transparent focus:border-primary px-4 py-3 rounded-xl outline-none transition-all resize-none text-base font-medium"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:opacity-90 transition-all disabled:opacity-50 cursor-pointer"
      >
        {isLoading ? (
          <Loader2 className="animate-spin" size={18} />
        ) : (
          <Send size={18} />
        )}
        Send Email Now
      </button>
    </form>
  );
};

export default ContactUserForm;
