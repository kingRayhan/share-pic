"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dropzone } from "@/components/dropzone";
import { QRDisplay } from "@/components/qr-display";
import { uploadToImgBB } from "@/lib/imgbb";
import { useToast } from "@/hooks/use-toast";

export function UploadForm() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileSelect = async (file: File) => {
    setIsUploading(true);
    try {
      const url = await uploadToImgBB(file);
      setUploadedUrl(url);
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="p-6">
      {!uploadedUrl ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Upload Image</h2>
          <Dropzone onFileSelect={handleFileSelect} isUploading={isUploading} />
        </>
      ) : (
        <QRDisplay imageUrl={uploadedUrl} onReset={() => setUploadedUrl(null)} />
      )}
    </Card>
  );
}