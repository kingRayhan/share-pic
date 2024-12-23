"use client";

import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropzoneProps {
  onFileSelect: (file: File) => void;
  isUploading: boolean;
}

export function Dropzone({ onFileSelect, isUploading }: DropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles[0]) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    maxFiles: 1,
    disabled: isUploading,
  });

  // Handle `cmd + v` paste
  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (items?.length) {
        for (const item of items) {
          if (item.type.startsWith("image/")) {
            const file = item.getAsFile();
            if (file) {
              onFileSelect(file);
            }
          }
        }
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, [onFileSelect]);

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
        isDragActive
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/25",
        isUploading && "opacity-50 cursor-not-allowed"
      )}
    >
      <input {...getInputProps()} />
      <ImageIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">
        {isDragActive
          ? "Drop the image here"
          : isUploading
          ? "Uploading..."
          : "Drag & drop an image here, or click to select"}
      </p>
    </div>
  );
}
