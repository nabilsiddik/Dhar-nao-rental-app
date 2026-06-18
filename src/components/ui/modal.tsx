"use client";
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

export function Modal({ open, onOpenChange, children, className }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* No overlay for dropdown style */}
        <DialogPrimitive.Content className={cn(
          "absolute right-60 top-12  mt-8 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-50 animate-fade-in flex flex-col py-2 text-gray-700",
          className
        )} style={{ minWidth: '180px' }}>
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
