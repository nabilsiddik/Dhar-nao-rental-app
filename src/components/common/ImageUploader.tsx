"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";

interface ImageUploaderProps {
  initialImage?: string | null;
  onFileSelect: (file: File) => void;
}

const ImageUploader = ({ initialImage, onFileSelect }: ImageUploaderProps) => {
  const [preview, setPreview] = useState<string | null>(initialImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 1. Create a local URL for the preview
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // 2. Pass the raw file to the parent component
      onFileSelect(file);

      // Console log for your debugging as requested
      console.log("New File Selected:", file);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-6">
        {/* Avatar Preview */}
        <div className="relative w-20 h-20 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
          {preview ? (
            <Image
              src={preview}
              alt="Profile Preview"
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <Camera size={24} />
            </div>
          )}
        </div>

        {/* Hidden Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {/* Action Button */}
        <button
          type="button"
          onClick={handleButtonClick}
          className="border border-gray-200 bg-gray-100 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-200 transition active:scale-95"
        >
          Upload new photo
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;
